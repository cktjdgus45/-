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
        <div className='bg-white rounded-md shadow-md overflow-hidden'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <Avartar width={10} height={10} url={url} name={name} />
                    <h2 className='text-xs font-base text-main-color'>{name}</h2>
                    <span className='text-sm text-gray-500 ml-1'>{`• ${timeAgo(createdAt)}`}</span>
                </div>
                <div className="w-80 h-52 relative overflow-hidden">
                    <img className='object-cover w-full h-full' src={fileUrl} alt="post_image" />
                </div>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-xs font-base text-main-color'>{name}</h2>
                    <p className='text-span-color text-sm font-normal'>{text}</p>
                </div>
                {isUpdateFormOpen && <UpdatePostForm postId={id} prevText={text} postService={postService} onError={onError} setPosts={setPosts} setUpdateForm={setUpdateForm} />}
            </div>
        </div>
    )
}

export default PostCard;