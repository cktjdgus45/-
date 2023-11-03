import React from 'react';
import './App.css';
import { NavermapsProvider } from 'react-naver-maps';
// @ts-ignore
import MyMap from './components/MyMap.tsx';

function App() {
  return (
    <NavermapsProvider
      ncpClientId={process.env.REACT_APP_NAVER_Client_ID! as string}
    >
      <MyMap />

      <div>
        <a href={'https://map.naver.com/p/directions/-/-/-/transit?c=13.00,0,0,0,dh'} target="_blank" rel="noopener noreferrer">Open in NMap</a>
      </div>

      {/*  */}
    </NavermapsProvider>
  );
}

export default App;
