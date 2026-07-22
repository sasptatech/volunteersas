// firebase-init.js — single source of truth for Firebase setup.
// All other modules import { auth, db, storage, FV } from here.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, signOut as fbSignOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc,
  deleteDoc, onSnapshot, query, where, orderBy, limit, serverTimestamp,
  arrayUnion, arrayRemove, increment, writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage, ref as storageRef, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js";

// TODO: replace with the STAGING project's config once that project exists.
// This currently points at the same project used throughout the build so far.
const firebaseConfig = {
  apiKey: "AIzaSyBLum4gg84phhoyqVURjSJKttBK_X06_n8",
  authDomain: "sasptavolunteer.firebaseapp.com",
  projectId: "sasptavolunteer",
  storageBucket: "sasptavolunteer.firebasestorage.app",
  messagingSenderId: "425439958644",
  appId: "1:425439958644:web:c451eafad3113e63cee321",
  measurementId: "G-5X0P53FF7D"
};

export const app = initializeApp(firebaseConfig);

// TODO: set this to your real reCAPTCHA v3 site key once registered
// (Firebase console → App Check → register a web app → reCAPTCHA v3 provider).
// App Check silently no-ops in local/dev if this isn't configured yet, so it's
// safe to leave the placeholder in while we build.
const RECAPTCHA_V3_SITE_KEY = "REPLACE_WITH_RECAPTCHA_V3_SITE_KEY";
try {
  if (RECAPTCHA_V3_SITE_KEY && !RECAPTCHA_V3_SITE_KEY.startsWith("REPLACE")) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(RECAPTCHA_V3_SITE_KEY),
      isTokenAutoRefreshEnabled: true
    });
  }
} catch (e) { /* non-fatal during local dev */ }

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
  GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signInWithPopup, fbSignOut,
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  onSnapshot, query, where, orderBy, limit, serverTimestamp,
  arrayUnion, arrayRemove, increment, writeBatch,
  storageRef, uploadBytes, getDownloadURL
};
