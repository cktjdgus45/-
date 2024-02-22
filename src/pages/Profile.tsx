import React from 'react';
import UpdateProfileForm from '../components/profile/UpdateProfileForm.tsx';
import Hero from '../components/profile/Hero.tsx';
import PostThumbnail from '../components/community/post/PostThumbnail.tsx';
import PostDetail from '../components/community/post/PostDetail.tsx';
import useGetUserPosts from '../hooks/useGetUserPosts.tsx';
import Loader from '../components/UI/Loader.tsx';
import useProfileForm from '../hooks/useProfileForm.tsx';
import useProfileRouting from '../hooks/useProfileRouting.tsx';
import useSetPostDetail from '../hooks/useSetPostDetail.tsx';

const Profile = () => {
    const { posts, loading } = useGetUserPosts();
    const { editProfileForm, setEditProfileForm } = useProfileForm();
    const { isPostDetailOpen, setIsPostDetailOpen, clickedPost, handlePostThumbnailClick } = useSetPostDetail();
    const { authHandler } = useProfileRouting();
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