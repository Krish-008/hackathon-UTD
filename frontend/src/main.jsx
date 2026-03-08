import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

const rootElement = document.getElementById('root');

console.log("React Element Found:", !!rootElement);
if (!rootElement) {
  console.error("CRITICAL: #root element not found in HTML!");
}

try {
  console.log("React: Creating root...");
  const root = createRoot(rootElement);
  console.log("React: Root created. Starting render...");
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
  console.log("React: Render command sent.");
} catch (error) {
  console.error("Critical React Mounting Error:", error);
  rootElement.innerHTML = `
    <div style="background: #111827; color: #f87171; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; padding: 20px; text-align: center;">
      <h1 style="font-size: 24px;">QuestMap failed to start</h1>
      <pre style="background: #1f2937; padding: 15px; border-radius: 8px; margin-top: 20px; white-space: pre-wrap; font-size: 14px;">${error.message}</pre>
      <p style="margin-top: 20px; color: #9ca3af;">Check browser console for more details.</p>
    </div>
  `;
}

window.onerror = function (msg, url, line, col, error) {
  console.error("Global Error captured in main.jsx:", msg);
  const debugDiv = document.createElement('div');
  debugDiv.style.cssText = "position:fixed; bottom:0; left:0; right:0; background:rgba(220,38,38,0.9); color:white; padding:10px; font-size:12px; z-index:9999; font-family:monospace;";
  debugDiv.innerText = `Error: ${msg} (at ${line}:${col})`;
  document.body.appendChild(debugDiv);
};
