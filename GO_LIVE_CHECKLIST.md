# Go-Live Checklist

Things to do before opening VolunteerSAS to the wider SAS community.
Current status: **soft launch** (invite-only, small trusted group).

Each item says *why* it matters, so future volunteers can judge what's still relevant.

---

## 🔴 Do now (already overdue / blocking correctness)

### 1. Add hosting domains to reCAPTCHA
**Why:** App Check verifies traffic using a reCAPTCHA key that only trusts a list of
domains. We moved hosting from Netlify to Firebase, so the new URL is not on that
list yet — App Check will fail on it and the verified-traffic metrics will be wrong.

- Go to https://www.google.com/recaptcha/admin → the **VolunteerSAS** key → **Domains**
- Make sure these are all listed:
  - `sasptavolunteer.web.app`  ← **new Firebase Hosting URL, add this**
  - `sasptavolunteer.firebaseapp.com`  ← Firebase's second default domain
  - `delightful-daifuku-1155c1.netlify.app`  ← keep while Netlify is still up
  - `localhost`  ← local testing
  - *(add the PTA custom domain once it exists — see below)*

**Not urgent in the "something is broken" sense** — App Check enforcement is OFF, so
nothing is blocked. But metrics stay meaningless until this is fixed.

---

## 🟠 Before the wider public launch

### 2. Turn on App Check enforcement
**Why:** This is what actually blocks bots. It is deliberately OFF right now, because
enforcing while legitimate traffic is unverified would lock out real users.

- Check the dashboard: Firebase console → **App Check** → **APIs** → **Cloud Firestore**
- Wait for **~24–48h of normal real use**, then confirm **Verified is ~95%+**
  - Last reading (2026-07-23): 66% verified — but that was polluted by setup noise
    and automated testing, so it needs a clean window before it means anything.
- Then enforce **one service at a time**, watching a day between each:
  1. Cloud Firestore
  2. Authentication
  3. Cloud Storage

### 3. Get the PTA domain and switch email over to it
**Why:** Email currently sends from a **Gmail** address via Brevo. Brevo flags this
(`DKIM: Default`, `DMARC: Freemail domain not compliant`) because Google/Yahoo/Microsoft
distrust mail sent "as" a gmail.com address by a third party. Deliverability is weak.

**⚠️ Until this is done: do NOT send real member-wide email blasts.** A bad first bulk
send damages sending reputation for a long time. Admin-to-admin testing is fine.

Steps once the group agrees on a domain name:
- [ ] Buy the domain (~$10–15/yr) — PTA-owned, **not** `sas.edu.sg` (that's the school's;
      using it needs school IT to change DNS and puts PTA mail on the school's reputation)
- [ ] Brevo → **Domains** (https://app.brevo.com/senders/domain/list) → add + authenticate
      it (paste the DKIM/SPF DNS records into the registrar). This clears both warnings.
- [ ] Update the **Firebase Trigger Email extension** config → **Default FROM address** →
      `noreply@<newdomain>`. *This is the only change needed* — no code edit, because the
      app deliberately never sets a `from` field.
- [ ] Add the new domain to **reCAPTCHA** domains (see item 1)
- [ ] Attach the domain to **Firebase Hosting** (console → Hosting → Add custom domain)

### 4. Scope the Storage write rules — ✅ DONE (2026-07-24)
Writes are now scoped per folder with size/type caps and Firestore-backed role
checks: profile photos = owner only (image <8MB); event photos/attachments = that
event's admins; cafe menu = Store Admin (PDF/image <25MB). Read already required
sign-in. (storage.rules — published in the console.)

### 5. Close the privacy/abuse gaps in Firestore rules — partly done
- ⬜ **STILL OPEN (this is Phase 2):** any signed-in user can read every user
  profile — email, phone/WhatsApp, real name. The **`anonymous` toggle is only
  cosmetic** as a result. Proper fix is a data-model change: split a public
  profile (display name/photo) from private contact fields. ~half a day.
- ✅ **DONE:** notification `from` must equal the sender's own display name
  (no impersonation).
- ✅ **DONE:** claiming a Cafe extra slot may change only `uid`+`name`, never
  the slot's time/message.
- ✅ **DONE (bonus):** audit-log entries can only be written by admins, self-
  attributed. Event descriptions are sanitized on render (no stored XSS).

### 6. Decide what robots.txt should say
**Why:** `robots.txt` currently tells **all** search engines not to index the site — right
for an invite-only soft launch. For a public launch you probably want the landing page
findable. Revisit before announcing.

### 7. Retire Netlify
**Why:** Two live copies of the site is confusing and doubles the places to update.
Once Firebase Hosting is proven, shut the Netlify deploy down — and remove its domain
from the reCAPTCHA list at the same time.

---

## 🟡 Nice to have (not launch blockers)

- **Mirror in-app notifications to email.** Email v1 is admin-triggered only ("Email
  everyone registered" on an event). Auto-emailing notifications was deliberately
  deferred to avoid accidentally spamming people — revisit once email is proven.
- **CSV / email-list export per event.** In the original spec, never built.
- **Invite-gating registration.** Right now anyone with the URL can create an account;
  only `robots.txt` discourages discovery. Consider per-person invite codes if the open
  URL becomes a problem.
- **Staging vs production Firebase split.** Deliberately not done — one system for now,
  clone to staging once stable.

---

## Reference — where things live

| Thing | Where |
|---|---|
| Repo | github.com/sasptatech/volunteersas (auto-deploys from `main`) |
| Hosting | Firebase Hosting → https://sasptavolunteer.web.app |
| Old hosting | Netlify → delightful-daifuku-1155c1.netlify.app (being retired) |
| Firebase project | `sasptavolunteer` (Blaze plan), Firestore in `asia-southeast1` |
| Email sending | Brevo (free tier) + Firebase "Trigger Email from Firestore" extension |
| Email queue | Firestore `mail` collection (admins only can write) |

**Note on rules files:** `firestore.rules` and `storage.rules` in this repo are the
source of truth, but they are **published by hand** in the Firebase console. If you
change them here, you must also paste and publish them in the console — nothing does
that automatically.
