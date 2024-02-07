import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPostServiceProps } from '../App';
import UpdateProfileForm from '../components/profile/UpdateProfileForm.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import Hero from '../components/profile/Hero.tsx';
import { IPost } from '../types/index.ts';
import PostThumbnail from '../components/community/PostThumbnail.tsx';
import Banner from '../components/UI/Banner.tsx';
import PostDetail from '../components/community/PostDetail.tsx';

const Profile = ({ postService }: IPostServiceProps) => {
    const navigate = useNavigate();
    const { username } = useParams(); // get user's posts with postService,protect router
    const [error, setError] = useState('');
    const [myPosts, setMyPosts] = useState<IPost[]>();
    const [myPost, setMyPost] = useState<IPost>();
    const authHandler = useAuth();
    const [editProfileForm, setEditProfileForm] = useState(false);
    const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
    const onError = (error) => {
        setError(error.toString());
        setTimeout(() => {
            setError('');
        }, 3000);
    }
    useEffect(() => {
        const user = authHandler.user?.user;
        if (user && user.username !== username) {
            console.log('Unauthorized access!');
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
                {myPosts?.map(post => <PostThumbnail key={post.id} post={post} postService={postService} onError={onError} setPosts={setMyPosts} setMyPost={setMyPost} setIsPostDetailOpen={setIsPostDetailOpen} />)}
            </div>
            {editProfileForm && (<UpdateProfileForm setEditProfileForm={setEditProfileForm} authHandler={authHandler} />)}
            {isPostDetailOpen && myPost && (<PostDetail post={myPosts.find(post => post.id === myPost.id)} postService={postService} onError={onError} setPosts={setMyPosts} setIsPostDetailOpen={setIsPostDetailOpen} />)}
        </div>
    )
}

export default Profile;