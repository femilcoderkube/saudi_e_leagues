import React, { useState, useEffect, useMemo } from "react";
import { onMessageListener, requestForToken } from "../../firebase";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  // Memoize notification object so we don’t recreate it unnecessarily
  const memoizedNotification = useMemo(() => notification, [notification]);

  // Request token & set up listener once
  useEffect(() => {
    requestForToken();

    const unsubscribe = onMessageListener()
      .then((payload) => {
        console.log("payload", payload);
        setNotification({
          title: payload?.notification?.title || "",
          body: payload?.notification?.body || "",
        });
      })
      .catch((err) => console.error("Failed to receive message:", err));

    return () => {
      // if your listener returns a cleanup fn, call it here
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  // Trigger system notification when memoizedNotification updates
  useEffect(() => {
    if (memoizedNotification?.title) {
      new window.Notification(memoizedNotification.title, {
        body: memoizedNotification.body,
        icon: "/icon-192-maskable.png",
      });
    }
  }, [memoizedNotification]);

  return null; // since you’re showing native notifications
};

export default Notification;
