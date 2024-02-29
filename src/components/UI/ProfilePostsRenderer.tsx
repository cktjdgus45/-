import React from 'react';
import Loader from './Loader.tsx';
import PostThumbnail from '../../pages/home/post/PostThumbnail.tsx';

const ProfilePostsRenderer = ({ posts, loading, handlePostThumbnailClick }) => {
    return (
        <section>
            {loading ? <Loader isLoading={loading} color='#776B5D' kind='grid' />
                : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map(post => (
                            <PostThumbnail
                                onClick={handlePostThumbnailClick}
                                key={post.id}
                                post={post}
                            />
                        ))}
                    </div>
                )}
        </section>
    )
}


export default ProfilePostsRenderer;