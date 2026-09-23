import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n/context';
import { RouterProvider } from './router';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </LanguageProvider>
  </StrictMode>,
);
