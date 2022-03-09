import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDw8M-B8TT1yTX5UUw2RdtYb8Nw-9LGbBc',
  authDomain: 'criptowatcher.firebaseapp.com',
  projectId: 'criptowatcher',
  storageBucket: 'criptowatcher.appspot.com',
  messagingSenderId: '414880658880',
  appId: '1:414880658880:web:56e3fdeed33b85e8f00425',
  measurementId: 'G-870ZWC1NYJ',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
