self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: "Notification", body: event.data.text() };
    }
  }

  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new message.",
    icon: "/vite.svg",
    badge: "/vite.svg",
    data: data.url || "/",
    vibrate: [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});
