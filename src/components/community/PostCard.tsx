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
        <div className='p-5 max-w-md w-full mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden'>
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <h2 className='text-base font-semibold'>{username}</h2>
                    <span className='text-xs text-gray-500 ml-1'>{timeAgo(createdAt)}</span>
                </div>
                <div>
                    <p className='text-span-color'>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default PostCard;