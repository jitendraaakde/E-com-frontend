// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "e-commerce-97c44.firebaseapp.com",
    projectId: "e-commerce-97c44",
    storageBucket: "e-commerce-97c44.appspot.com",
    messagingSenderId: "337186706652",
    appId: "1:337186706652:web:20582ce3e8305975315019"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);