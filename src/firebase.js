import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getInstallations } from "firebase/installations";
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

export async function requestFCMToken() {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BA1GZo6MbvoJ3c4SCPNUOKx3rjFg1NU9YdqeblxYAxx3Sbd18nRpTl507rFcjQpoAoqW_XOioM7q-Qf47y0H4WI", // from Firebase console
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

// Listen for messages when the app is open
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground Message:", payload);
      resolve(payload);
    });
  });
