import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  User,
} from "firebase/auth";
import { addDoc, collection, doc, getDocs, getFirestore } from "firebase/firestore";

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

const db = getFirestore();
const auth = getAuth();

export type UserProfile = {
  avatar: string | null;
  name?: string | null;
  userName: string | null;
  email: string | null;
  content?: string | null;
  uid: string;
}

const mapUserFromFirebaseAuthToUser = (user: User): UserProfile => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid
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

export const addDevit = async ({ avatar, content, uid, userName}: UserProfile) => {
  return await addDoc(collection(db, "devits"), {
    avatar,
    content,
    uid,
    userName,
    createdAt: new Date(),
    likesCount: 0,
    sharedCount: 0,
  });
}

export const fetchLatestDevits = async () => {
  const { docs } = await getDocs(collection(db, "devits"));

  return docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data
    console.log(createdAt)

    const date = new Date(createdAt.seconds * 1000)
    const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date)

    return {
      ...data,
      id,
      createdAt: normalizedCreatedAt,
    }
  })
}
