import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "twocoms-connect-sync-2026",
  appId: "1:549992175719:web:e4c2efeef2e591f0749cc2",
  storageBucket: "twocoms-connect-sync-2026.firebasestorage.app",
  apiKey: "AIzaSyDYswNjd-0onRV7Ti4gQzDMepzvBUUsjIk",
  authDomain: "twocoms-connect-sync-2026.firebaseapp.com",
  messagingSenderId: "549992175719",
  projectNumber: "549992175719"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
