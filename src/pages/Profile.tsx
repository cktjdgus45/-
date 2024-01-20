import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPostServiceProps } from '../App';
import UpdateProfileForm from '../components/community/UpdateProfileForm.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import Hero from '../components/profile/Hero.tsx';

const Profile = ({ postService }: IPostServiceProps) => {
    const { username } = useParams(); // get user's posts with postService
    const authHandler = useAuth();
    const [editProfileForm, setEditProfileForm] = useState(false);
    return (
        <div className='w-full h-full '>
            <Hero authHandler={authHandler} setEditProfileForm={setEditProfileForm} />
            <div className='w-full h-full bg-slate-500'>
                posts
            </div>
            {editProfileForm && (<UpdateProfileForm setEditProfileForm={setEditProfileForm} authHandler={authHandler} />)}
        </div>
    )
}

export default Profile;