// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxKRWf8xatJOW0K5XhH4PSLT__4ReMscE",
  authDomain: "senior-project-pygmalion.firebaseapp.com",
  projectId: "senior-project-pygmalion",
  storageBucket: "senior-project-pygmalion.appspot.com",
  messagingSenderId: "618376519826",
  appId: "1:618376519826:web:34061159804faf93a6464b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export default db;