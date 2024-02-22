import React from 'react';
import UpdatePostForm from '../community/post/UpdatePostForm.tsx';

const UpdatePostFormRenderer = ({ post, isUpdateFormOpen, setIsPostDetailOpen }) => (
    isUpdateFormOpen && <UpdatePostForm post={post} setIsPostDetailOpen={setIsPostDetailOpen} />
);

export default UpdatePostFormRenderer;