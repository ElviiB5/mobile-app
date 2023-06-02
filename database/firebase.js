// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU-IiS6fnqtSoy_UbWvVe95DE_1WJJeTM",
  authDomain: "mobileapp-6f120.firebaseapp.com",
  projectId: "mobileapp-6f120",
  storageBucket: "mobileapp-6f120.appspot.com",
  messagingSenderId: "825314508316",
  appId: "1:825314508316:web:16a8ace0d8f4c0099369d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);