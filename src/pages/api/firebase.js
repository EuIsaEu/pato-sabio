import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAVnEVhOhe2KYPG2SI-3Tu0rHbbX9FvkYw",
  authDomain: "sage-duck.firebaseapp.com",
  databaseURL: "https://sage-duck-default-rtdb.firebaseio.com",
  projectId: "sage-duck",
  storageBucket: "sage-duck.appspot.com",
  messagingSenderId: "424285179811",
  appId: "1:424285179811:web:6162abab7b81b387565416",
  measurementId: "G-ZF5H5QWDGP"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)




