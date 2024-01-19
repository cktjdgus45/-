import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPostServiceProps } from '../App';
import UpdateProfileForm from '../components/community/UpdateProfileForm.tsx';
import { useAuth } from '../context/AuthContext.tsx';

const Profile = ({ postService }: IPostServiceProps) => {
    const { username } = useParams();
    const authHandler = useAuth();
    const [editProfileForm, setEditProfileForm] = useState(false);
    console.log(username);
    return (
        <>
            <button onClick={() => setEditProfileForm(true)}>Edit Profile</button>
            {editProfileForm && (<UpdateProfileForm setEditProfileForm={setEditProfileForm} authHandler={authHandler} />)}
        </>
    )
}

export default Profile;