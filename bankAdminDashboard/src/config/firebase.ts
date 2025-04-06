import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig_one = {
  // Replace with your Firebase config
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
const firebaseConfig = {
  apiKey: "AIzaSyB1PvEpERSJfJ0AL9nVZDSXL1s8EKDIuHE",
  authDomain: "codebreakers-levelup.firebaseapp.com",
  databaseURL: "https://codebreakers-levelup-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "codebreakers-levelup",
  storageBucket: "codebreakers-levelup.firebasestorage.app",
  messagingSenderId: "564280862573",
  appId: "1:564280862573:web:026acbfee6b4c6830f1c64",
  measurementId: "G-4VGXX1S476"
};
// Validate the database URL
if (!firebaseConfig.databaseURL?.startsWith('https://') || 
    !(firebaseConfig.databaseURL?.includes('firebaseio.com') || 
      firebaseConfig.databaseURL?.includes('firebasedatabase.app'))) {
  throw new Error(
    'Invalid Firebase Database URL. Please ensure your Firebase Database URL is correct.\n' +
    'It should look like: https://your-project-default-rtdb.firebaseio.com or https://your-project-default-rtdb.region.firebasedatabase.app'
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 