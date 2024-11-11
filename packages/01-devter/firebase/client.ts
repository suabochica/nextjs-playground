import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  onSnapshot,
  query,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

import { DevitProps } from "@/app/ui/devit/devit";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}');

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


const mapDevitFromFirebaseToDevitObject = (doc: QueryDocumentSnapshot): DevitProps => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;

  //@ts-expect-error: check data type
  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  } as DevitProps;
}

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

export const fetchDevitById = async (id: string) => {
  const devitQuery = query(collection(db, "devits"));
  const { docs } = await getDocs(devitQuery);

  return docs
    .filter((doc) => doc.id === id)
    .map(mapDevitFromFirebaseToDevitObject)
}

// @ts-expect-error: check callback type
export const listenLatestDevits = async (callback) => {
  try {
    const devitsQuery = query(
      collection(db, "devits"),
      orderBy("createdAt", "desc"),
      limit(20),
    );

    const snapshot = await getDocs(devitsQuery);
    const initialDevits = snapshot.docs.map(mapDevitFromFirebaseToDevitObject);
    callback(initialDevits);

    return onSnapshot(devitsQuery, (snapshot) => {
      const newDevits = snapshot.docs.map(mapDevitFromFirebaseToDevitObject);
      callback(newDevits);
    })
  } catch (error) {
    console.error("Error fetching devits:", error);
  }
}

export const fetchLatestDevits = async () => {
  const devitsQuery = query(collection(db, "devits"), orderBy("createdAt", "desc"));
  const { docs } = await getDocs(devitsQuery);

  return docs.map(mapDevitFromFirebaseToDevitObject);
}

export const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);  

  return downloadURL;
}