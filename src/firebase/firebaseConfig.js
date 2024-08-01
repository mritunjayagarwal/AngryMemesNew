import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6-WQC4MG923IK4lV8-hrk24CPc1mtMrc",
    authDomain: "angrymemes-88a25.firebaseapp.com",
    databaseURL: "https://angrymemes-88a25-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "angrymemes-88a25",
    storageBucket: "angrymemes-88a25.appspot.com",
    messagingSenderId: "349714035264",
    appId: "1:349714035264:web:02f33856532a805319e5a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)