import React, { useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import MyMap from './components/map/MyMap.tsx';
import WeatherTemplate from './components/weather/weather.tsx';
import {
  Routes,
  Route,
} from "react-router-dom";
import Community from './pages/Community.tsx';
import Footer from './components/layout/Footer.tsx';
import Header from './components/layout/Header.tsx';
import { useAuth } from './context/AuthContext.tsx';
import PostService from './service/post.ts';
import Profile from './pages/Profile.tsx';


export interface IPostServiceProps {
  postService: PostService;
  username?: string;
}

function App({ postService }: IPostServiceProps) {

  const authHandler = useAuth();
  const [isAddPostFormOpen, setAddPostForm] = useState(false);
  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_Client_ID! as string}>
      <div className='w-[880px] bg-sub-color flex flex-col h-full'>
        <Header authHandler={authHandler} setAddPostForm={setAddPostForm} />
        <main className='basis-7/10 overflow-auto'>
          <Routes>
            <Route path="/dogWorld" element={< Community postService={postService} isAddPostFormOpen={isAddPostFormOpen} setAddPostForm={setAddPostForm} />} />
            <Route path="/map" element={< MyMap />} />
            <Route path="/weather" element={<WeatherTemplate />} />
            <Route path="/:username" element={<Profile postService={postService} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </NavermapsProvider>
  );
}

export default App;
