// common.js — shared UI building blocks used by every page.
import { getProfile, isAdmin, isStoreAdmin, signOutUser } from "./auth.js";
import { db, collection, query, where, onSnapshot } from "./firebase-init.js";

export function esc(s) {
  return (s || "").replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

export function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

// Renders one attendee's avatar per the confirmed rule:
// blank circle (anonymous) / initial (named, no photo) / photo (uploaded)
export function bubbleHtml(person) {
  if (!person) return `<div class="bubble blank"></div>`;
  if (person.anonymous) return `<div class="bubble blank" title="Anonymous"></div>`;
  if (person.photoURL) return `<div class="bubble" title="${esc(person.displayName)}"><img src="${esc(person.photoURL)}"></div>`;
  const initial = (person.displayName || '?')[0].toUpperCase();
  return `<div class="bubble" title="${esc(person.displayName)}">${initial}</div>`;
}
export function bubbleRowHtml(people, max = 8) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return `<div class="bubble-row">${shown.map(bubbleHtml).join('')}${extra > 0 ? `<div class="bubble" style="background:#EEE;color:var(--ink-soft)">+${extra}</div>` : ''}</div>`;
}

export function showOverlay(html, transparent) {
  const ovl = document.getElementById('ovl') || (() => {
    const d = document.createElement('div'); d.id = 'ovl'; document.body.appendChild(d); return d;
  })();
  ovl.innerHTML = transparent ? html : `<div class="modal-overlay" onclick="if(event.target===this) window.closeOverlay()">${html}</div>`;
}
export function closeOverlay() {
  const ovl = document.getElementById('ovl');
  if (ovl) ovl.innerHTML = '';
}
window.closeOverlay = closeOverlay; // used by inline onclick handlers in modal markup

const NAV_ITEMS = [
  ['index.html', '⭐ Discover'],
  ['cafe.html', '☕ Cafe Volunteer'],
  ['menu.html', '🍽️ PTA Cafe'],
  ['schedule.html', '📅 My Schedule'],
];

export function renderHeader(activePage) {
  const profile = getProfile();
  const showAdminBtn = isAdmin() || isStoreAdmin();
  const currentFile = activePage || location.pathname.split('/').pop() || 'index.html';
  const header = document.createElement('header');
  header.className = 'top';
  header.innerHTML = `
    <div class="top-inner">
      <a href="index.html" class="brand"><div class="mark">🦅</div>VolunteerSAS</a>
      <div class="top-actions">
        ${showAdminBtn ? `<a href="admin.html" class="btn btn-secondary">Admin</a>` : ''}
        <div style="position:relative" id="notifWrap">
          <button class="icon-btn" id="notifBtn" title="Notifications">🔔</button>
        </div>
        <div style="position:relative" id="profileWrap">
          <button class="icon-btn" id="profileBtn" title="Profile">${profile && profile.photoURL ? `<img src="${esc(profile.photoURL)}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">` : (profile ? esc((profile.displayName || '?')[0]) : '?')}</button>
        </div>
      </div>
    </div>
    <nav class="tabs">${NAV_ITEMS.map(([href, label]) => `<a href="${href}" class="${currentFile === href ? 'active' : ''}">${label}</a>`).join('')}</nav>
  `;
  document.body.prepend(header);

  document.getElementById('profileBtn').onclick = () => {
    const wrap = document.getElementById('profileWrap');
    if (document.getElementById('profileDD')) { document.getElementById('profileDD').remove(); return; }
    const dd = document.createElement('div');
    dd.className = 'dropdown'; dd.id = 'profileDD';
    dd.innerHTML = `
      <div class="ddi" style="display:block">
        <div style="font-weight:700">${esc(profile ? profile.displayName : '')}</div>
        <div style="font-size:12px;color:var(--ink-soft)">${esc(profile ? profile.email : '')}</div>
      </div>
      <a class="ddi" href="profile.html">✏️ Edit profile</a>
      <button class="ddi" style="color:var(--red)" id="signOutBtn">↩ Sign out</button>
    `;
    wrap.appendChild(dd);
    document.getElementById('signOutBtn').onclick = async () => { await signOutUser(); location.href = 'index.html'; };
  };

  document.getElementById('notifBtn').onclick = () => {
    if (document.getElementById('notifDD')) { document.getElementById('notifDD').remove(); return; }
    const wrap = document.getElementById('notifWrap');
    const dd = document.createElement('div');
    dd.className = 'dropdown'; dd.id = 'notifDD';
    dd.innerHTML = `<div class="ddi" style="font-weight:700">Notifications</div><div class="ddi" style="color:var(--ink-soft)">Loading…</div>`;
    wrap.appendChild(dd);
    watchMyNotifications(dd);
  };

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#profileWrap')) { const dd = document.getElementById('profileDD'); if (dd) dd.remove(); }
    if (!e.target.closest('#notifWrap')) { const dd = document.getElementById('notifDD'); if (dd) dd.remove(); }
  });
}

function watchMyNotifications(container) {
  const profile = getProfile();
  if (!profile) return;
  const q = query(collection(db, 'notifications'), where('to', '==', profile.uid));
  onSnapshot(q, snap => {
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 15);
    const unread = items.filter(n => !n.read).length;
    const badge = document.querySelector('#notifBtn .notif-badge');
    if (unread > 0) {
      if (!badge) document.getElementById('notifBtn').insertAdjacentHTML('beforeend', `<span class="notif-badge">${unread}</span>`);
      else badge.textContent = unread;
    } else if (badge) badge.remove();
    if (document.getElementById('notifDD') === container) {
      container.innerHTML = `<div class="ddi" style="font-weight:700">Notifications</div>` +
        (items.map(n => `<div class="ddi" style="display:block">
            <div style="font-weight:600;font-size:12.5px">${esc(n.subject)}</div>
            <div style="font-size:12px;color:var(--ink-soft)">${esc(n.body)}</div>
          </div>`).join('') || `<div class="ddi" style="color:var(--ink-soft)">No notifications yet.</div>`);
    }
  });
}
