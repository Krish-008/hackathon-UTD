import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

console.log("React is attempting to mount...");
window.onerror = function (msg, url, line, col, error) {
  console.log("Global Error Captured: ", msg, " at ", url, ":", line);
};
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
