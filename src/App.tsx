import React from 'react';
import './App.css';
import { NavermapsProvider } from 'react-naver-maps';
import MyMap from './components/myMap';

function App() {
  console.log(process.env.REACT_APP_NAVER_Client_ID);
  return (
    <NavermapsProvider
      ncpClientId={process.env.REACT_APP_NAVER_Client_ID! as string}
    >
      <MyMap />
    </NavermapsProvider>
  );
}

export default App;
