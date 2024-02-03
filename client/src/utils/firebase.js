// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBpHtitQxSijv9lW2ly6j438qtpPTUHXko',
    authDomain: 'galeria-pintar-o-7.firebaseapp.com',
    projectId: 'galeria-pintar-o-7',
    storageBucket: 'galeria-pintar-o-7.appspot.com',
    messagingSenderId: '339316639859',
    appId: '1:339316639859:web:78dc9b2895638875de4206',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const registerWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};
