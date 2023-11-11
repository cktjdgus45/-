import React, { useState } from 'react';
import './App.css';
import { NavermapsProvider } from 'react-naver-maps';
import MyMap from './components/MyMap.tsx';
import Weather from './components/weather/weather.tsx';
import { Coord } from './data/latlon.ts';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Header from './components/UI/Header.tsx';

function App() {
  const [coord, setCoord] = useState<Coord>({ lat: 0, lng: 0 });
  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_Client_ID! as string}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/map" element={< MyMap setCoord={setCoord} />} />
            <Route path="/weather" element={<Weather coord={coord} setCoord={setCoord} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </NavermapsProvider>
  );
}

export default App;
