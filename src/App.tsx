import React from 'react';
import './App.css';
import { NavermapsProvider } from 'react-naver-maps';
import MyMap from './components/MyMap.tsx';
import { dfs_xy_conv } from './service/changeCoordsToGrid.ts';

function App() {


  let rs = dfs_xy_conv("toXY", 37.579871128849334, 126.98935225645432);
  console.log(rs);

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
