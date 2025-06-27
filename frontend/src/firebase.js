// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAWG2Unx2aJXmx8kaaRhqZKtCYJbohOLfc",
  authDomain: "steel-acumen-462107-g9.firebaseapp.com",
  projectId: "steel-acumen-462107-g9",
  storageBucket: "steel-acumen-462107-g9.appspot.com",
  messagingSenderId: "910776195166",
  appId: "1:910776195166:web:e1d5dc61100bf755d67ccf",
  measurementId: "G-XNVF0V4Q5Z",
};

// 🔧 Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔐 Auth setup
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("✅ Auth persistence set to local");
  })
  .catch((error) => {
    console.error("❌ Failed to set auth persistence:", error);
  });

const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// 🔄 Export for use in components
export { db, auth, provider, storage };
