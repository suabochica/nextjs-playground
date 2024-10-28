import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  User,
} from "firebase/auth";
import { addDoc, collection, query, orderBy, getDocs, getFirestore } from "firebase/firestore";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage(app);
const auth = getAuth();

export type UserProfile = {
  avatar: string | null;
  name?: string | null;
  userName: string | null;
  email: string | null;
  content?: string | null;
  image?: string;
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

export const addDevit = async ({ avatar, content, image, uid, userName}: UserProfile) => {
  return await addDoc(collection(db, "devits"), {
    avatar,
    content,
    uid,
    userName,
    createdAt: new Date(),
    likesCount: 0,
    sharedCount: 0,
    image
  });
}

export const fetchLatestDevits = async () => {
  const devitsQuery = query(collection(db, "devits"), orderBy("createdAt", "desc"));
  const { docs } = await getDocs(devitsQuery);

  return docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data

    return {
      ...data,
      id,
      createdAt: +createdAt.toDate(),
    }
  })
}

export const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);  

  return downloadURL;
}