import React, { useState } from 'react';
import { IPost } from '../../types';
import PostService from '../../service/post.ts';
import PostDetail from './PostDetail.tsx';

interface IPostCardProps {
    post: IPost;
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
    setMyPost: React.Dispatch<React.SetStateAction<IPost | undefined>>
    setIsPostDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PostThumbnail = ({ post, postService, onError, setPosts, setMyPost, setIsPostDetailOpen }: IPostCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { text, fileUrl } = post;
    const handleOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setMyPost(post);
        setIsPostDetailOpen(true);
    }
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpen}
            className={`relative group flex justify-between items-center max-w-md w-full mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden cursor-pointer`}>
            <img className='object-cover w-full h-full' src={fileUrl} alt="post_image" />
            <div
                className={`dropdown-menu ${isHovered ? 'dropdown-menu active' : 'dropdown-menu'} absolute inset-0 bg-glass opacity-0 transition-opacity flex justify-center items-center`}
            >
                <h2 className='text-white font-bold text-sm'>{text.slice(0, 8)}</h2>
            </div>
        </div>
    )
}

export default PostThumbnail;