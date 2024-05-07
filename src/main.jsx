import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/app.css';

const container = document.getElementById('app'); // Assure-toi que cet ID existe dans ton index.html
const root = createRoot(container); // Crée la racine du DOM ici
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
