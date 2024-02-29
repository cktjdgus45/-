import React from 'react';
import Hero from './Hero.tsx';
import useGetUserPosts from '../../hooks/read/useGetUserPosts.tsx';
import useProfileForm from '../../hooks/components/profile/useProfileForm.tsx';
import useProfileRouting from '../../hooks/components/profile/useProfileRouting.tsx';
import useSetPostDetail from '../../hooks/components/post/useSetPostDetail.tsx';
import ProfilePostsRenderer from '../../components/UI/ProfilePostsRenderer.tsx';
import ConditionalRenderer from '../../components/UI/ConditionalRenderer.tsx';
import UpdateProfileForm from './UpdateProfileForm.tsx';
import PostDetail from '../home/post/PostDetail.tsx';
import { IPost } from '../../types/index.ts';

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