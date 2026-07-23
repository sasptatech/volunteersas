# Pending Changes — batch these into GitHub together

## This round: 4 fixes

**Changed files:**
- admin.html — removed the seed events button entirely; Members tab now visible
  to any Admin/Store Admin (grant/revoke/remove actions still Superadmin-only)
- cafe.html — extra slot creation now asks "how many slots?" and creates that
  many at once; also notifies Store Admins when a volunteer self-cancels a shift
- event.html — self-cancel (RSVP, volunteer slot, item sign-up) now notifies
  that event's admin(s)
- firestore.rules — fixed the actual bug behind "add slots doesn't work": the
  create rule required the signup's uid to match the creator's uid, which broke
  for admin-created *unclaimed* slots (uid: null by design). Rule now allows
  Store Admins to create unclaimed slots, and any volunteer to claim one.

## IMPORTANT — re-publish Firestore rules
The cafeSignups rule changed. Firebase console → Firestore Database → Rules →
paste updated firestore.rules → Publish.

## Still outstanding (tracked, not urgent)
- reCAPTCHA v3 site key still a placeholder (agreed: later — email/captcha next session)
- Real email sending not wired up yet (agreed: later)
- CSV/email-list export per event — not yet built
- Self-service "delete my account" — not yet built
- Anti-bot measures (robots.txt, invite-gating) — not yet built

## Done
- ~~Firebase Storage rules~~ ✅ published
- ~~Firestore TTL policy on chatMessages.expiresAt~~ ✅ created
- ~~Event RTE + attachments/photos~~ ✅ added
- ~~Join flow Back button~~ ✅ added
- ~~Event types (save the date / slots / item sign-up)~~ ✅ added
- ~~Mappedin location list~~ ✅ populated (605 locations)
- ~~My Schedule rebuild (list + calendar views)~~ ✅ done
- ~~Hours verification removed~~ ✅ done
- ~~Seed data replaced with real PTA events, then seed button removed~~ ✅ done
- ~~Cafe extra slots quantity + permission fix~~ ✅ done
- ~~Self-cancel notifies admins~~ ✅ done
- ~~Members tab open to any Admin/Store Admin~~ ✅ done
