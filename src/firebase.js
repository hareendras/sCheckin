import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3a53L5C2hBppqF4Vgts1A5YNG2nVMRpc",
  authDomain: "cloudcheck-in.firebaseapp.com",
  databaseURL: "https://cloudcheck-in.firebaseio.com",
  projectId: "cloudcheck-in",
  storageBucket: "cloudcheck-in.appspot.com",
  messagingSenderId: "353618868089",
  appId: "1:353618868089:web:c736f8e0aaa67581a3a1a8",
  measurementId: "G-H3Z3H3VXF9",
};
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
