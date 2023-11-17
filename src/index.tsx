import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root')! as Element);
root.render(
  <Provider store={store}>
    <div className='w-screen h-screen flex justify-center bg-red-200'>
      <App />
    </div>
  </Provider>
);

