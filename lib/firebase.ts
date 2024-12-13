// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyACsWEUsb3zyhJU_PvC7DHfsXtgwwIqI_Y",
//   authDomain: "liebe-5c5f6.firebaseapp.com",
//   projectId: "liebe-5c5f6",
//   storageBucket: "liebe-5c5f6.firebasestorage.app",
//   messagingSenderId: "348824968236",
//   appId: "1:348824968236:web:96bac7f61a2bb74cb68589",
//   measurementId: "G-LPMDENGFYC"
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { app, auth, db };

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyACsWEUsb3zyhJU_PvC7DHfsXtgwwIqI_Y",
  authDomain: "liebe-5c5f6.firebaseapp.com",
  projectId: "liebe-5c5f6",
  storageBucket: "liebe-5c5f6.firebasestorage.app",
  messagingSenderId: "348824968236",
  appId: "1:348824968236:web:96bac7f61a2bb74cb68589",
  measurementId: "G-LPMDENGFYC"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage }

