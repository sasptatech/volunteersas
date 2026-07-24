// email.js — the one place outgoing mail is composed and queued.
//
// Docs written here are picked up by the Firebase "Trigger Email from Firestore"
// extension, which does the actual sending via Brevo.
//
// We deliberately write ONE DOC PER RECIPIENT rather than a single BCC message:
// each person then receives a normal email addressed to them, instead of one
// addressed to the sender with everyone hidden in BCC. Recipients still can't
// see each other. Docs from the same send share a `batchId` so the Sent email
// view can group them back into one entry.
//
// We never set `from` — the extension's configured default sender is used, so
// switching to the real PTA domain stays a config-only change.
import { db, collection, doc, serverTimestamp, writeBatch } from "./firebase-init.js";
import { getProfile } from "./auth.js";
import { esc } from "./common.js";

const BATCH_LIMIT = 450; // Firestore caps a write batch at 500; leave headroom.

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * Queue an email to a list of addresses.
 * @param {string[]} recipients  Already de-duplicated, opt-outs already removed.
 * @param {string}   subject
 * @param {string}   body        Plain text as typed by the admin.
 * @param {string}   replyTo     Where replies should go.
 * @param {string}   reason      Why they're receiving it (shown in the footer).
 * @param {string}   scope       'event' | 'cafe' — for grouping in the Sent view.
 * @param {object}   meta        Extra fields stored on each doc (e.g. eventId).
 * @returns {Promise<{batchId: string, count: number}>}
 */
export async function queueEmails({ recipients, subject, body, replyTo, reason, scope, meta = {} }) {
  const me = getProfile();
  const prefsUrl = `${location.origin}/profile.html`;
  const batchId = 'send_' + Date.now();

  const text = `${body}\n\n— SAS PTA · VolunteerSAS\n${reason} `
    + `To stop receiving these emails, sign in and turn off email notifications in your profile: ${prefsUrl}`;
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a">`
    + `${esc(body).replace(/\n/g, '<br>')}`
    + `<br><br><hr style="border:none;border-top:1px solid #e5e0d8">`
    + `<p style="font-size:12px;color:#8a857c;margin:0">— SAS PTA · VolunteerSAS<br>${esc(reason)} `
    + `<a href="${prefsUrl}">Sign in and turn off email notifications</a> to stop receiving these.</p></div>`;

  for (const group of chunk(recipients, BATCH_LIMIT)) {
    const batch = writeBatch(db);
    group.forEach(address => {
      // Firestore rejects undefined, so replyTo is spread in only when set.
      batch.set(doc(collection(db, 'mail')), {
        to: [address],
        ...(replyTo ? { replyTo } : {}),
        message: { subject, text, html },
        // Our own bookkeeping — ignored by the extension, read by the Sent view.
        batchId, scope, subject,
        recipientCount: recipients.length,
        sentByUid: me.uid, sentByName: me.displayName,
        createdAt: serverTimestamp(),
        ...meta,
      });
    });
    await batch.commit();
  }
  return { batchId, count: recipients.length };
}
