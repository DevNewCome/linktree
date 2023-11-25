import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQb3fj4JhQ88_t4GdCemK6ufk4SZUAfqw",
    authDomain: "linktree-8dc45.firebaseapp.com",
    projectId: "linktree-8dc45",
    storageBucket: "linktree-8dc45.appspot.com",
    messagingSenderId: "538771176444",
    appId: "1:538771176444:web:4e72d2492d59703cf99079",
    measurementId: "G-XH16B8CVS8"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  export { auth, db }