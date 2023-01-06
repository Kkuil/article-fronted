import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@/style/base/base.scss'
import '@/style/icon/icon.css'
import '@/style/common/common.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);