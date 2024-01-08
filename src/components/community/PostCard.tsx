import React from 'react';
import { IPost } from '../../types';
import { timeAgo } from '../../util/timeago.ts';

interface IPostCardProps {
    post: IPost;
}

const PostCard = ({ post }: IPostCardProps) => {
    console.log(post);
    const { id, text, createdAt, userId, username, name, url } = post;
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <span>{username}</span>
                <span>{timeAgo(createdAt)}</span>
            </div>
            <div></div>
            <div>
                <span>{text}</span>
            </div>
        </div>
    )
}

export default PostCard;