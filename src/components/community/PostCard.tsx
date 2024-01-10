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
interface IPostCardProps {
    post: IPost;
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

const PostCard = ({ post, postService, onError, setPosts }: IPostCardProps) => {
    const navigate = useNavigate();
    const authHandler = useAuth();
    const [isUpdateFormOpen, setUpdateForm] = useState(false);
    console.log(post);
    const { id, text, createdAt, userId, username, name, url } = post;
    const toggleUpdateForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setUpdateForm(prev => !prev);

    };
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        postService.deletePost(id).catch(onError);
        setPosts((prev) => {
            const updated = [...prev || []];
            const result = updated.filter(post => post?.id !== id);
            return result;
        })
        navigate('/dogWorld');
    };
    return (
        <div className='flex justify-between items-center p-5 max-w-md w-full mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <h2 className='text-xs font-base text-main-color'>{username}</h2>
                    <span className='text-sm text-gray-500 ml-1'>{`• ${timeAgo(createdAt)}`}</span>
                </div>
                <div>
                    <p className='text-span-color text-sm font-normal'>{text}</p>
                </div>
                {isUpdateFormOpen && <UpdateForm postId={id} prevText={text} postService={postService} onError={onError} setPosts={setPosts} setUpdateForm={setUpdateForm} />}
            </div>
            {username === authHandler.user?.username && (
                <div className='flex flex-col gap-2'>
                    <button onClick={toggleUpdateForm} className='text-base cursor-pointer text-main-color hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={handleDelete} className='text-base cursor-pointer text-main-color hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default PostCard;