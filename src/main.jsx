import { ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './i18n';
import './index.scss';

ConfigProvider.config({
  theme: {
    // primaryColor: '#fc4c4c', // primary color for all components
    primaryColor: '#f7660c',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
