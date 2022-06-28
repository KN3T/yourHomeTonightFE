import { ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.min.css';
import React from 'react';

import './App.scss';
import { HomePage } from './pages';

ConfigProvider.config({
  theme: {
    primaryColor: '#fc4c4c', // primary color for all components
  },
});

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
