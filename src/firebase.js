import { initializeApp } from "firebase/app";

import { getMessaging, onMessage } from "firebase/messaging";

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
onMessage(messaging, (payload) => {
  console.log("sfdghgjkl---------", payload)
  new window.Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192-maskable.png",
  });
});