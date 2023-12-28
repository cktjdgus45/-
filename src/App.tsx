import React from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import MyMap from './components/MyMap.tsx';
import WeatherTemplate from './components/weather/weather.tsx';
import {
  Routes,
  Route,
} from "react-router-dom";
import Community from './components/community/Community.tsx';
import Footer from './components/layout/Footer.tsx';
import Header from './components/layout/Header.tsx';
import { useAuth } from './context/AuthContext.tsx';


function App() {
  const authHandler = useAuth();
  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_Client_ID! as string}>
      <div className='w-[880px] bg-sub-color flex flex-col h-full'>
        <Header authHandler={authHandler} />
        <main className='basis-7/10 bg-third-color'>
          <Routes>
            <Route path="/dogWorld" element={< Community />} />
            <Route path="/map" element={< MyMap />} />
            <Route path="/weather" element={<WeatherTemplate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </NavermapsProvider>
  );
}

export default App;
