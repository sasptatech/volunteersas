# Pending Changes — batch these into GitHub together

## Big feature: Event types

**Changed files:**
- admin.html — event creation now has a **type** selector:
  - **Standard (RSVP)** — same as before
  - **Save the Date** — no RSVP shown, just "sign-ups aren't open yet" (description
    auto-fills "More details coming soon." if left blank)
  - **Volunteer Slots** — define any number of custom slot groups (label, start/end
    time, capacity) — e.g. "Decorating 9-10am, 3 spots", "MS setup 10-11am, 2 spots"
  - **Item Sign-up** — define categories with a quota (e.g. "Savory dish, 5") —
    volunteers sign up and type what they're bringing
- event.html — renders each type appropriately; slot/item sign-ups have their own
  sign-up modals and per-volunteer remove buttons
- schedule.html — My Schedule now also shows slot and item sign-ups alongside
  events and Cafe shifts

**Note:** an event's type is set at creation and can't be changed afterward (kept
simple for now — recreate the event if you picked the wrong type).

## IMPORTANT — re-publish Firestore rules again
Two new collections (`eventSlotSignups`, `eventItemSignups`) needed rule entries,
same situation as `settings`/`cafeDayOverrides` before. Firebase console →
Firestore Database → Rules → paste the updated `firestore.rules` → Publish.

## Still outstanding (tracked, not urgent)
- reCAPTCHA v3 site key still a placeholder (agreed: later)
- Real email sending not wired up yet (agreed: tomorrow/later)

## Done
- ~~Firebase Storage rules~~ ✅ published
- ~~Firestore TTL policy on chatMessages.expiresAt~~ ✅ created
- ~~Seed test events button~~ ✅ added to Admin
- ~~Event RTE + attachments/photos~~ ✅ added
- ~~Join flow Back button~~ ✅ added
