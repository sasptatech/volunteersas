# Pending Changes — batch these into GitHub together

## Ready to upload now

**New file:**
- js/calendar.js — "Add to calendar" (Google Calendar link + .ics download)

**Changed files:**
- cafe.html — calendar export shown after signing up for a shift
- event.html — calendar export shown on the event page
- schedule.html — calendar export button on every item in My Schedule

## Still investigating
- Cafe shift not showing on My Schedule earlier — no bug found in the code on review;
  most likely cause is testing before schedule.html was uploaded. Please retest and
  report back if it still doesn't show up (check the `cafeSignups` doc's `uid` field
  in Firestore console if so).

## Still outstanding (tracked, not urgent)
- TTL policy on chatMessages.expiresAt — blocked, needs one real chat message sent
  first so the collection exists, then set up via:
  console.cloud.google.com/firestore/databases/-default-/ttl?project=sasptavolunteer
- reCAPTCHA v3 site key still a placeholder (agreed: later)
- Real email sending not wired up yet (agreed: tomorrow/later)

## Done
- ~~Firebase Storage rules~~ ✅ published
