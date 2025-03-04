import './styles/main.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { BrowserRouter } from 'react-router';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
