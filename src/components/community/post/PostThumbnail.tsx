import React from 'react';
import { IPost } from '../../../types';
import useHover from '../../../hooks/useHover.tsx';

interface IPostCardProps {
    post: IPost;
    onClick: (clickedPost: IPost) => void;
}

const PostThumbnail = ({ post, onClick }: IPostCardProps) => {
    const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();
    const { text, fileUrl } = post;
    const handlePostThumbnailClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation()
        onClick(post);
    }
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handlePostThumbnailClick}
            className={`relative group flex justify-between items-center max-w-md w-full mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden cursor-pointer`}>
            <img className='object-cover w-full h-80' src={fileUrl} alt="post_image" />
            <div
                className={`dropdown-menu ${isHovered ? 'dropdown-menu active' : 'dropdown-menu'} absolute inset-0 bg-glass opacity-0 transition-opacity flex justify-center items-center`}
            >
                <h2 className='text-white font-bold text-sm'>{text.slice(0, 8)}</h2>
            </div>
        </div>
    )
}

export default PostThumbnail;