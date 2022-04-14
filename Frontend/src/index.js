import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'

const container = document.getElementById('root')
const root = createRoot(container);


// Using React.StrictMode in development is causing the a reload upon initial load.
// This is currently undesirable behavior since we need to get new data on every load.
root.render(
  <App />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
)