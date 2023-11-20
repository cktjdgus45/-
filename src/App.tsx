import React from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import MyMap from './components/MyMap.tsx';
import WeatherTemplate from './components/weather/weather.tsx';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/UI/Header.tsx';
import Community from './components/community/Community.tsx';
import Footer from './components/UI/Footer.tsx';

function App() {
  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_Client_ID! as string}>
      <BrowserRouter>
        <div className='w-[880px] bg-sub-color flex flex-col h-full'>
          <Header />
          <main className='basis-7/10 bg-third-color'>
            <Routes>
              <Route path="/" element={< Community />} />
              <Route path="/map" element={< MyMap />} />
              <Route path="/weather" element={<WeatherTemplate />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </NavermapsProvider>
  );
}

export default App;
