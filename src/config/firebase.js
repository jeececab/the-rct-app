import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

import { FirebaseConfig } from "./keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();


export const daysRef = databaseRef.child("season/days");
export const authRef = firebase.auth();