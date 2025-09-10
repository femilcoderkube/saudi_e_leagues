import { getToken, onMessage } from "firebase/messaging";
import { getUpdateToken } from "../../../app/socket/socket.js";
import sound from "../../../assets/mp3/game-level-complete-143022.mp3";
import { messaging } from "./firebase.js";

export async function requestPermission() {
  const deviceType = localStorage.getItem("deviceType");

  if (deviceType != "mobile") {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await genrateFCMToken();
      getUpdateToken(token);
    }
  }
}
export const genrateFCMToken = async () => {
  try {
    return await getToken(messaging, {
      vapidKey:
        "BA1GZo6MbvoJ3c4SCPNUOKx3rjFg1NU9YdqeblxYAxx3Sbd18nRpTl507rFcjQpoAoqW_XOioM7q-Qf47y0H4WI",
    });
  } catch (e) {
    return "";
  }
};
export const setupMessageListener = () => {
  const deviceType = localStorage.getItem("deviceType");

  if (deviceType != "mobile") {
    onMessage(messaging, (payload) => {

      const { notification, data } = payload;

      if (notification) {
        const { title, body } = notification;

        new window.Notification(title, {
          body,
          icon: "/primenotification.png",
        });

        if (data?.type == 4) {
          const audio = new Audio(sound);
          audio
            .play()
            .catch((err) => console.error("Error playing sound:", err));
        }
      }
    });
  }
};
