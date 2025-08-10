import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
// main.jsx
import 'bootstrap/dist/css/bootstrap.min.css'; // 1️⃣ Bootstrap primero
import './styles/main.css'; // 2️⃣ Tailwind y estilos personalizados
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 3️⃣ JS de Bootstrap


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
