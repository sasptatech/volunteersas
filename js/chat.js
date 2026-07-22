// chat.js — shared chat panel for event pages and the PTA Cafe page.
// Messages auto-delete after 7 days (requires a Firestore TTL policy on
// chatMessages.expiresAt — see README for the one-time console setup).
import { db, collection, addDoc, onSnapshot, query, where, serverTimestamp } from "./firebase-init.js";
import { myUid, myName, isAnonymous } from "./auth.js";
import { esc, toast, bubbleHtml } from "./common.js";

// Small first-layer blocklist — not exhaustive, pairs with the report-message flow.
const BLOCKLIST = ["fuck", "shit", "bitch", "asshole", "cunt", "nigger", "faggot"];
function containsBlockedWord(text) {
  const lower = text.toLowerCase();
  return BLOCKLIST.some(w => lower.includes(w));
}

export function renderChatPanel(containerId, scope, scopeId, opts = {}) {
  const el = document.getElementById(containerId);
  el.innerHTML = `
    <div class="chat-panel">
      <div class="chat-head">💬 Messages are automatically deleted after 7 days.</div>
      <div class="chat-body" id="${containerId}-body"><p style="color:var(--ink-soft);font-size:13px">Loading…</p></div>
      <div class="chat-input">
        <input id="${containerId}-input" placeholder="Write a message…" maxlength="500">
        <button class="btn btn-primary" id="${containerId}-send">Send</button>
      </div>
    </div>`;

  const q = query(collection(db, "chatMessages"), where("scope", "==", scope), where("scopeId", "==", scopeId));
  onSnapshot(q, snap => {
    const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
    const body = document.getElementById(`${containerId}-body`);
    if (!body) return;
    body.innerHTML = msgs.map(m => `
      <div style="display:flex;gap:8px;align-items:flex-start;${m.uid === myUid() ? 'flex-direction:row-reverse' : ''}">
        ${bubbleHtml(m.anonymous ? null : { displayName: m.name, photoURL: m.photoURL, anonymous: m.anonymous })}
        <div class="chat-bubble ${m.uid === myUid() ? 'me' : ''}">
          ${!m.anonymous ? `<div style="font-weight:700;font-size:11px;margin-bottom:2px">${esc(m.name)}</div>` : ''}
          ${esc(m.text)}
          ${opts.canModerate ? `<div style="margin-top:4px"><button class="small-link" style="color:var(--red)" onclick="window.__moderateDelete_${containerId}('${m.id}')">Remove</button></div>` : ''}
        </div>
      </div>`).join('') || `<p style="color:var(--ink-soft);font-size:13px">No messages yet — be the first to say hello.</p>`;
    body.scrollTop = body.scrollHeight;
  });

  if (opts.canModerate) {
    window[`__moderateDelete_${containerId}`] = async (msgId) => {
      if (!confirm('Remove this message?')) return;
      const { deleteDoc, doc } = await import("./firebase-init.js");
      try { await deleteDoc(doc(db, "chatMessages", msgId)); } catch (e) { toast('Could not remove message: ' + e.message); }
    };
  }

  document.getElementById(`${containerId}-send`).onclick = async () => {
    const input = document.getElementById(`${containerId}-input`);
    const text = input.value.trim();
    if (!text) return;
    if (containsBlockedWord(text)) { toast('Please keep messages respectful — that message was blocked.'); return; }
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    try {
      await addDoc(collection(db, "chatMessages"), {
        scope, scopeId, uid: myUid(), name: myName(), anonymous: isAnonymous(),
        text, createdAt: serverTimestamp(), expiresAt: expires,
      });
      input.value = '';
    } catch (e) { toast('Could not send: ' + e.message); }
  };
  document.getElementById(`${containerId}-input`).addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById(`${containerId}-send`).click();
  });
}
