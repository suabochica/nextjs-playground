const admin = require("firebase-admin");

const serviceAccount = require("@/firebase/firebase-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://devter-b77d3-default-rtdb.firebaseio.com"
});

export const firestore = admin.firestore();
