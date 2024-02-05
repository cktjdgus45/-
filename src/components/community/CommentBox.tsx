import React from 'react';
import { IComment } from '../../types';
import Avartar from '../UI/Avartar.tsx';
import { timeAgo } from '../../util/timeago.ts';

interface ICommentsProps {
    comment: IComment;
}

const CommentBox = ({ comment }: ICommentsProps) => {
    const { id, createdAt, name, text, url } = comment;

    return (
        <li key={id} className="flex items-center gap-2 p-2">
            <Avartar width={28} height={28} url={url} name={name} />
            <div className="flex flex-col">
                <div className='flex items-center gap-1'>
                    <h6 className='text-xs font-bold text-main-color'>{name}</h6>
                    <p className='text-sm text-span-color'>{text}</p>
                </div>
                <p className='text-xs text-gray-600'>{timeAgo(createdAt)}</p>

            </div>
        </li>
    )
}


export default CommentBox;