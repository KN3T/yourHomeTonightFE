import { ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import './i18n';
import './index.scss';
import { store } from './store';

ConfigProvider.config({
  theme: {
    primaryColor: '#fc4c4c', // primary color for all components
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
