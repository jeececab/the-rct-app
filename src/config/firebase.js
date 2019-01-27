import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

import { FirebaseConfig } from "./keys";
firebase.initializeApp(FirebaseConfig);

export const db = firebase.database()
export const authRef = firebase.auth();