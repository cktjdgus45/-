import React from 'react';
import { IPost } from '../../../types';
import useHover from '../../../hooks/useHover.tsx';
import HoverEffectThumbnailText from '../../../components/UI/HoverEffectThumbnailText.tsx';

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
            <HoverEffectThumbnailText text={text} isHovered={isHovered} />
        </div>
    )
}

export default PostThumbnail;