import React from 'react';
import Avartar from '../Avartar.tsx';
import { timeAgo } from '../../../util/timeago.ts';

interface IPostAuthorProfileProps {
    url: string;
    name: string;
    createdAt: string;
    onClick: () => void;
}

const PostAuthorProfile = ({ url, name, createdAt, onClick }: IPostAuthorProfileProps) => {
    return (
        <div className='flex items-center gap-1 p-2'>
            <div className='cursor-pointer' onClick={onClick} >
                <Avartar width={32} height={32} url={url} name={name} />
            </div>
            <h2 onClick={onClick} className='cursor-pointer text-xs font-bold text-main-color'>{name}</h2>
            <span className='text-xs text-gray-500 ml-1'>{`• ${timeAgo(createdAt)}`}</span>
        </div>
    )
}

export default PostAuthorProfile;