import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import HttpClient from './network/http.ts';
import AuthService from './service/auth.ts';
import TokenStorage from './db/token.ts';

const root = ReactDOM.createRoot(document.getElementById('root')! as Element);
const httpClient = new HttpClient(process.env.REACT_APP_SERVER_BASE_URL);
const authService = new AuthService(process.env.REACT_APP_SERVER_BASE_URL, new TokenStorage());
root.render(
  <Provider store={store}>
    <div className='w-screen h-screen flex justify-center'>
      <App />
    </div>
  </Provider>
);

