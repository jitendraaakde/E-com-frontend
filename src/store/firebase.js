// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "e-commerce-sys.firebaseapp.com",
    projectId: "e-commerce-sys",
    storageBucket: "e-commerce-sys.appspot.com",
    messagingSenderId: "200422608461",
    appId: "1:200422608461:web:1b15533ec3885ffb95d604"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);