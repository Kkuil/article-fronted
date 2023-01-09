import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from '@/store';

import '@/style/base/base.scss'
import '@/style/icon/icon.css'
import '@/style/common/common.scss'
import 'animate.css';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);