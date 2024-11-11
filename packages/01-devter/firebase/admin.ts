const admin = require("firebase-admin");

const serviceAccount = require("@/firebase/firebase-keys.json");


try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
} catch (error) {
  console.log("ln#12", error);
}

export const firestore = admin.firestore();