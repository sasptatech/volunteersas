# VolunteerSAS — rewrite in progress

## What's built so far
- `js/firebase-init.js` — Firebase modular SDK setup (Auth, Firestore, App Check placeholder)
- `js/auth.js` — sign-up/sign-in, profile creation, role helpers (Superadmin/Admin/Store Admin), divisions (LE/UE/MS/HS), Terms & Community Norms text
- `js/common.js` — shared UI: toast, avatar bubbles (blank/initial/photo), header/nav, notification bell, modal overlay helper
- `css/styles.css` — shared design system
- `index.html` — Home page: auth gate (Google + email), 2-step join flow (display name, phone, divisions, anonymous toggle, status, T&C checkbox), event feed

## Still to build
1. `event.html` — event detail page (attachments, admin-posted photos, chat, RSVP, attendee bubbles)
2. `cafe.html` — PTA Cafe (rebuilt for Store Admin model: open/close days, ad-hoc uncapped extra slots, cafe chat, menu PDF)
3. `schedule.html` — "My Schedule" page
4. `profile.html` — edit profile (photo upload, status, divisions, email opt-out, anonymous toggle)
5. `admin.html` — the full backend: event creation (writes `adminUids`), Superadmin controls (grant Admin/Store Admin, audit log, removed-member archive), Store Admin Cafe backend, Hours reporting

## Before this goes anywhere near production
- Set your own `isSuperadmin: true` in Firestore (see chat) so you can access the Admin page once it exists
- Register a reCAPTCHA v3 site key and paste it into `firebase-init.js` (currently a placeholder — App Check silently no-ops without it, which is fine for continued local building)
- This all still points at the **sasptavolunteer** project, per your call to build as one system for now and clone to staging once ready
- `firestore.rules` (shared earlier) matches this new data model — but hold off re-publishing it until enough of the app is built that basic things (event creation, cafe signups) actually work end-to-end against it
