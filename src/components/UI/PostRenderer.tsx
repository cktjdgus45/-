// PostsRenderer.tsx

import React from 'react';
import PostCard from '../community/post/PostCard.tsx';
import Loader from './Loader.tsx';

const PostsRenderer = ({ posts, loading }) => {
    if (loading) {
        return <Loader isLoading={loading} color='#776B5D' kind='grid' />;
    }

    if (posts?.length === 0) {
        return <p className=''>포스트가 아직 없습니다.</p>
    }

    return (
        <div className='flex flex-col items-center gap-y-20'>
            {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostsRenderer;
