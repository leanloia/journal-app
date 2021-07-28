import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// config de firebase dada por plataforma
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const firebaseConfigTesting = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// hago una condición para diferenciar las DB en firebase y así mantener mis enviroments separados
if (process.env.NODE_ENV === "test") {
  // testing
  firebase.initializeApp(firebaseConfigTesting);
} else {
  // desarollo
  firebase.initializeApp(firebaseConfig);
}

// database hecha con firestore (?)

const db = firebase.firestore();

// auth provider dado por firebase

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
