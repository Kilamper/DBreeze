// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSu4RBcqDLqrQBoQzqRdo9Reb1oRA6sKg",
  authDomain: "pigs-s-project.firebaseapp.com",
  projectId: "pigs-s-project",
  storageBucket: "pigs-s-project.firebasestorage.app",
  messagingSenderId: "269267983020",
  appId: "1:269267983020:web:470f088b175b61b8e81d09",
  measurementId: "G-Q33FQ00ND0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };