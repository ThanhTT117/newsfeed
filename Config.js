import * as firebase from "firebase";
import "firebase/firestore";

export default FirebaseKey = {
  apiKey: "AIzaSyAANogVqcMmR4nUM7h0UuYeFj58kjFtiSA",
  authDomain: "newsfeedapp-ce7c5.firebaseapp.com",
  databaseURL: "https://newsfeedapp-ce7c5.firebaseio.com",
  projectId: "newsfeedapp-ce7c5",
  storageBucket: "newsfeedapp-ce7c5.appspot.com",
  messagingSenderId: "677330227536",
  appId: "1:677330227536:web:184467e8e739ffe66d5c55",
  measurementId: "G-FVMXNSCBQS",
};

var firebaseConfig = {
  apiKey: "AIzaSyAANogVqcMmR4nUM7h0UuYeFj58kjFtiSA",
  authDomain: "newsfeedapp-ce7c5.firebaseapp.com",
  databaseURL: "https://newsfeedapp-ce7c5.firebaseio.com",
  projectId: "newsfeedapp-ce7c5",
  storageBucket: "newsfeedapp-ce7c5.appspot.com",
  messagingSenderId: "677330227536",
  appId: "1:677330227536:web:184467e8e739ffe66d5c55",
  measurementId: "G-FVMXNSCBQS",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
export const PostRef = db.collection("posts");
export { firebase };
