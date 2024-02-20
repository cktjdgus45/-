import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateProfileForm from '../components/profile/UpdateProfileForm.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import Hero from '../components/profile/Hero.tsx';
import { IPost } from '../types/index.ts';
import PostThumbnail from '../components/community/post/PostThumbnail.tsx';
import PostDetail from '../components/community/post/PostDetail.tsx';
import useGetUserPosts from '../hooks/useGetUserPosts.tsx';
import Loader from '../components/UI/Loader.tsx';

const Profile = () => {
    const [clickedPost, setClickedPost] = useState<IPost>();
    const handlePostThumbnailClick = (clickedPost: IPost) => {
        setClickedPost(clickedPost);
        setIsPostDetailOpen(true);
    };
    const navigate = useNavigate();
    const { username } = useParams(); // get user's posts with postService,protect router
    const { posts, loading } = useGetUserPosts(username);
    const authHandler = useAuth();
    const [editProfileForm, setEditProfileForm] = useState(false);
    const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);

    useEffect(() => {
        const user = authHandler.user?.user;
        if (user && user.username !== username) {
            navigate('/dogWorld');
        }
    }, [authHandler.user?.user, navigate, username]);

    return (
        <div className='w-full h-full '>
            <Hero authHandler={authHandler} setEditProfileForm={setEditProfileForm} />
            {loading ? <Loader isLoading={loading} color='#776B5D' kind='grid' />
                : (
                    <div className="grid grid-cols-3 gap-4">
                        {posts.map(post => (
                            <PostThumbnail
                                onClick={handlePostThumbnailClick}
                                key={post.id}
                                post={post}
                            />
                        ))}
                    </div>
                )}

            {editProfileForm && (<UpdateProfileForm setEditProfileForm={setEditProfileForm} authHandler={authHandler} />)}
            {isPostDetailOpen && clickedPost && (
                <PostDetail
                    post={clickedPost}
                    setIsPostDetailOpen={setIsPostDetailOpen}
                />
            )}
        </div>
    )
}

export default Profile;