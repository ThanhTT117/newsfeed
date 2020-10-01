import React, { useEffect } from "react";
import FirebaseKey from "./Config";
import firebase from "firebase";
import "@firebase/firestore";

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKey);
    }
  }

  addPost = async ({ email, displayName, text, localUri }) => {
    const remoteUri = await this.uploadPhotoAsnyc(localUri);

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          email,
          displayName,
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  uploadPhotoAsnyc = async (uri) => {
    const path = `photo/${this.uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  getPost = () => {
    this.firestore.collection("posts").onSnapshot((querySnapshot) => {
      lists = [];
      querySnapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      return lists;
    });
  };

  signOutUser = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();

export default Fire;
