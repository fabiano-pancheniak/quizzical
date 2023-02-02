import React from 'react';
import ReactDOM from 'react-dom/client';
import Start from './Start.js'
import Quiz from './Quiz.js';
import './css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>
);

