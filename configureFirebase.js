import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1MrQ09Qievvxc-_klOoqXJx-_DoA2xSY",
  authDomain: "licenta-cbmr.firebaseapp.com",
  databaseURL: "https://licenta-cbmr-default-rtdb.firebaseio.com",
  projectId: "licenta-cbmr",
  storageBucket: "licenta-cbmr.appspot.com",
  messagingSenderId: "428400581195",
  appId: "1:428400581195:web:237b00b29ec9b3e32f0bce",
  measurementId: "G-ZR6KTWBYZ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
