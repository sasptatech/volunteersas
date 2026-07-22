# Pending Changes — batch these into GitHub together

## Ready to upload now — full set of new/changed files

**New files:**
- event.html
- cafe.html
- schedule.html
- profile.html
- admin.html
- js/cafe-dates.js
- js/chat.js

**Changed files:**
- index.html (phone label fix + join-button bug fix, from before)
- js/firebase-init.js (added Firebase Storage support)
- README.md (setup instructions updated)

## Before this is testable end-to-end, two setup steps are required
(full instructions in README.md)
1. Add Firebase **Storage** security rules (separate system from Firestore rules — currently blocks all uploads)
2. Add a Firestore **TTL policy** on `chatMessages.expiresAt` so chats actually auto-delete after 7 days

## Still outstanding (tracked, not urgent)
- reCAPTCHA v3 site key still a placeholder (agreed: later)
- Real email sending not wired up yet (agreed: tomorrow/later)
