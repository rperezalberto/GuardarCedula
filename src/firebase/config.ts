import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFaSiFp6Sx8lejSXiZ0x75zooUmioWwiQ",
    authDomain: "hospital-guardar-cedula-sns.firebaseapp.com",
    projectId: "hospital-guardar-cedula-sns",
    storageBucket: "hospital-guardar-cedula-sns.appspot.com",
    messagingSenderId: "712167991536",
    appId: "1:712167991536:web:23a3a00188dad473233a35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dbAuth = getAuth(app);
export const dbFirestore = getFirestore(app);
export const dbStore = getStorage(app);