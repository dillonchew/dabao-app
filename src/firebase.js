import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuQzBwjY8LiuRBMC7QZDyU3nDgQNAIKS0",
  authDomain: "dabao-app.firebaseapp.com",
  databaseURL: "https://dabao-app.firebaseio.com",
  projectId: "dabao-app",
  storageBucket: "dabao-app.appspot.com",
  messagingSenderId: "343975447323",
  appId: "1:343975447323:web:049680aec865654ec361be",
  measurementId: "G-YV2LDQ1M7S"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const auth = firebase.auth();




// collection references
const usersCollection = database.collection('users')


// export utils/refs
export {
  auth,
  usersCollection
}

export default database;