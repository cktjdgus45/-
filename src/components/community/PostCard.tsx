import React, { useState } from 'react';
import { IPost } from '../../types';
import { timeAgo } from '../../util/timeago.ts';
import PostService from '../../service/post.ts';
import UpdatePostForm from './UpdatePostForm.tsx';
import Avartar from '../UI/Avartar.tsx';
interface IPostCardProps {
    post: IPost;
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

const PostCard = ({ post, postService, onError, setPosts }: IPostCardProps) => {
    const [isUpdateFormOpen, setUpdateForm] = useState(false);
    const { id, text, createdAt, name, url, fileUrl } = post;
    //comment
    const [commentText, setCommentText] = useState('');
    const [result, setResult] = useState('');

    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleAddComment = () => {
        if (commentText.trim() !== '') {
            postService.postComment(commentText, post.id).then(setResult).catch(onError);
            setCommentText('');
        }
    };
    console.log(result);
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
                    <h2 className=' text-main-color'>{name}</h2>
                    <p className='text-span-color overflow-hidden break-words'>{text}</p>
                </div>
                <div className="comment-input p-4 border-t border-gray-300">
                    <textarea
                        className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={handleInputChange}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        onClick={handleAddComment}
                    >
                        Add Comment
                    </button>
                </div>
                {isUpdateFormOpen && <UpdatePostForm post={post} postId={id} postService={postService} onError={onError} setPosts={setPosts} setUpdateForm={setUpdateForm} />}
            </div>
        </div>
    )
}

export default PostCard;