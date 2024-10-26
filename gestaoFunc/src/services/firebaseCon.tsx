import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBQufYpE708GF6Q-bXQ-qNYXeHNszu5kZI",
    authDomain: "funcionarios-e3440.firebaseapp.com",
    projectId: "funcionarios-e3440",
    storageBucket: "funcionarios-e3440.appspot.com",
    messagingSenderId: "341300365884",
    appId: "1:341300365884:web:75fd1dcd596002f3fa5139",
    measurementId: "G-ZSDBBC9TPQ"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }