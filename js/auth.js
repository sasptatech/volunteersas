// auth.js — shared authentication + profile logic used by every page.
import {
  auth, db, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signInWithPopup, fbSignOut,
  doc, getDoc, setDoc, serverTimestamp
} from "./firebase-init.js";

export const ECOSYSTEMS = [
  { id: "le", name: "Lower Elementary", short: "LE", color: "#0E8A6D", icon: "🧸" },
  { id: "ue", name: "Upper Elementary", short: "UE", color: "#0057B8", icon: "📘" },
  { id: "ms", name: "Middle School",     short: "MS", color: "#7B3FA0", icon: "🎭" },
  { id: "hs", name: "High School",       short: "HS", color: "#B01C2E", icon: "🎓" },
];
export const ALL_DIVISION_IDS = ECOSYSTEMS.map(e => e.id);

export const COMMUNITY_NORMS_SUMMARY =
  "As an SAS community member, I agree to hold myself to a high standard of personal " +
  "conduct: contributing productively and positively, assuming positive intent, " +
  "refraining from discrimination (religious, ethnic, racial, sexual, or gender), " +
  "going to the source, and sharing accurate information. Before posting, I'll ask: " +
  "is it true, is it fair to all concerned, will it build a better community, and is " +
  "it beneficial to all?";

export const TERMS_TEXT =
  "By joining VolunteerSAS I attest that I am a current SAS parent, guardian, or staff " +
  "member. I understand that the PTA and SAS are not liable for incidents, injuries, " +
  "or disputes arising from volunteering or use of this platform. I agree to keep " +
  "information on this platform within the SAS community and not share it with " +
  "non-SAS individuals. I agree to follow the SAS Community Norms. I understand my " +
  "account may be removed for violating these terms.";

let currentProfile = null;
let profileListeners = [];

export function onProfileChange(cb) {
  profileListeners.push(cb);
  if (currentProfile !== undefined) cb(currentProfile);
  return () => { profileListeners = profileListeners.filter(f => f !== cb); };
}
function notifyProfile(p) {
  currentProfile = p;
  profileListeners.forEach(cb => cb(p));
}
export function getProfile() { return currentProfile; }
export function myUid() { return auth.currentUser ? auth.currentUser.uid : null; }
export function myName() { return currentProfile ? currentProfile.displayName : ""; }
export function isAnonymous() { return !!(currentProfile && currentProfile.anonymous); }

// Role helpers — used by pages to decide what UI to show.
// (The Firestore rules are the real enforcement; these are just for the UI.)
export function isSuperadmin() { return !!(currentProfile && currentProfile.isSuperadmin); }
export function isAdmin() { return !!(currentProfile && (currentProfile.isAdmin || currentProfile.isSuperadmin)); }
export function isStoreAdmin() { return !!(currentProfile && (currentProfile.isStoreAdmin || currentProfile.isSuperadmin)); }
export function isAnyAdminTier() { return isAdmin() || isStoreAdmin(); }

export function watchAuth(onSignedIn, onSignedOut) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) { notifyProfile(null); onSignedOut && onSignedOut(); return; }
    const snap = await getDoc(doc(db, "users", user.uid));
    const DEFAULTS = {
      displayName: user.displayName || 'Volunteer', email: user.email || '', phone: '',
      divisions: [], anonymous: false, status: '', photoURL: '', emailOptOut: false,
      isAdmin: false, isStoreAdmin: false, isSuperadmin: false,
    };
    if (snap.exists() && snap.data().displayName) {
      notifyProfile({ uid: user.uid, ...DEFAULTS, ...snap.data() });
      onSignedIn && onSignedIn(currentProfile, false);
    } else if (snap.exists()) {
      // Doc exists but is incomplete (e.g. created by manually adding an admin
      // flag in the console rather than via the join flow). Merge in safe
      // defaults so nothing downstream ever writes `undefined` to Firestore.
      notifyProfile({ uid: user.uid, ...DEFAULTS, ...snap.data() });
      onSignedIn && onSignedIn(currentProfile, false);
    } else {
      notifyProfile(null);
      onSignedIn && onSignedIn(null, true); // true = needs profile completion
    }
  });
}

export async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
export async function emailSignUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export async function emailSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export async function signOutUser() {
  return fbSignOut(auth);
}

// Creates the Firestore profile doc after auth succeeds (join flow, step 2).
export async function completeProfile({ displayName, phone, divisions, anonymous, status }) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");
  const profile = {
    displayName: displayName || user.displayName || "Volunteer",
    email: user.email || "",
    phone: phone || "",
    divisions: divisions || [],
    anonymous: !!anonymous,
    status: status || "",
    photoURL: "",
    emailOptOut: false,
    isAdmin: false,
    isStoreAdmin: false,
    isSuperadmin: false,
    acceptedTermsAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  };
  await setDoc(doc(db, "users", user.uid), profile);
  notifyProfile({ uid: user.uid, ...profile });
  return profile;
}
