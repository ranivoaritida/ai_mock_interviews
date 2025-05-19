import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5QrrWSOeiimtRH8Td6szjzBRWeYt4WBA",
  authDomain: "wise-83522.firebaseapp.com",
  projectId: "wise-83522",
  storageBucket: "wise-83522.firebasestorage.app",
  messagingSenderId: "674564726205",
  appId: "1:674564726205:web:6e97def02d616fdd5d06d4",
  measurementId: "G-D7M73H3NQ2"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);