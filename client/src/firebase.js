// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hometrust-19375.firebaseapp.com",
  projectId: "hometrust-19375",
  storageBucket: "hometrust-19375.firebasestorage.app",
  messagingSenderId: "1061108665898",
  appId: "1:1061108665898:web:5811308d4311bc95dbfd53",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
