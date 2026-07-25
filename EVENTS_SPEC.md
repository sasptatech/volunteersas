# VolunteerSAS — Events Page Spec (build reference)

Source of truth for the events refactor. Not public-served (firebase.json ignores *.md).

## Decisions (2026-07-24)
- **Private organizer messaging (§10) = fast-follow** — build phases 1–3 first.
- **No PTA-line contact option** — contact method is email / WhatsApp / admin's own phone only.
- **Migration = WIPE existing events** (2026-07-24 update): no shim. The old test
  events get cleared (manual step by user in the Firebase console — delete the
  `events` collection plus `signups` / `eventSlotSignups` / `eventItemSignups`).
  New code writes flags. Old flag-less events (until wiped) render as empty
  Save-the-Dates, so nothing breaks in the meantime. Build fresh SAMPLE events in
  the new model for testing (temporary superadmin seed button).
- **Contact method (§9) = DEFERRED** (2026-07-24 update): user unsure whether to
  do per-event contact at all; checking with team. Not built in Phase 1. No default
  phone number anywhere.
- **"Also attending" checkbox** just writes a normal `signups` doc (§14 simpler option).
- **Capacity enforced client-side** (same known limit as elsewhere; server-side needs Functions).
- **Item reorder = up/down buttons** (not drag) for v1.
- **§12 day-before reminders = deferred** — needs scheduled Cloud Functions (not in stack).

## Core model
Replace single `event.type` enum with independent booleans, any combination:
- `rsvpEnabled`, `volunteerSlotsEnabled`, `itemSignupEnabled` — none enabled = "Save the Date".

New fields:
- `rsvpMaxGuests` (default 1), `rsvpCapacity` (default 100), `rsvpRequireGuestNames` (bool)
- `multiLocation` (bool, default false); when true each `slotGroups[]` gets its own `location`
  (falls back to `event.location`)
- `contactMethod`: `{ type: 'email'|'whatsapp'|'phone', value }`
- `itemCategories[]` gains `order`; quota is display-only guidance (drop hard block)

## Components
- **RSVP:** guests (default max 1, admin-raisable; collect guest names if allowed), capacity
  (default 100), optional comment.
- **Volunteer Slots:** slot groups (label/start/end/capacity); optional per-slot location behind
  a "multiple locations" toggle; optional comment. Unchanged sign-up mechanics.
- **Item Sign-up:** categories with display-only goal; free-text sign-up ("bringing 4 brownies");
  admin can reorder categories.
- **"Also attending" checkbox** on the slot form (only when both RSVP + Slots open) → writes an RSVP.

## Attendee display
- Reuse bubble rules (photo/initial/blank + "+N more").
- Two separate rows when both active: **Attending** and **Volunteering**.

## Add to calendar
- If attending AND volunteering: two entries — `[Volunteering] Name` (slot's time) and
  `[Attending] Name` (event's time). Export checks both collections per person.

## Admin tools
- Filtered **CSV export** (Attending / Volunteering / All).
- Filtered **email / in-app notify** (Attending / Volunteering / All). Email is live via Brevo;
  in-app-notify is an alternative/addition.
- **Remove participant** prompt: notify via In-app / Email / Both / Don't notify + editable
  pre-filled message. UI hint: self-requested → in-app; other reasons → email. Not enforced.
- **Contact the organizer** button (per-event method above; never auto-exposes personal phone).

## Private organizer messaging (§10) — FAST-FOLLOW
- Private 1:1 thread per attendee/volunteer ↔ event admin(s), separate from public chat.
- Sending triggers an in-app notification (existing bell system, new trigger).

## Day-before reminders (§12) — DEFERRED (needs scheduled Functions)
- Per-recipient, personalized: attending → event time+main location; volunteering → their slot's
  time + slot location; item → what they said they'd bring + drop-off. Content spec only for now.

## Build phases
1. **Foundation:** flags + shim; rewritten create/edit form (toggles, RSVP settings, contact
   method, multi-location, item ordering); event page renders sections independently + two
   bubble rows + Save-the-Date open-registration controls.
2. **RSVP depth:** guests/names, capacity, comment, "also attending", split calendar export.
3. **Admin tools:** filtered export, filtered email/notify, remove-with-notification prompt.
4. **Fast-follow:** private organizer messaging.
5. **Deferred:** day-before reminders (needs Functions).
