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
    const { user, error: { error } } = useAuth();
    useEffect(() => {
        postService.getPosts()
            .then((posts) => setPosts([...posts]))
            .catch((error) => console.error(error));
    }, [postService, user]);

    return (
        <div className='w-full h-full bg-sub-color'>
            {error && <Banner text={error} isAlert={true} />}
            {isAddPostFormOpen && (<NewPostForm setPosts={setPosts} postService={postService} setAddPostForm={setAddPostForm} />)}
            {posts?.length === 0 && <p className=''>포스트가 아직 없습니다.</p>}
            <div className='flex flex-col items-center gap-y-20'>
                {posts?.map((post) => (
                    <PostCard key={post.id} post={post} setPosts={setPosts} postService={postService} />
                ))}
            </div>
        </div>
    )
}

export default Community;