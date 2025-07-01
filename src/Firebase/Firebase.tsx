// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getDatabase } from "firebase/database"; // Import Realtime Database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCy0AiWmo0LWAqarM8yLGUv2plivDz5bIo",
  authDomain: "crypto-dashboard-537a2.firebaseapp.com",
  databaseURL: "https://crypto-dashboard-537a2-default-rtdb.firebaseio.com",
  projectId: "crypto-dashboard-537a2",
  storageBucket: "crypto-dashboard-537a2.firebasestorage.app",
  messagingSenderId: "101307178983",
  appId: "1:101307178983:web:8055b6a3749d0bd3eea742",
  measurementId: "G-ZZ8WSKTY53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
const database = getDatabase(app); // Initialize Realtime Database

export { app, analytics, db, database }; // Export db and database