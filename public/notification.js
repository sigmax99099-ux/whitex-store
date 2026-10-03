// ✅ Firebase Push Notification Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging.js";
import { firebaseConfig, VAPID_KEY } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ Notification Permission Request
async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      console.log('✅ Notification permission granted');
      
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      
      if (token) {
        console.log('✅ FCM Token:', token);
        
        // Save token to server
        await fetch('/api/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        
        return token;
      } else {
        console.log('❌ No registration token available');
      }
    } else {
      console.log('❌ Notification permission denied');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// ✅ Foreground notification
onMessage(messaging, (payload) => {
  console.log('Foreground message:', payload);
  
  const notification = new Notification(payload.notification?.title || 'WHITE X STORE', {
    body: payload.notification?.body || 'New notification',
    icon: '/assets/logo.png',
    badge: '/assets/logo.png'
  });
  
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
});

// ✅ Auto request on page load
if ('Notification' in window && Notification.permission === 'default') {
  requestNotificationPermission();
}

export { requestNotificationPermission };
