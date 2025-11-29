// code by Prashant
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that we want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Our web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzvFitDd-JTCRkM-9mCKlfIQUrfeSNjrE",
  authDomain: "enumeration-form.firebaseapp.com",
  projectId: "enumeration-form",
  storageBucket: "enumeration-form.appspot.com",
  messagingSenderId: "592058279637",
  appId: "1:592058279637:web:cdb71a770e93eb2eb3245c",
  measurementId: "G-5M8PR8W2JZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);