# Pending Changes — batch these into GitHub together

## This round: Cafe bubbles, menu link, Members tab overhaul

**Changed files:**
- js/cafe-dates.js — shift labels renamed to "Morning shift" / "Afternoon shift";
  added explicit startTime/endTime fields; added timeToMinutes() sort helper
- cafe.html — extra slots now ask for start/end time and render as their own
  bubble (same card style as the shift bubbles), grouped by batch so N slots
  with the same message/time show as one bubble with an "X open" count. All
  bubbles on a day (shifts + extras) are now sorted together by start time.
  Also removed the "View this term's menu" link banner.
- schedule.html — updated to use the new explicit start/end time fields
  (previously parsed them out of the old label text)
- admin.html — Members tab:
  - Sortable "Name" and "Roles" column headers (click to sort/reverse)
  - Make Admin/Make Store Admin buttons hidden for members who are already
    Superadmin (they don't need them)
  - "Remove Admin"/"Remove Store Admin" renamed to "Revoke Admin"/"Revoke Store Admin"
  - Directory removal renamed to "Delete from directory", moved to its own column

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
- ~~Cafe bubbles: timing, grouping, sort by start time~~ ✅ done
- ~~Members tab: sort, rename buttons, new column~~ ✅ done

## Additional fix in this same batch
- Superadmins are now correctly treated as implicit Admin + Store Admin
  everywhere (this was already true for permissions via isAdmin()/isStoreAdmin()
  helpers, but two spots checked the raw flags directly and missed it):
  - event.html: Superadmins now show up as eligible co-admins for events
  - admin.html: Members table now displays a Superadmin's badges as
    "⭐ Superadmin 🛡️ Admin ☕ Store Admin" instead of just the star
