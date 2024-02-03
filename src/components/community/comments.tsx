import React, { useState } from 'react';
import { IComment, IPost } from '../../types/index.ts';
import CommentBox from './CommentBox.tsx';
import PostService from '../../service/post.ts';
import Loader from '../UI/Loader.tsx';

interface ICommentsProps {
    comments: IComment[] | undefined;
    post: IPost;
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
    setIsOpenCommentBox: React.Dispatch<React.SetStateAction<boolean>>
}

const Comments = ({ setIsOpenCommentBox, comments, postService, onError, setPosts, post }: ICommentsProps) => {
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        const isClickInsideForm = e.target instanceof Element && e.target.closest('.comments-component');

        if (!isClickInsideForm) {
            setIsOpenCommentBox(false);
        }
    }
    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };
    const handleAddComment = () => {
        setLoading(true);
        if (commentText.trim() !== '') {
            postService.postComment(commentText, post.id).then((updatedPost) => {
                setCommentText('');
                setLoading(false);
                setPosts((prevPosts) => {
                    // Update the state with the updated post
                    const updatedPosts = prevPosts?.map((prevPost) =>
                        prevPost.id === updatedPost.id ? updatedPost : prevPost
                    );
                    return updatedPosts;
                });
            }).catch(onError);
        }
    };
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
            <section className="max-w-md comments-component relative w-1/3 flex-col items-end bg-white rounded-lg shadow-md">
                <header className='p-6 bg-sub-color rounded-t-lg'>
                    <h3 className='text-xl font-semibold text-main-color'>Comments</h3>
                </header>
                <main className='mb-2 max-h-64 overflow-y-auto flex flex-col gap-1'>
                    {comments ? comments.map((comment) => (
                        <CommentBox comment={comment} />
                    )) : 'no comments'}
                </main>
                <footer className='w-full'>
                    <div className="w-full relative flex-col items-end bg-sub-color p-2 rounded-b-lg shadow-md">
                        <textarea
                            className="ring-2 w-full h-16 p-2 border border-glass outline-none focus:ring-2 ring-stone-300 focus:ring-stone-500 resize-none transition-all duration-300 ease-in-out"
                            placeholder="댓글 추가..."
                            value={commentText}
                            onChange={handleInputChange}
                        />
                        <div className="flex justify-end w-full">
                            <button
                                className={`px-4 py-2 bg-main-color text-white rounded-full focus:outline-none transition-colors duration-300 ease-in-out ${commentText.trim() === '' && 'opacity-50 cursor-default hover:bg-main-color'}`}
                                onClick={handleAddComment}
                                disabled={commentText.trim() === ''}
                            >
                                {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                                    <p>댓글</p>
                                )}
                            </button>
                        </div>
                    </div>
                </footer>
            </section>
        </div>

    )
}

export default Comments;