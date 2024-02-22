import React from 'react';
import Hero from '../components/profile/Hero.tsx';
import useGetUserPosts from '../hooks/useGetUserPosts.tsx';
import useProfileForm from '../hooks/useProfileForm.tsx';
import useProfileRouting from '../hooks/useProfileRouting.tsx';
import useSetPostDetail from '../hooks/useSetPostDetail.tsx';
import UpdateProfileFormRenderer from '../components/UI/UpdateProfileFormRenderer.tsx';
import PostDetailRenderer from '../hooks/PostDetailRenderer.tsx';
import ProfilePostsRenderer from '../hooks/ProfilePostsRenderer.tsx';

const Profile = () => {
    const { posts, loading } = useGetUserPosts();
    const { editProfileForm, setEditProfileForm } = useProfileForm();
    const { isPostDetailOpen, setIsPostDetailOpen, clickedPost, handlePostThumbnailClick } = useSetPostDetail();
    const { authHandler } = useProfileRouting();
    return (
        <div className='w-full h-full '>
            <Hero authHandler={authHandler} setEditProfileForm={setEditProfileForm} />
            <ProfilePostsRenderer posts={posts} loading={loading} handlePostThumbnailClick={handlePostThumbnailClick} />
            <UpdateProfileFormRenderer editProfileForm={editProfileForm} setEditProfileForm={setEditProfileForm} authHandler={authHandler} />
            <PostDetailRenderer clickedPost={clickedPost} isPostDetailOpen={isPostDetailOpen} setIsPostDetailOpen={setIsPostDetailOpen} />
        </div>
    )
}

export default Profile;