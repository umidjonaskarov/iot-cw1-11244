import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCFZMLVI8swOl5gxO0Nlh9eWxJL0l3KNrI",
    authDomain: "iot-00011244.firebaseapp.com",
    databaseURL: "https://iot-00011244-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-00011244",
    storageBucket: "iot-00011244.appspot.com",
    messagingSenderId: "768680378274",
    appId: "1:768680378274:web:9f3ae31d659eae2d3b3cfb",
    measurementId: "G-0W2SFFBDHR"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase;