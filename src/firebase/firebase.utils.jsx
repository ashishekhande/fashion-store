import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// const config = {
//   apiKey: 'AIzaSyCiflpMAPyFWgRXFJ0qesbUyELut0xATsM',
//   authDomain: 'crwn-clothing-live.firebaseapp.com',
//   databaseURL: 'https://crwn-clothing-live.firebaseio.com',
//   projectId: 'crwn-clothing-live',
//   storageBucket: 'crwn-clothing-live.appspot.com',
//   messagingSenderId: '355873179783'
// };

const config = {
  apiKey: "AIzaSyDLnp065FSQQizjWIFnLfOWr8IuNdjWV18",
  authDomain: "august-craft-248718.firebaseapp.com",
  databaseURL: "https://august-craft-248718.firebaseio.com",
  projectId: "august-craft-248718",
  storageBucket: "august-craft-248718.appspot.com",
  messagingSenderId: "45203154391",
  appId: "1:45203154391:web:bffc2026a1b46746ec5792",
  measurementId: "G-8G9WKEY7TR"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Get a reference to the place in the database where the user is stored
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    debugger;
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return getUserDocumentRef(userAuth.uid);
};

export const getUserDocumentRef = async uid => {
  if (!uid) return null;

  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error('error fetching user', error.message);
  }
};

export default firebase;
