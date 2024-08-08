// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1qNcjgd6c2QdlWHuNoe-8QGJX_OIdQSM",
  authDomain: "financely-fa504.firebaseapp.com",
  projectId: "financely-fa504",
  storageBucket: "financely-fa504.appspot.com",
  messagingSenderId: "581276105626",
  appId: "1:581276105626:web:02f02022f7dbead884d823",
  measurementId: "G-HM26LGQ6VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc};