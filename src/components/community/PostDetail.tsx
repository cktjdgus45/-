import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { IPost, IUser } from '../../types';
import { useAuth } from '../../context/AuthContext.tsx';
import PostService from '../../service/post.ts';
import UpdatePostForm from './UpdatePostForm.tsx';
import { useNavigate } from 'react-router-dom';
import Avartar from '../UI/Avartar.tsx';
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
    const { username } = authHandler.user! as unknown as IUser;
    const { id, text, createdAt, username: owner, name: ownerName, url: ownerUrl, fileUrl } = post;

    const toggleUpdateForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setUpdateForm(prev => !prev
        );
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
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        const isClickInsideForm = e.target instanceof Element && e.target.closest('.post-detail-component');

        if (!isClickInsideForm) {
            setIsPostDetailOpen(false);
        }
    }
    return (
        <div onClick={handleClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
            <button
                type="button"
                className="absolute top-2 right-2 text-white hover:text-hover-main-color focus:outline-none"
                onClick={handleClose}
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <div className='post-detail-component flex gap-2 p-2 w-1/2 h-2/3 mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden'>
                <div className='w-1/2'>
                    <img className='object-cover w-full h-full rounded-sm' src={fileUrl} alt="post_image" />
                </div>
                <div className='w-1/2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <Avartar width={32} height={32} name={ownerName} url={ownerUrl} />
                            <h3 className='text-main-color text-sm font-bold'>{ownerName}</h3>
                        </div>
                        {owner === username && (
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
                    <hr className='my-1 opacity-60 w-full bg-main-color border-t-2 border-b-2 border-solid' />
                    <div className='flex flex-wrap items-center gap-2'>
                        <Avartar width={32} height={32} name={ownerName} url={ownerUrl} />
                        <div className="flex flex-col">
                            <h3 className='text-main-color text-sm font-bold'>{ownerName}</h3>
                            <h3 className='text-main-color text-sm font-bold'>{timeAgo(createdAt)}</h3>
                        </div>
                        <h3 className='text-main-color text-sm font-bold break-words overflow-hidden'>{text}</h3>
                    </div>
                    {isUpdateFormOpen && <UpdatePostForm post={post} postService={postService} setPosts={setPosts} postId={id} setUpdateForm={setUpdateForm} />}
                </div>
            </div>
        </div>

    )
}

export default PostDetail;