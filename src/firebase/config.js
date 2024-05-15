import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAANc9S5cWsZu3B39qf6K9M0my7LkisCyA",
  authDomain: "kinoteka-30cbc.firebaseapp.com",
  projectId: "kinoteka-30cbc",
  storageBucket: "kinoteka-30cbc.appspot.com",
  messagingSenderId: "147463257827",
  appId: "1:147463257827:web:fe3226a9032b7ef11b8fd6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = firebase.firestore();

// Test
const auth = firebase.auth();

export { projectFirestore, auth };
