// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCygElFjudmKPZKg3NE12pa8QmF6Y44Z4I",
  authDomain: "austrian-painters-292b3.firebaseapp.com",
  projectId: "austrian-painters-292b3",
  storageBucket: "austrian-painters-292b3.appspot.com",
  messagingSenderId: "368629064224",
  appId: "1:368629064224:web:05c2457f5fc2d9e484d245",
  measurementId: "G-HHYP96PV13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if(typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

//export firebase storage
export const storage = getStorage(app);
