import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { IAuthorizedUser, IComment, IPost, IUser } from '../../../types/index.ts';
import { useAuth } from '../../../context/AuthContext.tsx';
import UpdatePostForm from './UpdatePostForm.tsx';
import { useNavigate } from 'react-router-dom';
import Avartar from '../../UI/Avartar.tsx';
import CommentList from '../comment/CommentList.tsx';
import useDeletePost from '../../../hooks/useDeletePost.tsx';
import { useSelector } from 'react-redux';
import CommentForm from '../comment/CommentForm.tsx';
import { RootState } from '../../../store/store.ts';
import Overlay from '../../UI/Overlay.tsx';

interface IPostCardProps {
    post: IPost;
    setIsPostDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PostDetail = ({ post, setIsPostDetailOpen }: IPostCardProps) => {
    const { handleDeletePost } = useDeletePost();
    const navigate = useNavigate();
    const authHandler = useAuth();
    const [isUpdateFormOpen, setUpdateForm] = useState(false);
    const [comments, setComments] = useState<IComment[]>();
    const posts = useSelector((state: RootState) => state.post.posts);
    const { user } = authHandler.user as IAuthorizedUser;
    const { username } = user ?? (authHandler.user as unknown as IUser);
    const { username: owner, name: ownerName, url: ownerUrl, fileUrl } = post;

    useEffect(() => {
        const currentPost = posts.find(p => p.id === post.id);
        if (currentPost) {
            setComments(currentPost.comments);
        }
    }, [posts, post]);

    const toggleUpdateForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setUpdateForm(prev => !prev
        );
    };
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        handleDeletePost(post.id);
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
        <Overlay onClose={handleClose}>
            <div className='post-detail-component flex gap-2 p-2 w-1/2 h-3/4 mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-auto'>
                <div className='w-1/2'>
                    <img className='object-cover w-full h-full rounded-sm' src={fileUrl} alt="post_image" />
                </div>
                <div className='w-1/2 flex flex-col justify-around'>
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
                                <button onClick={handleDeleteClick} className='text-base cursor-pointer text-main-color hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        )}
                    </div>
                    <hr className='my-1 opacity-60 w-full bg-main-color border-t-2 border-b-2 border-solid' />
                    {isUpdateFormOpen && <UpdatePostForm post={post} setIsPostDetailOpen={setIsPostDetailOpen} />}
                    <section className='h-3/4 mb-2 overflow-y-auto flex flex-col gap-1'>
                        {comments ? comments.map((comment) => (
                            <CommentList key={comment.id} comment={comment} />
                        )) : 'no comments'}
                    </section>
                    <CommentForm postId={post.id} />
                </div>
            </div>
        </Overlay>
    )
}

export default PostDetail;