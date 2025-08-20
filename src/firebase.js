import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getInstallations } from "firebase/installations";
import sound from "./assets/mp3/game-level-complete-143022.mp3";
// TODO: Replace with your Firebase project config
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
getInstallations(app);
const messaging = getMessaging(app);

// let originalTitle = null;
// let intervalRef = null;

// const startFlashing = (msgTitle) => {
//   if (intervalRef) return;

//   if (!originalTitle) {
//     originalTitle = document.title;
//   }

//   let visible = true;

//   intervalRef = setInterval(() => {
//     document.title = visible ? `🔔 ${msgTitle}` : originalTitle;
//     visible = !visible;
//   }, 1000);

//   setTimeout(stopFlashing, 10000);
//   window.addEventListener("focus", stopFlashing);
// };

// const stopFlashing = () => {
//   if (intervalRef) {
//     clearInterval(intervalRef);
//     intervalRef = null;
//     document.title = originalTitle || 'Your App';
//   }
//   window.removeEventListener("focus", stopFlashing);
// };

export async function requestFCMToken() {
  try {
    // const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    // const swRegistration = await navigator.serviceWorker.ready;
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BA1GZo6MbvoJ3c4SCPNUOKx3rjFg1NU9YdqeblxYAxx3Sbd18nRpTl507rFcjQpoAoqW_XOioM7q-Qf47y0H4WI", // from Firebase console
      serviceWorkerRegistration: swRegistration,
    });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available. Request permission.");
    }
  } catch (err) {
    console.error("An error occurred while retrieving token:", err);
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);

      if (payload?.notification) {
        const { title, body } = payload.notification;
        const { type } = payload.data;

        if (Notification.permission === "granted") {
          if (type == 4) {
            const audio = new Audio(sound);
            audio.play();
            // startFlashing(title);
          }

          const notification = new Notification(title, { body });
          // notification.onclick = () => {
          //   stopFlashing();
          //   window.focus();
          //   notification.close();
          // };
        }
      }
      resolve(payload);
    });
  });
