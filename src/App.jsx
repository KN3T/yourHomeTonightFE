import { ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import Router from './router/Router';

ConfigProvider.config({
  theme: {
    primaryColor: '#fc4c4c', // primary color for all components
  },
});

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
