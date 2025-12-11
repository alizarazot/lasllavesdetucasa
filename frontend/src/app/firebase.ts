import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDfTWd4gG7zU-LKsPVncyQvbimmrXSJoJk',
  authDomain: 'inmobiliarialasllavesdetucasa.firebaseapp.com',
  projectId: 'inmobiliarialasllavesdetucasa',
  storageBucket: 'inmobiliarialasllavesdetucasa.firebasestorage.app',
  messagingSenderId: '760815235238',
  appId: '1:760815235238:web:27b384a59a3919e451c467',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
