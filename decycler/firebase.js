// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsn-vxUizMQENx0xp9eyf5EmTryAIXHes",
    authDomain: "decycler-f50a7.firebaseapp.com",
    projectId: "decycler-f50a7",
    storageBucket: "decycler-f50a7.appspot.com",
    messagingSenderId: "8850990134",
    appId: "1:8850990134:web:d94daf18439bbcdf0a2497"
};
 
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const firestore = firebase.firestore(app);
const storage = firebase.storage(app);
 
export { firebase };
export { auth };
export { storage };
export { firestore };