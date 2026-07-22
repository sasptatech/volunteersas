# VolunteerSAS — rewrite

## All pages built
- `index.html` — Discover (auth gate, join flow, event feed, featured Cafe banner)
- `event.html` — event detail: RSVP, attendee bubbles, attachments, admin-posted photos, chat, admin tools (edit, add co-admin, email placeholder)
- `cafe.html` — PTA Cafe: week/month view, shift signups, Store Admin controls (open/close days, extra slots, menu PDF), cafe chat
- `schedule.html` — "My Schedule": combined list of your event RSVPs + Cafe shifts
- `profile.html` — edit name, email, phone, divisions, status, anonymous toggle, email opt-out, profile photo
- `admin.html` — Events / Hours / Members / Audit log tabs, gated by role

## Two things that must be set up before uploads/photos work

### 1. Firebase Storage security rules (separate from Firestore rules!)
Storage has its own rules, and defaults to blocking everything. Firebase console →
**Storage → Rules** → paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

This is a permissive starting rule (same spirit as the Firestore one) — fine for
now, tighten later alongside the Firestore rules tightening.

### 2. Firestore TTL policy for 7-day chat auto-delete
Chat messages write an `expiresAt` field, but nothing deletes them without a TTL
policy configured. Firebase console → **Firestore Database → TTL policies** (or via
`gcloud firestore fields ttls update expiresAt --collection-group=chatMessages`) →
add a policy on the `chatMessages` collection group, field `expiresAt`.

## Still using the permissive Firestore rule
Per our earlier decision, we're building everything as one system for now (no
staging split yet) and holding off on the stricter `firestore.rules` until the
new data model (adminUids, isSuperadmin, etc.) is fully wired up and tested.

## Known placeholders
- reCAPTCHA v3 site key in `firebase-init.js` — still a placeholder, no bot
  protection live yet (agreed: later)
- "Email everyone registered" button on event.html shows a toast — doesn't send
  real email yet, pending SendGrid setup
