// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Importa getStorage
import { getDatabase } from 'firebase/database'; // Importa getDatabase

const firebaseConfig = {
    apiKey: "AIzaSyAF74AUTody6E53yCTJVzs40spCXNeI2GA",
    authDomain: "noticias-7d250.firebaseapp.com",
    databaseURL: "https://noticias-7d250-default-rtdb.firebaseio.com",
    projectId: "noticias-7d250",
    storageBucket: "noticias-7d250.appspot.com",
    messagingSenderId: "303808361987",
    appId: "1:303808361987:web:e3ab8847debc3bbff78036",
    measurementId: "G-43MDQ73FZ3"
  };
  

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);
const realtimeDb = getDatabase(app); // Inicializa Realtime Database
const database = getDatabase(app);


export { db, storage, database, realtimeDb };
