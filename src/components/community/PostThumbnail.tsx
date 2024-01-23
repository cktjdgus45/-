import React, { useState } from 'react';
import { IPost } from '../../types';
import { timeAgo } from '../../util/timeago.ts';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../context/AuthContext.tsx';
import PostService from '../../service/post.ts';
import UpdateForm from './UpdateForm.tsx';
import { useNavigate } from 'react-router-dom';
import PostDetail from './PostDetail.tsx';

interface IPostCardProps {
    post: IPost;
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

const PostThumbnail = ({ post, postService, onError, setPosts }: IPostCardProps) => {
    const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { id, text, createdAt, userId, username, name, url, fileUrl } = post;
    const handleOpen = () => {
        setIsPostDetailOpen(prev => !prev);
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
                <h2 className='text-white font-bold text-sm'>{text}</h2>
            </div>
            {isPostDetailOpen && <PostDetail post={post} postService={postService} onError={onError} setPosts={setPosts} setIsPostDetailOpen={setIsPostDetailOpen} />}
        </div>
    )
}

export default PostThumbnail;