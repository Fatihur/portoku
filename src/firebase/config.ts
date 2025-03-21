
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPdrw1rcwLdjhcJMHaTmmSugvRniGeN18",
  authDomain: "portofolio-4067a.firebaseapp.com",
  projectId: "portofolio-4067a",
  storageBucket: "portofolio-4067a.firebasestorage.app",
  messagingSenderId: "372474921562",
  appId: "1:372474921562:web:0046316ecac105eb9f0e63",
  measurementId: "G-ND3VXTPJ69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
