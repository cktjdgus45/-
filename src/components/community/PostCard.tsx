import React, { useEffect, useState } from 'react';
import { IComment, IPost } from '../../types';
import { timeAgo } from '../../util/timeago.ts';
import PostService from '../../service/post.ts';
import UpdatePostForm from './UpdatePostForm.tsx';
import Avartar from '../UI/Avartar.tsx';
import Loader from '../UI/Loader.tsx';
import Comments from './comments.tsx';
import { useNavigate } from 'react-router-dom';
interface IPostCardProps {
    post: IPost;
    postService: PostService;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

const PostCard = ({ post, postService, setPosts }: IPostCardProps) => {
    const [isUpdateFormOpen, setUpdateForm] = useState(false);
    const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id, text, createdAt, name, username, url, fileUrl } = post;
    //comment
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<IComment[]>();
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };
    useEffect(() => {
        setComments((JSON.parse(post.comments)));
    }, [post.comments]);
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
            }).catch((error) => console.error(error));
        }
    };
    return (
        <div className='w-1/2 h-full bg-white rounded-md shadow-md overflow-hidden'>
            <div className='flex flex-col'>
                <div className='flex items-center gap-1 p-2'>
                    <div className='cursor-pointer' onClick={() => handleNavigate(`/${username}`)} >
                        <Avartar width={32} height={32} url={url} name={name} />
                    </div>
                    <h2 onClick={() => handleNavigate(`/${username}`)} className='cursor-pointer text-xs font-bold text-main-color'>{name}</h2>
                    <span className='text-xs text-gray-500 ml-1'>{`• ${timeAgo(createdAt)}`}</span>
                </div>
                <div className="w-full h-full relative overflow-hidden">
                    <img className='object-cover w-full h-full' src={fileUrl} alt="post_image" />
                </div>
                <div className='flex-wrap flex items-center gap-2 p-2 text-sm'>
                    <h2 className=' text-main-color font-bold'>{name}</h2>
                    <p className='text-span-color overflow-hidden break-words font-normal'>{text}</p>
                </div>
                <p className='p-2 text-sm text-stone-500'>
                    <span onClick={() => setIsOpenCommentBox(true)} className="hover:text-hover-main-color transition-colors duration-300 ease-in-out cursor-pointer ">View all {comments?.length} comments</span>
                </p>
                <div className="comment-input w-full relative flex-col items-end bg-white p-2 rounded-lg shadow-md">
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
                {isUpdateFormOpen && <UpdatePostForm post={post} postId={id} postService={postService} setPosts={setPosts} setUpdateForm={setUpdateForm} />}
                {isOpenCommentBox && <Comments setIsOpenCommentBox={setIsOpenCommentBox} comments={comments} post={post} postService={postService} setPosts={setPosts} />
                }
            </div>
        </div>
    )
}

export default PostCard;