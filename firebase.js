// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
// import firestore from '@react-native-firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEdVKC5cgFFlmXsPMdi6sRgqIg4_-mpQ0",
  authDomain: "madproject-771de.firebaseapp.com",
  projectId: "madproject-771de",
  storageBucket: "madproject-771de.appspot.com",
  messagingSenderId: "20638268272",
  appId: "1:20638268272:web:b9b35d1ba9cbadac99edb5"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
// const db = app.firestore();
const auth = firebase.auth()

export { auth, app};