import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import HttpClient from './network/http.ts';
import AuthService from './service/auth.ts';
import TokenStorage from './db/token.ts';
import { AuthErrorEventBus, AuthProvider, ServerErrorEventBus } from './context/AuthContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import PostService from './service/post.ts';
import { PostServiceProvider } from './context/PostServiceContext.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')! as Element);
const url = process.env.REACT_APP_SERVER_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const serverErrorEventBus = new ServerErrorEventBus();
const httpClient = new HttpClient(url, authErrorEventBus, serverErrorEventBus);
const tokenService = new TokenStorage();
const authService = new AuthService(httpClient, tokenService);
const postService = new PostService(httpClient, tokenService);

root.render(
  <BrowserRouter>
    <PostServiceProvider postService={postService}>
      <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus} serverErrorEventBus={serverErrorEventBus}>
        <Provider store={store}>
          <div className='w-screen h-screen flex justify-center'>
            <App />
          </div>
        </Provider>
      </AuthProvider>
    </PostServiceProvider>
  </BrowserRouter>

);

