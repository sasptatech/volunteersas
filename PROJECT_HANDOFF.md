# VolunteerSAS — Project Handoff for Claude Code

This project was built collaboratively in a Claude.ai chat session and is now
moving to Claude Code for continued development. This doc captures context,
decisions, and gotchas that aren't obvious from reading the code alone.

## What this is
A volunteer sign-up platform for the Singapore American School (SAS) PTA —
event RSVPs, a PTA Cafe shift scheduler, chat, and a role-based admin system.
Built for a non-technical PTA IT volunteer (the user) working with Claude.

## Where things live
- **GitHub repo:** github.com/sasptatech/volunteersas (main branch)
- **Live site:** delightful-daifuku-1155c1.netlify.app (auto-deploys from GitHub
  main on every push — no build step, static files)
- **Firebase project:** sasptavolunteer (Blaze plan, for Storage)
- **Firestore region:** asia-southeast1 (Singapore)

## Architecture — and why
- **Multi-page vanilla HTML/JS, ES modules, no build step.** Deliberately
  chosen over React/a framework so the person (non-developer, working
  incrementally in chat) could keep shipping fast without a Node/webpack
  toolchain. This may be worth reconsidering now that development is moving
  to Claude Code, where a build step is much less friction — but don't
  silently introduce one; ask first, since it changes the deploy story.
- **Firebase**: Auth (Google + email/password), Firestore (data), Storage
  (photos/documents/menu images), no Cloud Functions yet.
- Shared modules in `js/`: `firebase-init.js` (Firebase setup + exports),
  `auth.js` (auth + profile + role helpers), `common.js` (header/nav, toast,
  avatar bubbles, modal overlay), `cafe-dates.js` (school-day/date math),
  `chat.js` (shared chat panel), `calendar.js` ("add to calendar" export),
  `rte.js` (minimal rich text editor), `mappedin-locations.js` (605 SAS
  location names + deep-link builder).

## ⚠️ Important: Firestore rules may be out of sync
The user manually copy-pastes `firestore.rules` into the Firebase console each
time it changes — there's no CI/CD doing this. **Don't assume the rules file
in the repo matches what's actually live.** If anything permission-related
seems to fail, ask the user to confirm they've published the latest rules
before debugging the code.

## Role system (this is the crux of the whole app)
Three tiers, confirmed after real back-and-forth — don't redesign this without
checking with the user first:
- **Superadmin** — only role that can grant Admin/Store Admin to others.
  Bootstrapped by manually adding `isSuperadmin: true` to a user's Firestore
  doc via console (no self-service promotion, by design).
- **Admin** — can create events; auto-becomes that event's Event Admin.
- **Store Admin** — access to the PTA Cafe backend (open/close days, extra
  slots, menu).
- **Event Admin** — automatic for whoever creates an event; can add other
  Admin/Store Admin users as co-admins for that specific event.
- **Superadmins are implicitly both Admin and Store Admin everywhere** — this
  is handled via `isAdmin()`/`isStoreAdmin()` helper functions in `auth.js`
  that OR in `isSuperadmin`. When checking a *specific* user's raw
  `.isAdmin`/`.isStoreAdmin` fields directly (not the current user via the
  helpers), remember to OR in `.isSuperadmin` too — this has been a recurring
  bug source (see event.html's co-admin picker, admin.html's Members table).

## Data model (Firestore collections)
- `users/{uid}` — profile: displayName, email, phone (optional, WhatsApp),
  divisions (array of lowercase ids: `le`/`ue`/`ms`/`hs`), anonymous (bool),
  status (free text), photoURL, emailOptOut, isAdmin, isStoreAdmin,
  isSuperadmin
- `events/{id}` — title, date, time, location, mappedinLocationId (optional),
  description (HTML from the RTE), divisions (array, lowercase ids),
  adminUids (array), attachments (array of `{name,url}`), photos (array of
  URLs), `type`: `standard` | `save_the_date` | `volunteer_slots` |
  `item_signup`; if `volunteer_slots`: `slotGroups` (array of
  `{id,label,startTime,endTime,capacity}`); if `item_signup`:
  `itemCategories` (array of `{id,label,quota}`)
- `signups/{id}` — standard event RSVPs: `{eventId, uid, createdAt}`
- `eventSlotSignups/{id}` — volunteer slot sign-ups: `{eventId, slotGroupId,
  uid, name, comment, createdAt}`
- `eventItemSignups/{id}` — item sign-ups: `{eventId, categoryId, uid, name,
  item, createdAt}`
- `cafeSignups/{id}` — Cafe shifts AND extra slots in one collection.
  Regular shifts: `{date, shift: 'am'|'pm', uid, name, comment, hoursId}`.
  Extra slots: `{date, shift: 'extra', overflow: true, groupId, message,
  startTime, endTime, uid: null until claimed, name: null until claimed}` —
  multiple docs share a `groupId` when created as a batch ("add N slots"),
  and render as one grouped bubble in the UI.
- `cafeDayOverrides/{date}` — Store Admin open/close overrides:
  `{status: 'open'|'closed'}`
- `hours/{id}` — volunteer hours log: `{uid, volunteer, event, eco, date,
  hrs, createdAt}`. **No verification/status field** — logged hours are just
  logged; admins can only delete an entry (labeled "no-show"), there's no
  Pending/Verified concept (deliberately removed — nobody monitors
  attendance in practice).
- `chatMessages/{id}` — `{scope: 'event'|'cafe', scopeId, uid, name,
  anonymous, text, createdAt, expiresAt}`. A Firestore TTL policy on
  `expiresAt` (collection group `chatMessages`) auto-deletes after ~24h past
  the 7-day expiry — already configured in the live Firebase project.
- `notifications/{id}` — in-app notifications: `{to, from, subject, body,
  read, createdAt}`
- `auditLog/{id}` — Superadmin-visible action log
- `removedMemberArchive/{id}` — admin-initiated member removal archive
  (self-service account deletion does NOT archive — see below)
- `settings/cafeMenu` — `{url, type: 'pdf'|'image', updatedAt}` — currently
  UNUSED, menu.html was simplified to a static "coming soon" placeholder per
  the user's request; this doc/upload path is dead code for now

## Pages
- `index.html` — Discover: auth gate, join flow (display name, phone,
  divisions, anonymous toggle, status, T&C+Community Norms checkbox), event
  feed with division filter pills, featured Cafe banner
- `event.html` — event detail: type-aware participation section (RSVP /
  save-the-date notice / volunteer slots / item sign-up), attendee bubbles,
  attachments, photos, RTE-edited description, chat, Mappedin location link,
  admin tools (edit, co-admin picker, email placeholder)
- `cafe.html` — "Cafe Volunteer": week/month views, shift + extra-slot
  bubbles (sorted together by start time), Store Admin tools (open/close day,
  add extra slots with half-hour time dropdowns), Cafe chat
- `menu.html` — "PTA Cafe": currently just a "coming soon" placeholder
- `schedule.html` — "My Schedule": List view and Calendar view (week/month
  toggle) covering all four sign-up types
- `profile.html` — edit profile, photo upload, **self-service "Delete my
  account"** (type-to-confirm; cancels own signups across all 4 collections,
  deletes profile + Auth account; does NOT archive first — that's only for
  admin-initiated removal)
- `admin.html` — Events / Hours / Members / Audit log tabs, all gated by role

## Deferred by explicit user decision (don't build unless asked)
- **Real email** (SendGrid + Firebase Trigger Email extension) — next up
  after this handoff, per the user
- **reCAPTCHA v3 + Firebase App Check** — also next up, likely first since
  it's faster and self-contained (no DNS dependency like email has)
- **Anti-bot**: `robots.txt`, gating registration behind the invite link
  rather than a public root URL
- **Staging vs. production Firebase split** — deliberately NOT done; building
  as one system for now, will clone to staging once stable (user's call)
- CSV/email-list export per event — in the spec, not yet built

## Style conventions to keep consistent
- Division ids are lowercase (`le`,`ue`,`ms`,`hs`) everywhere in stored data;
  `ECOSYSTEMS` in `auth.js` maps id → `{name, short, color, icon}` for display
- Divisions renamed from the school's original ELC/ES to Lower
  Elementary/Upper Elementary — "Elementary School (ES)" in any old source
  data maps to BOTH `le` and `ue`
- SAS Community Norms + Terms & Conditions text lives in `auth.js` as
  `COMMUNITY_NORMS_SUMMARY` and `TERMS_TEXT` — shown at join
- No copyrighted/verbatim reproduction of source materials; everything
  paraphrased
- Every batch of changes gets a git-style commit title (<50 chars) + bullet
  description — the user asked for this explicitly, keep doing it
