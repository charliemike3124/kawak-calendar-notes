// This is an example Authentication service for Firebase
// Applications. For more info, go to the following link:
// https://firebase.google.com/docs/auth/web/start

import { App } from "@/firebase.config.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";

//-- Sings in with google popup
async function SignInWithGoogleAsync() {
  const auth = getAuth(App);
  let signedInUser;
  const gProvider = new GoogleAuthProvider();
  try {
    setPersistence(auth, browserLocalPersistence);
    const response = await signInWithPopup(auth, gProvider);
    signedInUser = response.user;
  } catch (err) {
    console.error(err);
  }
  return signedInUser;
}

//-- Sings out the user
async function SignOutAsync() {
  const auth = getAuth(App);
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
}

//-- Checks for any changes on the user auth status and sets the user in Vuex if they are logged in.
function CheckForSignedInUser(SetCurrentUser) {
  const auth = getAuth(App);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      SetCurrentUser(user);
    } else {
      // User is signed out
      SetCurrentUser(null);
    }
  });
}

export default {
  SignInWithGoogleAsync,
  CheckForSignedInUser,
  SignOutAsync,
};
