import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const config = {
  apiKey: "AIzaSyDn4bT96k7l9UvUFfzRHdgQjnhv5xBL0Cw",
  authDomain: "reactstoreproject.firebaseapp.com",
  databaseURL: "https://reactstoreproject.firebaseio.com",
  projectId: "reactstoreproject",
  storageBucket: "",
  messagingSenderId: "1016115214899",
  appId: "1:1016115214899:web:7cfe75252e62d699774146"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;