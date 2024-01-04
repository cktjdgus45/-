import React from 'react';
import { IPost } from '../../types';

interface IPostCardProps {
    post: IPost;
}

const PostCard = ({ post }: IPostCardProps) => {
    console.log(post);
    return (
        <>
            postcard.
        </>
    )
}

export default PostCard;