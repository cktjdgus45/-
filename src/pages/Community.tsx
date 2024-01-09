import React, { useEffect, useState } from 'react';
import { IPost } from '../types';
import { useAuth } from '../context/AuthContext.tsx';
import Banner from '../components/UI/Banner.tsx';
import PostCard from '../components/community/PostCard.tsx';
import PostService from '../service/post.ts';
import NewPostForm from '../components/community/NewPostForm.tsx';

interface ICommunityProps {
    postService: PostService;
    isAddPostFormOpen: boolean;
    setAddPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Community = ({ postService, isAddPostFormOpen, setAddPostForm }: ICommunityProps) => {
    const [posts, setPosts] = useState<IPost[]>();
    const [error, setError] = useState('');
    const { user } = useAuth();
    useEffect(() => {
        postService.getPosts()
            .then((posts) => setPosts([...posts]))
            .catch((error) => onError(error));
    }, [postService, user]);

    const onError = (error) => {
        setError(error.toString());
        setTimeout(() => {
            setError('');
        }, 3000);
    }
    return (
        <div className=''>
            {error && <Banner text={error} isAlert={true} />}
            {isAddPostFormOpen && (<NewPostForm setPosts={setPosts} postService={postService} onError={onError} setAddPostForm={setAddPostForm} />)}
            {posts?.length === 0 && <p className=''>No Posts Yet</p>}
            <div className='w-full h-full flex flex-col items-center bg-sub-color'>
                {posts?.map((post) => (
                    <PostCard post={post} />
                ))}
            </div>
        </div>
    )
}

export default Community;