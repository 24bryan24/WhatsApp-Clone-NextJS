import firebase from 'firebase';
import "firebase/storage";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDeO-atMvVioPi5rtalUkBHUEXW_vzJ6_A",
  authDomain: "whatsapp-clone-nextjs-b9f88.firebaseapp.com",
  projectId: "whatsapp-clone-nextjs-b9f88",
  storageBucket: "whatsapp-clone-nextjs-b9f88.appspot.com",
  messagingSenderId: "214992435394",
  appId: "1:214992435394:web:f53939c0edb19869abe35b"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = app.storage().ref('images');

export { db, auth, provider, storage };
