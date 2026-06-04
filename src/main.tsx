import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register the PWA service worker for robust offline operability
if ('serviceWorker' in navigator && (import.meta as any).env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('Beer Zoo service worker active on scope:', reg.scope);
      })
      .catch((error) => {
        console.error('Beer Zoo service worker installation failed:', error);
      });
  });
} else if ('serviceWorker' in navigator && !(import.meta as any).env.PROD) {
  // Offer sw registration in dev mode too for easier validation, but keeping console clear
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('Beer Zoo service worker active in development:', reg.scope);
      })
      .catch((err) => {
        console.warn('SW dev mode init status ignored:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
