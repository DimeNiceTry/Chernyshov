import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([1])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default root
