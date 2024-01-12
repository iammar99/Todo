// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASnEQryw0Jnr-tKM1o5e3AQ26tIuYtcZY",
  authDomain: "todo-app-bb553.firebaseapp.com",
  projectId: "todo-app-bb553",
  storageBucket: "todo-app-bb553.appspot.com",
  messagingSenderId: "803224882564",
  appId: "1:803224882564:web:ede0d8c7926e7a759ae1d1",
  measurementId: "G-BKEZKZDQXS"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);

export {auth ,analytics,fireStore }