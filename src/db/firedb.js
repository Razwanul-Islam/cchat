import firebase from "firebase";




var firebaseConfig = {
  apiKey: "AIzaSyBDGO_srZQ1gcpQ7Wf-YECzvgaFOM_PE8s",
  authDomain: "social-web-9f031.firebaseapp.com",
  databaseURL: "https://social-web-9f031.firebaseio.com",
  projectId: "social-web-9f031",
  storageBucket: "social-web-9f031.appspot.com",
  messagingSenderId: "499403845424",
  appId: "1:499403845424:web:eb2cc4bb5cc3dc0cb7e2f5",
  measurementId: "G-CPHPKKCFFS",
};
// Initialize Firebase
const fire=firebase.initializeApp(firebaseConfig);
 export default fire;

export const store = fire.storage();


