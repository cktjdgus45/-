import React from 'react';
import PostDetail from '../components/community/post/PostDetail.tsx';

const PostDetailRenderer = ({ clickedPost, isPostDetailOpen, setIsPostDetailOpen }) => (
    isPostDetailOpen && clickedPost && (
        <PostDetail
            post={clickedPost}
            setIsPostDetailOpen={setIsPostDetailOpen}
        />
    )
);

export default PostDetailRenderer;