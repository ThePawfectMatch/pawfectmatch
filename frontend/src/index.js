import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ListingsContextProvider } from './context/ListingContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ListingsContextProvider>
        <App />
      </ListingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);