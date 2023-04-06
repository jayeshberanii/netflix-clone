import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDlhXSj6iOroEZpOXyl8VAXn9lClZxl5N0",
  authDomain: "react-node-netflix-clone.firebaseapp.com",
  projectId: "react-node-netflix-clone",
  storageBucket: "react-node-netflix-clone.appspot.com",
  messagingSenderId: "157674844772",
  appId: "1:157674844772:web:33728e8b4d1b72e994e571",
  measurementId: "G-C76CSET744"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider(); 
export const firebaseAuth=getAuth(app)