# Pending Changes — batch these into GitHub together

## Mappedin location list is live (605 locations)

**Changed file:**
- js/mappedin-locations.js — populated with all 605 locations from your file.
  Switched from a dropdown to a **type-to-search field** (with a datalist) since
  a 605-item `<select>` would be unusable — typing still feels like picking
  from a list, just searchable.
- admin.html, event.html — location fields updated to use the searchable input

**Please test the very first real link** once uploaded (create/edit an event,
pick a location, click the resulting link) — the URL format is still a
best-effort guess, tell me if it doesn't land in the right spot.

## My Schedule — fully rebuilt

**Changed file:**
- schedule.html — now has:
  - **List view**: same cards as before, but now clearly shows date, time, and
    location on every item (this was the missing piece)
  - **Calendar view**: toggle between **Week** and **Month**. Month shows a
    standard grid with color-coded chips per item type; Week shows each day
    with fuller item details. Click any item to go to its page.

## Removed hours verification (from earlier)
- admin.html, cafe.html — Status/Verify replaced with a single "Remove (no-show)" action

## Still outstanding (tracked, not urgent)
- reCAPTCHA v3 site key still a placeholder (agreed: later — email/captcha next session)
- Real email sending not wired up yet (agreed: later)
- Re-publish firestore.rules if not done yet from the event-types round
- Two real gaps flagged earlier, not yet fixed: self-cancel doesn't notify the
  admin; Members directory is Superadmin-only instead of any Admin/Store Admin
  (let me know if you want these done now)

## Done
- ~~Firebase Storage rules~~ ✅ published
- ~~Firestore TTL policy on chatMessages.expiresAt~~ ✅ created
- ~~Seed test events button~~ ✅ added to Admin
- ~~Event RTE + attachments/photos~~ ✅ added
- ~~Join flow Back button~~ ✅ added
- ~~Event types (save the date / slots / item sign-up)~~ ✅ added
- ~~Mappedin location list~~ ✅ populated (605 locations)
- ~~My Schedule rebuild (list + calendar views)~~ ✅ done
- ~~Hours verification removed~~ ✅ done
