import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1q9iHVqYKajIBHN9EZ801UjY_83XXHLs",
  authDomain: "flixxit-465b5.firebaseapp.com",
  projectId: "flixxit-465b5",
  storageBucket: "flixxit-465b5.appspot.com",
  messagingSenderId: "355873372828",
  appId: "1:355873372828:web:bec754579314689efecb59",
  measurementId: "G-YKQFNBJSKJ"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);