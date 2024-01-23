import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { IPost } from '../../types';
import { useAuth } from '../../context/AuthContext.tsx';
import PostService from '../../service/post.ts';
import UpdateForm from './UpdateForm.tsx';
import { useNavigate } from 'react-router-dom';
import Avartar from '../UI/Avartar.tsx';
import Overlay from '../UI/Overlay.tsx';
import { timeAgo } from '../../util/timeago.ts';

interface IPostCardProps {
    post: IPost;
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
    setIsPostDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PostDetail = ({ post, postService, onError, setPosts, setIsPostDetailOpen }: IPostCardProps) => {
    const navigate = useNavigate();
    const authHandler = useAuth();
    const [isUpdateFormOpen, setUpdateForm] = useState(false);
    const toggleUpdateForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setUpdateForm(prev => {
            return !prev
        });
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
    const { id, text, createdAt, userId, username, name, url, fileUrl } = post;
    return (
        <Overlay setForm={setIsPostDetailOpen}>
            <div className='flex gap-3 p-2 w-1/2 h-2/3 mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden'>
                <div className='basis-1/2'>
                    <img className='object-cover w-full h-full rounded-sm' src={fileUrl} alt="post_image" />
                </div>
                <div className='basis-1/2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <Avartar width={10} height={10} username={username} url={url} />
                            <h3 className='text-main-color text-sm font-bold'>{name}</h3>
                        </div>
                        {username === authHandler.user?.user.username && (
                            <div className='flex  gap-2'>
                                <button onClick={toggleUpdateForm} className='text-base cursor-pointer text-main-color hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button onClick={handleDelete} className='text-base cursor-pointer text-main-color hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        )}
                    </div>
                    <hr className='opacity-60 w-full bg-main-color border-t-2 border-b-2 border-solid' />
                    <div className='flex items-center gap-2'>
                        <Avartar width={10} height={10} username={username} url={url} />
                        <div className="flex flex-col">
                            <h3 className='text-main-color text-sm font-bold'>{name}</h3>
                            <h3 className='text-main-color text-sm font-bold'>{timeAgo(createdAt)}</h3>
                        </div>
                        <h3 className='text-main-color text-sm font-bold'>{text}</h3>
                    </div>
                    {isUpdateFormOpen && <UpdateForm postService={postService} onError={onError} setPosts={setPosts} postId={id} prevText={text} setUpdateForm={setUpdateForm} />}
                </div>
            </div>
        </Overlay>
    )
}

export default PostDetail;