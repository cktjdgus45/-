import React from 'react';
import Loader from './Loader.tsx';
import PostThumbnail from '../../pages/home/post/PostThumbnail.tsx';

const ProfilePostsRenderer = ({ posts, loading, handlePostThumbnailClick }) => {
    return (
        <>
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
        </>
    )
}


export default ProfilePostsRenderer;