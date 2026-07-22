# Pending Changes — batch these into GitHub together

## Ready to upload now

**New file:**
- js/rte.js — lightweight rich text editor (bold/italic/lists/links), no external library

**Changed files:**
- admin.html — event creation now has: RTE description, attachment upload, photo upload
- event.html — description now renders as rich HTML; Attachments/Photos boxes restored
  (read-only display); the Edit form now uses the RTE and lets admins add more
  attachments/photos to an existing event
- menu.html — simplified to a "coming soon" placeholder, per your call

## Note on the RTE
It's a simple contenteditable-based editor (bold, italic, bulleted/numbered lists,
links) — not a full word processor, but covers what event descriptions need without
adding a heavy library or build step.

## Still outstanding (tracked, not urgent)
- reCAPTCHA v3 site key still a placeholder (agreed: later)
- Real email sending not wired up yet (agreed: tomorrow/later)

## Done
- ~~Firebase Storage rules~~ ✅ published
- ~~Firestore TTL policy on chatMessages.expiresAt~~ ✅ created
- ~~Seed test events button~~ ✅ added to Admin
