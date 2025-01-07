import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PatientContextProvider } from './context/PatientContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider> {/* AuthContextProvider should wrap everything */}
      <PatientContextProvider> {/* PatientContextProvider inside AuthContextProvider */}
        <App />
      </PatientContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
