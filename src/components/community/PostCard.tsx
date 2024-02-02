import React, { useEffect, useState } from 'react';
import { IComment, IPost } from '../../types';
import { timeAgo } from '../../util/timeago.ts';
import PostService from '../../service/post.ts';
import UpdatePostForm from './UpdatePostForm.tsx';
import Avartar from '../UI/Avartar.tsx';
import Loader from '../UI/Loader.tsx';
import Comments from './comments.tsx';
interface IPostCardProps {
    post: IPost;
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

const PostCard = ({ post, postService, onError, setPosts }: IPostCardProps) => {
    const [isUpdateFormOpen, setUpdateForm] = useState(false);
    const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id, text, createdAt, name, url, fileUrl } = post;
    //comment
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<IComment[]>();
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
                console.log(updatedPost);
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
    console.log(comments);
    console.log(isOpenCommentBox);
    return (
        <div className='w-1/2 h-full bg-white rounded-md shadow-md overflow-hidden'>
            <div className='flex flex-col'>
                <div className='flex items-center gap-1 p-1'>
                    <Avartar width={10} height={10} url={url} name={name} />
                    <h2 className='text-xs font-base text-main-color'>{name}</h2>
                    <span className='text-sm text-gray-500 ml-1'>{`• ${timeAgo(createdAt)}`}</span>
                </div>
                <div className="w-full h-full relative overflow-hidden">
                    <img className='object-cover w-full h-full' src={fileUrl} alt="post_image" />
                </div>
                <div className='flex-wrap flex items-center gap-2 p-2'>
                    <h2 className=' text-main-color text-sm font-bold'>{name}</h2>
                    <p className='text-span-color overflow-hidden break-words font-normal'>{text}</p>
                </div>
                <div>
                    <p onClick={() => setIsOpenCommentBox(true)} className='p-2 cursor-pointer text-sm text-gray-500'>View all {comments?.length} comments</p>
                </div>
                <div className="comment-input w-full relative flex-col items-end bg-white p-8 rounded-lg shadow-md">
                    <textarea
                        className="w-full h-16 focus:outline-none resize-none"
                        placeholder="댓글 추가..."
                        value={commentText}
                        onChange={handleInputChange}
                    />
                    <div className="flex justify-end w-full">
                        <button
                            className={`px-4 py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out ${commentText.trim() === '' && 'opacity-50 cursor-default hover:bg-main-color'}`}
                            onClick={handleAddComment}
                            disabled={commentText.trim() === ''}
                        >
                            {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                                <p>댓글</p>
                            )}
                        </button>
                    </div>
                </div>
                {isUpdateFormOpen && <UpdatePostForm post={post} postId={id} postService={postService} onError={onError} setPosts={setPosts} setUpdateForm={setUpdateForm} />}
                {isOpenCommentBox && <Comments setIsOpenCommentBox={setIsOpenCommentBox} comments={comments} post={post} postService={postService} onError={onError} setPosts={setPosts} />
                }
            </div>
        </div>
    )
}

export default PostCard;