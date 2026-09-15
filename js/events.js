// events.js — shared helpers for the component-based event model.
//
// An event turns on any mix of three independent components (no single `type`):
//   rsvpEnabled · volunteerSlotsEnabled · itemSignupEnabled
// None enabled == "Save the Date".
//
// The create form (admin.html) and the edit form (event.html) share ONE config
// UI from here, so they never drift apart.
import { esc } from "./common.js";
import { normalizeTime, timeToMinutes } from "./cafe-dates.js";

// Convert a stored 12-hour time ("9:00 AM") to the 24-hour "HH:MM" that a native
// <input type="time"> expects. Empty stays empty.
export function to24h(str) {
  if (!str || !str.trim()) return '';
  const mins = timeToMinutes(str);
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
}
import { db, storage, collection, query, where, getDocs, deleteDoc, doc, storageRef, deleteObject } from "./firebase-init.js";

// Delete an event and everything attached to it: all sign-ups (RSVP / slot /
// item), its Storage media (cover, photos, docs), then the event doc itself.
// Leaves logged volunteer `hours` alone — those are an org record, not per-event.
export async function deleteEventFully(eventId, ev) {
  for (const coll of ['signups', 'eventSlotSignups', 'eventItemSignups']) {
    const snap = await getDocs(query(collection(db, coll), where('eventId', '==', eventId)));
    for (const d of snap.docs) { try { await deleteDoc(d.ref); } catch (e) { /* keep going */ } }
  }
  const urls = [];
  if (ev) {
    if (ev.heroUrl) urls.push(ev.heroUrl);
    (ev.photos || []).forEach(u => urls.push(u));
    (ev.attachments || []).forEach(a => urls.push(a.url));
  }
  for (const u of urls) { try { await deleteObject(storageRef(storage, u)); } catch (e) { /* already gone */ } }
  await deleteDoc(doc(db, 'events', eventId));
}

export const RSVP_DEFAULT_MAX_GUESTS = 0;   // extra guests beyond the attendee (0 = just them)
export const RSVP_DEFAULT_CAPACITY = 100;

export function eventComponents(ev) {
  ev = ev || {};
  return {
    rsvp: !!ev.rsvpEnabled,
    slots: !!ev.volunteerSlotsEnabled,
    items: !!ev.itemSignupEnabled,
  };
}

// The location shown for a volunteer slot: its own when multi-location is on and
// set, otherwise the event's single main location.
export function slotLocation(ev, group) {
  if (ev && ev.multiLocation && group && group.location) return group.location;
  return (ev && ev.location) || '';
}

// ---- shared config form (toggles + per-component settings) ----
// Renders into a container; prefilled from `ev` (pass {} for a new event).
export function componentConfigHtml(ev) {
  ev = ev || {};
  const c = eventComponents(ev);
  const groups = ev.slotGroups || [];
  const cats = (ev.itemCategories || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  const chk = b => b ? 'checked' : '';
  return `
    <div class="form-row"><label>What can people do on this event?</label>
      <div style="display:flex;flex-direction:column;gap:8px">
        <label style="display:flex;gap:8px;align-items:center;font-size:13.5px;font-weight:600"><input type="checkbox" style="width:auto" data-ec-toggle="rsvp" ${chk(c.rsvp)}> RSVP — simple attendance</label>
        <label style="display:flex;gap:8px;align-items:center;font-size:13.5px;font-weight:600"><input type="checkbox" style="width:auto" data-ec-toggle="slots" ${chk(c.slots)}> Volunteer slots — time-based sign-up</label>
        <label style="display:flex;gap:8px;align-items:center;font-size:13.5px;font-weight:600"><input type="checkbox" style="width:auto" data-ec-toggle="items" ${chk(c.items)}> Item sign-up — "bring something"</label>
      </div>
      <div style="font-size:12px;color:var(--ink-soft);margin-top:6px">Leave all off for a Save the Date — you can open any of these later.</div>
    </div>

    <div data-ec-block="rsvp" style="display:${c.rsvp ? 'block' : 'none'};border-left:3px solid var(--line);padding-left:12px;margin-bottom:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-row" style="margin:0"><label>Capacity (max attending)</label><input type="number" min="1" id="ecCapacity" value="${ev.rsvpCapacity || RSVP_DEFAULT_CAPACITY}"></div>
        <div class="form-row" style="margin:0"><label>Extra guests per RSVP (0 = just the person)</label><input type="number" min="0" id="ecMaxGuests" value="${ev.rsvpMaxGuests != null ? ev.rsvpMaxGuests : RSVP_DEFAULT_MAX_GUESTS}"></div>
      </div>
      <label style="display:flex;gap:8px;align-items:center;font-size:12.5px;margin-top:8px"><input type="checkbox" style="width:auto" id="ecRequireGuestNames" ${chk(ev.rsvpRequireGuestNames)}> Ask for each guest's name</label>
    </div>

    <div data-ec-block="slots" style="display:${c.slots ? 'block' : 'none'};border-left:3px solid var(--line);padding-left:12px;margin-bottom:12px">
      <label style="display:flex;gap:8px;align-items:center;font-size:12.5px;margin-bottom:8px"><input type="checkbox" style="width:auto" id="ecMultiLoc" data-ec-multiloc ${chk(ev.multiLocation)}> This event runs at multiple locations (set a location per slot)</label>
      <label style="font-size:12.5px;font-weight:600;color:var(--ink-soft)">Volunteer slot groups</label>
      <div id="ecSlotRows" style="margin-top:6px">${groups.map(g => slotRowHtml(g, ev.multiLocation)).join('')}</div>
      <button type="button" class="btn btn-ghost" data-ec-addslot style="margin-top:6px">+ Add slot group</button>
    </div>

    <div data-ec-block="items" style="display:${c.items ? 'block' : 'none'};border-left:3px solid var(--line);padding-left:12px;margin-bottom:12px">
      <label style="font-size:12.5px;font-weight:600;color:var(--ink-soft)">Item categories (goal is guidance only — people can sign up past it)</label>
      <div id="ecItemRows" style="margin-top:6px">${cats.map(c => itemRowHtml(c)).join('')}</div>
      <button type="button" class="btn btn-ghost" data-ec-additem style="margin-top:6px">+ Add category</button>
    </div>`;
}

function slotRowHtml(g, multiLoc) {
  g = g || {};
  // Each slot is its own bordered card (clear separation), laid out over three
  // rows so it fits the width: label + remove; start/end/spots; location.
  const lbl = 'font-size:11px;font-weight:600;color:var(--ink-soft)';
  return `<div class="ec-slot-row" data-id="${esc(g.id || '')}" style="border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:12px">
    <div style="margin-bottom:8px">
      <label style="${lbl}">Slot label</label>
      <div style="display:flex;gap:8px;align-items:center;margin-top:2px">
        <input placeholder="e.g. Help with setup" class="ec-sg-label" value="${esc(g.label || '')}" style="flex:1">
        <button type="button" class="btn btn-ghost" style="padding:6px 10px" title="Remove slot" onclick="this.closest('.ec-slot-row').remove()">✕</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px">
      <label style="${lbl}">Start time<input type="time" class="ec-sg-start" value="${to24h(g.startTime)}" style="display:block;width:100%;margin-top:2px"></label>
      <label style="${lbl}">End time<input type="time" class="ec-sg-end" value="${to24h(g.endTime)}" style="display:block;width:100%;margin-top:2px"></label>
      <label style="${lbl}">Spots<input type="number" min="1" class="ec-sg-cap" value="${g.capacity || 2}" style="display:block;width:100%;margin-top:2px"></label>
    </div>
    <div class="ec-sg-loc-wrap" style="display:${multiLoc ? 'block' : 'none'}">
      <label style="${lbl}">Location</label>
      <input placeholder="e.g. ES Bus Bay" class="ec-sg-loc" value="${esc(g.location || '')}" style="display:block;width:100%;margin-top:2px">
    </div>
  </div>`;
}

function itemRowHtml(c) {
  c = c || {};
  return `<div class="ec-item-row" data-id="${esc(c.id || '')}" style="display:grid;grid-template-columns:2fr 1fr auto auto auto;gap:6px;margin-bottom:6px;align-items:center">
    <input placeholder="Category (e.g. Brownies)" class="ec-ic-label" value="${esc(c.label || '')}">
    <input type="number" min="1" class="ec-ic-quota" value="${c.quota || 10}" title="Goal (guidance only)">
    <button type="button" class="btn btn-ghost" style="padding:6px 8px" title="Move up" onclick="window.__ecMoveItem(this,-1)">▲</button>
    <button type="button" class="btn btn-ghost" style="padding:6px 8px" title="Move down" onclick="window.__ecMoveItem(this,1)">▼</button>
    <button type="button" class="btn btn-ghost" style="padding:6px 10px" onclick="this.closest('.ec-item-row').remove()">✕</button>
  </div>`;
}

// Attach behavior: toggles show/hide blocks, multi-location shows per-slot inputs,
// add-row + reorder buttons. Call once after inserting componentConfigHtml.
export function wireComponentConfig(root) {
  root = root || document;
  root.querySelectorAll('[data-ec-toggle]').forEach(t => {
    t.onchange = () => {
      const block = root.querySelector(`[data-ec-block="${t.dataset.ecToggle}"]`);
      if (block) block.style.display = t.checked ? 'block' : 'none';
    };
  });
  const multi = root.querySelector('[data-ec-multiloc]');
  if (multi) multi.onchange = () => {
    root.querySelectorAll('.ec-sg-loc-wrap').forEach(el => { el.style.display = multi.checked ? 'block' : 'none'; });
  };
  const addSlot = root.querySelector('[data-ec-addslot]');
  if (addSlot) addSlot.onclick = () => {
    document.getElementById('ecSlotRows').insertAdjacentHTML('beforeend', slotRowHtml({}, multi && multi.checked));
  };
  const addItem = root.querySelector('[data-ec-additem]');
  if (addItem) addItem.onclick = () => {
    document.getElementById('ecItemRows').insertAdjacentHTML('beforeend', itemRowHtml({}));
  };
  // Reorder handler is global (rows are created dynamically with inline onclick).
  window.__ecMoveItem = (btn, dir) => {
    const row = btn.closest('.ec-item-row');
    if (!row) return;
    if (dir < 0 && row.previousElementSibling) row.parentElement.insertBefore(row, row.previousElementSibling);
    if (dir > 0 && row.nextElementSibling) row.parentElement.insertBefore(row.nextElementSibling, row);
  };
}

// Read the config form back into event fields. Preserves existing slot/category
// ids (so live sign-ups stay attached) and stamps a fresh id on new rows.
export function readComponentConfig() {
  const on = name => { const t = document.querySelector(`[data-ec-toggle="${name}"]`); return !!(t && t.checked); };
  const num = (id, fallback) => { const el = document.getElementById(id); const v = parseInt(el && el.value, 10); return Number.isFinite(v) && v > 0 ? v : fallback; };
  const rsvpEnabled = on('rsvp'), volunteerSlotsEnabled = on('slots'), itemSignupEnabled = on('items');
  const multiLoc = document.getElementById('ecMultiLoc');
  const multiLocation = !!(multiLoc && multiLoc.checked);

  const slotGroups = volunteerSlotsEnabled ? [...document.querySelectorAll('#ecSlotRows .ec-slot-row')].map((row, i) => {
    const g = {
      id: row.dataset.id || ('sg' + Date.now() + '_' + i),
      label: row.querySelector('.ec-sg-label').value.trim(),
      startTime: normalizeTime(row.querySelector('.ec-sg-start').value),
      endTime: normalizeTime(row.querySelector('.ec-sg-end').value),
      capacity: parseInt(row.querySelector('.ec-sg-cap').value, 10) || 1,
    };
    const loc = row.querySelector('.ec-sg-loc').value.trim();
    if (multiLocation && loc) g.location = loc;
    return g;
  }).filter(g => g.label) : [];

  const itemCategories = itemSignupEnabled ? [...document.querySelectorAll('#ecItemRows .ec-item-row')].map((row, i) => ({
    id: row.dataset.id || ('ic' + Date.now() + '_' + i),
    label: row.querySelector('.ec-ic-label').value.trim(),
    quota: parseInt(row.querySelector('.ec-ic-quota').value, 10) || 1,
    order: i,   // position in the list = admin's chosen priority
  })).filter(c => c.label) : [];

  return {
    rsvpEnabled, volunteerSlotsEnabled, itemSignupEnabled,
    rsvpCapacity: num('ecCapacity', RSVP_DEFAULT_CAPACITY),
    rsvpMaxGuests: num('ecMaxGuests', RSVP_DEFAULT_MAX_GUESTS),
    rsvpRequireGuestNames: !!(document.getElementById('ecRequireGuestNames') && document.getElementById('ecRequireGuestNames').checked),
    multiLocation,
    slotGroups,
    itemCategories,
  };
}
