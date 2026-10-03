// ✅ Service Worker for Firebase Cloud Messaging
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCgk76HuH0WgkT_4mh_B7dMGWXZ7V-e7VU",
  authDomain: "white-x-200f5.firebaseapp.com",
  projectId: "white-x-200f5",
  storageBucket: "white-x-200f5.firebasestorage.app",
  messagingSenderId: "180276702879",
  appId: "1:180276702879:web:b3e57b195b90d68611fcaa"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// ✅ Background notification handle
messaging.onBackgroundMessage((payload) => {
  console.log('Background message:', payload);
  
  const notificationTitle = payload.notification?.title || 'WHITE X STORE';
  const notificationOptions = {
    body: payload.notification?.body || 'New notification',
    icon: '/assets/logo.png',
    badge: '/assets/logo.png',
    vibrate: [200, 100, 200],
    data: payload.data
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Notification click handle
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
