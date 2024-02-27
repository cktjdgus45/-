import React from 'react';

interface IPostContentProps {
    name: string;
    text: string;
}

const PostContent = ({ name, text }: IPostContentProps) => (
    <div className='flex-wrap flex items-center gap-2 p-2 text-sm'>
        <h2 className=' text-main-color font-bold'>{name}</h2>
        <p className='text-span-color overflow-hidden break-words font-normal'>{text}</p>
    </div>
);

export default PostContent;
