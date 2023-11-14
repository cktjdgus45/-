import React, { useState } from 'react';
import './App.css';
import { NavermapsProvider } from 'react-naver-maps';
import MyMap from './components/MyMap.tsx';
import WeatherTemplate from './components/weather/weather.tsx';
import { Coord } from './data/latlon.ts';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/UI/Header.tsx';

function App() {
  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_Client_ID! as string}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/map" element={< MyMap />} />
            <Route path="/weather" element={<WeatherTemplate />} />
          </Routes>
        </main>
      </BrowserRouter>
    </NavermapsProvider>
  );
}

export default App;
