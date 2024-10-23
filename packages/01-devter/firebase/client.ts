import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  User,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ3qTShzA-qUNaoTLgWU5lL1XLo4BSYm4",
  authDomain: "devter-b77d3.firebaseapp.com",
  projectId: "devter-b77d3",
  storageBucket: "devter-b77d3.appspot.com",
  messagingSenderId: "405804111382",
  appId: "1:405804111382:web:05de10f00f2583f211c737",
  measurementId: "G-5E709YJ56V",
};

initializeApp(firebaseConfig);

const auth = getAuth();

export interface UserProfile {
  avatar: string | null;
  username: string | null;
  email: string | null;
}

const mapUserFromFirebaseAuthToUser = (user: User): UserProfile => {
  const { displayName, email, photoURL } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const onAuthStateChange = (onChange: unknown) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;

    // @ts-expect-error: check onChange type
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = async (event: React.SyntheticEvent) => {
  event.preventDefault();

  const provider = new GithubAuthProvider();

  try {
    const user = await signInWithPopup(auth, provider);
    const normalizedUser = user.user;
    return mapUserFromFirebaseAuthToUser(normalizedUser);
  } catch (error) {
    console.error(error);
    return null;
  }
};
