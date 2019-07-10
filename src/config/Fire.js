import firebase from 'firebase';
 
 // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyAyKbJFjyWqU8S72JGqgk78YgPj0AlPwSU",
    authDomain: "todoapptg.firebaseapp.com",
    databaseURL: "https://todoapptg.firebaseio.com",
    projectId: "todoapptg",
    storageBucket: "todoapptg.appspot.com",
    messagingSenderId: "150398977615",
    appId: "1:150398977615:web:04c8e93929ec761b"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
