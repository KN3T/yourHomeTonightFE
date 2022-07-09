import { ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.min.css';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import './App.scss';
import Router from './router/Router';

ConfigProvider.config({
  theme: {
    primaryColor: '#fc4c4c', // primary color for all components
  },
});

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Router />
      </div>
    </HashRouter>
  );
}

export default App;
