// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "e-commerce-gauth.firebaseapp.com",
    projectId: "e-commerce-gauth",
    storageBucket: "e-commerce-gauth.appspot.com",
    messagingSenderId: "656680848087",
    appId: "1:656680848087:web:b1ec2e0a4bb2f38aa63e92"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);