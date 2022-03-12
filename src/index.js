import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/user_context';
import { StatsProvider } from './context/stats_context';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <StatsProvider>
        <App />
      </StatsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
