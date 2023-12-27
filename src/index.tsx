import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import HttpClient from './network/http.ts';
import AuthService from './service/auth.ts';
import TokenStorage from './db/token.ts';
import { AuthErrorEventBus, AuthProvider } from './context/AuthContext.tsx';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')! as Element);
const url = process.env.REACT_APP_SERVER_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(url, authErrorEventBus);
const authService = new AuthService(httpClient, new TokenStorage());

root.render(
  <BrowserRouter>
    <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
      <Provider store={store}>
        <div className='w-screen h-screen flex justify-center'>
          <App />
        </div>
      </Provider>
    </AuthProvider>
  </BrowserRouter>

);

