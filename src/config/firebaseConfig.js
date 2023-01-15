import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCkiW10cIiKgMm4xl3Ak_HmD3xCjfQBDf8",
  authDomain: "crud-e1395.firebaseapp.com",
  projectId: "crud-e1395",
  storageBucket: "crud-e1395.appspot.com",
  messagingSenderId: "1059543216364",
  appId: "1:1059543216364:web:d7af40785fa9dba36f35c9",
  measurementId: "G-4JG7MCXGKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);