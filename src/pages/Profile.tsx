import React from 'react';
import Hero from '../components/profile/Hero.tsx';
import useGetUserPosts from '../hooks/useGetUserPosts.tsx';
import useProfileForm from '../hooks/useProfileForm.tsx';
import useProfileRouting from '../hooks/useProfileRouting.tsx';
import useSetPostDetail from '../hooks/useSetPostDetail.tsx';
import ProfilePostsRenderer from '../hooks/ProfilePostsRenderer.tsx';
import ConditionalRenderer from '../components/UI/ConditionalRenderer.tsx';
import UpdateProfileForm from '../components/profile/UpdateProfileForm.tsx';
import PostDetail from '../components/community/post/PostDetail.tsx';
import { IPost } from '../types/index.ts';

const Profile = () => {
    const { authHandler } = useProfileRouting();
    const { posts, loading } = useGetUserPosts();
    const { editProfileForm, setEditProfileForm } = useProfileForm();
    const { isPostDetailOpen, setIsPostDetailOpen, clickedPost, handlePostThumbnailClick } = useSetPostDetail();
    return (
        <div className='w-full h-full'>
            <Hero authHandler={authHandler} setEditProfileForm={setEditProfileForm} />
            <ProfilePostsRenderer posts={posts} loading={loading} handlePostThumbnailClick={handlePostThumbnailClick} />
            <ConditionalRenderer condition={editProfileForm}>
                {() => <UpdateProfileForm setEditProfileForm={setEditProfileForm} authHandler={authHandler} />}
            </ConditionalRenderer>
            <ConditionalRenderer condition={!!(isPostDetailOpen && clickedPost)}>
                {() => <PostDetail post={clickedPost! as IPost} setIsPostDetailOpen={setIsPostDetailOpen} />}
            </ConditionalRenderer>
        </div>
    )
}

export default Profile;