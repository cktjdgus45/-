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
                {isUpdateFormOpen && <UpdatePostForm postId={id} prevText={text} postService={postService} onError={onError} setPosts={setPosts} setUpdateForm={setUpdateForm} />}
            </div>
        </div>
    )
}

export default PostCard;