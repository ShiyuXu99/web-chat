import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB4cStppEs_--l7pQXu4YCOSxIruMDSWlk",
    authDomain: "web-chat-7d247.firebaseapp.com",
    projectId: "web-chat-7d247",
    storageBucket: "web-chat-7d247.appspot.com",
    messagingSenderId: "294966189818",
    appId: "1:294966189818:web:f1ff19e0384f376e85f343",
    measurementId: "G-PQQW6SHWYR"
};

const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, getFirestore, getStorage };
