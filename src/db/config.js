import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4fyJJraIcza2iE7j0XJw2pNvMIZK-jQs",
  authDomain: "businessedge-70448.firebaseapp.com",
  projectId: "businessedge-70448",
  storageBucket: "businessedge-70448.appspot.com",
  messagingSenderId: "196844517415",
  appId: "1:196844517415:web:a769e29b274a56a6eaf602",
  measurementId: "G-Q2M54728E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };