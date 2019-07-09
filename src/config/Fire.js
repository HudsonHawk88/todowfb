import firebase from 'firebase';
 
 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAyKbJFjyWqU8S72JGqgk78YgPj0AlPwSU",
    authDomain: "todoapptg.firebaseapp.com",
    databaseURL: "https://todoapptg.firebaseio.com",
    projectId: "todoapptg",
    storageBucket: "todoapptg.appspot.com",
    messagingSenderId: "150398977615",
    appId: "1:150398977615:web:04c8e93929ec761b"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig)
  
  export default fire;
