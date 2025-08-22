import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAr6qxfWZaQ6-9Xq_2qLoYHR-uFA7A6eZc",
  authDomain: "stagingprime.firebaseapp.com",
  projectId: "stagingprime",
  storageBucket: "stagingprime.firebasestorage.app",
  messagingSenderId: "408870663796",
  appId: "1:408870663796:web:bb28b8cded171d1f4bc321",
  measurementId: "G-R273JZNFD2",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    console.log("Requesting notification permission");
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Fetching FCM token");

      let registration = await navigator.serviceWorker.getRegistration(
        "/firebase-messaging-sw.js"
      );

      if (!registration) {
        console.log("No SW found, registering...");
        registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("Service worker registered:", registration.scope);
      }

      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (currentToken) {
        console.log("FCM Token:", currentToken);
        return currentToken;
      } else {
        console.log("No registration token available.");
        return null;
      }
    } else {
      console.log("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    onMessage(
      messaging,
      (payload) => {
        resolve(payload);
      },
      (error) => {
        console.error("onMessage error:", error);
        reject(error);
      }
    );
  });
