import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyC4cHrOfcplwODuxtYZ5tT_B8jIKmyrYvg",
  authDomain: "social-media-a06d8.firebaseapp.com",
  projectId: "social-media-a06d8",
  storageBucket: "social-media-a06d8.appspot.com",
  messagingSenderId: "812164547371",
  appId: "1:812164547371:web:3bb1c017c7a9fafe333b6e",
  measurementId: "G-8W96RY36WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()
export {auth,provider}