// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
  apiKey: "AIzaSyAr6qxfWZaQ6-9Xq_2qLoYHR-uFA7A6eZc",
  authDomain: "stagingprime.firebaseapp.com",
  projectId: "stagingprime",
  storageBucket: "stagingprime.firebasestorage.app",
  messagingSenderId: "408870663796",
  appId: "1:408870663796:web:bb28b8cded171d1f4bc321",
  measurementId: "G-R273JZNFD2"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});