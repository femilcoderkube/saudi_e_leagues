import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

//Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: "AIzaSyAr6qxfWZaQ6-9Xq_2qLoYHR-uFA7A6eZc",
  authDomain: "stagingprime.firebaseapp.com",
  projectId: "stagingprime",
  storageBucket: "stagingprime.firebasestorage.app",
  messagingSenderId: "408870663796",
  appId: "1:408870663796:web:bb28b8cded171d1f4bc321",
  measurementId: "G-R273JZNFD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);

import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

const messaging1 = getMessaging();
onBackgroundMessage(messaging1, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/favicon.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});