import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPostServiceProps } from '../App';
import UpdateProfileForm from '../components/profile/UpdateProfileForm.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import Hero from '../components/profile/Hero.tsx';
import { IPost } from '../types/index.ts';
import PostThumbnail from '../components/community/PostThumbnail.tsx';
import Banner from '../components/UI/Banner.tsx';

const Profile = ({ postService }: IPostServiceProps) => {
    const navigate = useNavigate();
    const { username } = useParams(); // get user's posts with postService,protect router
    const [error, setError] = useState('');
    const [myPosts, setMyPosts] = useState<IPost[]>();
    const authHandler = useAuth();
    const [editProfileForm, setEditProfileForm] = useState(false);
    const onError = (error) => {
        setError(error.toString());
        setTimeout(() => {
            setError('');
        }, 3000);
    }
    useEffect(() => {
        // Check if the authenticated user matches the one in the URL parameter
        const user = authHandler.user?.user;
        if (user && user.username !== username) {
            // Redirect or handle unauthorized access (e.g., show an error message)
            console.log('Unauthorized access!');
            // Redirect the user to a login page or another route
            navigate('/dogWorld');
        }
    }, [authHandler.user?.user, navigate, username]);
    useEffect(() => {
        postService.getPosts(username).then(setMyPosts).catch(onError);
    }, [postService, username])
    return (
        <div className='w-full h-full '>
            {error && <Banner text={error} isAlert={true} />}
            <Hero authHandler={authHandler} setEditProfileForm={setEditProfileForm} />
            <div className="grid grid-cols-3 gap-4">
                {myPosts?.map(post => <PostThumbnail key={post.id} post={post} postService={postService} onError={onError} setPosts={setMyPosts} />)}

            </div>
            {editProfileForm && (<UpdateProfileForm setEditProfileForm={setEditProfileForm} authHandler={authHandler} />)}
        </div>
    )
}

export default Profile;