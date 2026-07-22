// rte.js — a minimal, dependency-free rich text editor (contenteditable + toolbar).
// Not a full editor, but covers what event descriptions need: bold/italic/lists/links.

export function rteHtml(editorId, initialHtml) {
  return `
    <div style="display:flex;gap:4px;margin-bottom:6px;flex-wrap:wrap">
      <button type="button" class="btn btn-ghost" style="padding:5px 10px" onmousedown="event.preventDefault()" onclick="document.execCommand('bold')"><b>B</b></button>
      <button type="button" class="btn btn-ghost" style="padding:5px 10px" onmousedown="event.preventDefault()" onclick="document.execCommand('italic')"><i>I</i></button>
      <button type="button" class="btn btn-ghost" style="padding:5px 10px" onmousedown="event.preventDefault()" onclick="document.execCommand('insertUnorderedList')">• List</button>
      <button type="button" class="btn btn-ghost" style="padding:5px 10px" onmousedown="event.preventDefault()" onclick="document.execCommand('insertOrderedList')">1. List</button>
      <button type="button" class="btn btn-ghost" style="padding:5px 10px" onmousedown="event.preventDefault()" onclick="const u=prompt('Link URL'); if(u) document.execCommand('createLink', false, u)">🔗 Link</button>
    </div>
    <div id="${editorId}" contenteditable="true" style="border:1.5px solid var(--line);border-radius:9px;padding:10px 12px;min-height:120px;font-size:14px;line-height:1.5">${initialHtml || ''}</div>`;
}
export function rteValue(editorId) {
  const el = document.getElementById(editorId);
  return el ? el.innerHTML : '';
}
