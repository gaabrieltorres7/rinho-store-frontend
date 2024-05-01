import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDUwfPsvnfHI8DAPxK6Qj8pj9OOzBSD6Ag',
  authDomain: 'rinho-store.firebaseapp.com',
  projectId: 'rinho-store',
  storageBucket: 'rinho-store.appspot.com',
  messagingSenderId: '187726129960',
  appId: '1:187726129960:web:aa1a9538991ffad958be1d'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
