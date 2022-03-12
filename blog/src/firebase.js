import  app  from "firebase/app";
import  "firebase/firestore";
import  "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANeC1k1jdZEXv3UIAd3Np2QntAXE1GRf0",
  authDomain: "react-blog-1ef4b.firebaseapp.com",
  projectId: "react-blog-1ef4b",
  DATAurl : "",
  storageBucket: "react-blog-1ef4b.appspot.com",
  messagingSenderId: "165396990286",
  appId: "1:165396990286:web:6cf4e2b812c2b9cd91761f",
  measurementId: "G-3B23VVRHGS"
};

// Initialize Firebase
 app.initializeApp(firebaseConfig);
const firebase = app.firestore();


const firebaseAuth = app.auth();
export {firebaseAuth} ;
export default firebase;
