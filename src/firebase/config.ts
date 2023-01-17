import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import config from "../../config";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyDrhUTNZDr9QPfyJhQboe-1Tv8X8ClQNbk",
    authDomain: "guardarcedula.firebaseapp.com",
    projectId: "guardarcedula",
    storageBucket: "guardarcedula.appspot.com",
    messagingSenderId: "270079563565",
    appId: "1:270079563565:web:859650651f8099c85525a4"
    // apiKey: config.API_APIKEY,
    // authDomain: config.API_AUTHDOMAIN,
    // projectId: 'hospital-guardar-cedula-sns',
    // storageBucket: config.API_STORAGEBUCKET,
    // messagingSenderId: config.API_MESSAGINGSENDERID,
    // appId: config.API_APPID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dbAuth = getAuth(app);
export const dbFirestore = getFirestore(app);
export const dbStore = getStorage(app);