import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyBakpSd9bFSm6lqSatP6Y2ICymh0YSahWI",
  authDomain: "crwn-db-7a206.firebaseapp.com",
  projectId: "crwn-db-7a206",
  storageBucket: "crwn-db-7a206.appspot.com",
  messagingSenderId: "845548192938",
  appId: "1:845548192938:web:c43fc969378be20ff73cd3"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSanpshot = await getDoc(userDocRef);
  console.log(userSanpshot);  
  console.log(userSanpshot.exists());  

if(!userSanpshot.exists()) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt
    });
  } catch (error) {
    console.log('error creating the user', error.message);
  }
}

  //Check if user data exists
  //return userDocRef
  return userDocRef;
};

