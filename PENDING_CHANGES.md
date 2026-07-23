# Pending Changes — batch these into GitHub together

## This round: Cafe time dropdowns + self-service account deletion

**Changed files:**
- js/cafe-dates.js — added halfHourOptions() helper (6:00 AM–6:00 PM, 30-min steps)
- cafe.html — extra slot Start/End time are now dropdowns using that list, so
  every time looks consistent (no more free-typed variations)
- profile.html — new "Danger zone" section: **Delete my account**. Requires
  typing DELETE to confirm. Cancels the user's own event RSVPs, Cafe shifts,
  volunteer slots, and item sign-ups, deletes their profile, then removes their
  login. (Their historical Hours records are left in place — same as how admin-
  initiated removal already works — since those are treated as an org record,
  not something only they can act on.)
- firestore.rules — users collection now allows a user to delete their *own*
  document (previously Superadmin-only for both update and delete)

## IMPORTANT — re-publish Firestore rules
The `users` collection rule changed (self-delete permission). Firebase console →
Firestore Database → Rules → paste updated firestore.rules → Publish.

## Still outstanding (tracked, not urgent)
- reCAPTCHA v3 site key still a placeholder (agreed: later — email/captcha next session)
- Real email sending not wired up yet (agreed: later)
- CSV/email-list export per event — not yet built
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
- ~~Cafe bubbles: timing, grouping, sort by start time~~ ✅ done
- ~~Members tab: sort, rename buttons, new column~~ ✅ done
- ~~Superadmin implicit Admin + Store Admin fixes~~ ✅ done
- ~~Cafe extra slot time dropdowns (half-hour, 6am–6pm)~~ ✅ done
- ~~Self-service delete my account~~ ✅ done
