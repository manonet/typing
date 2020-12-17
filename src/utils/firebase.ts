// see: https://invertase.io/blog/firebase-with-gatsby

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/messaging';

// Firebase web config
// https://firebase.google.com/docs/projects/api-keys
const config = {
  apiKey: 'AIzaSyC-qiJJ9Ieefga2yLO4N85YWGROAvp1tnY',
  authDomain: 'manonet-7f714.firebaseapp.com',
  databaseURL: 'https://manonet-7f714.firebaseio.com',
  projectId: 'manonet-7f714',
  storageBucket: 'manonet-7f714.appspot.com',
  messagingSenderId: '146446290915',
  appId: '1:146446290915:web:64ebb044905d5e98d11ad6',
  measurementId: 'G-J0XT56TPFZ',
};

let instance: any = null;

export default function getFirebase() {
  if (typeof window !== 'undefined') {
    if (instance) return instance;
    instance = firebase.initializeApp(config);
    return instance;
  }

  return null;
}
