import React, { useEffect, useState } from 'react';
import { IPostServiceProps } from '../App';
import { IPost } from '../types';
import { useAuth } from '../context/AuthContext.tsx';
import Banner from '../components/UI/Banner.tsx';
import PostCard from '../components/community/PostCard.tsx';

const Community = ({ postService }: IPostServiceProps) => {
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
            {posts?.length === 0 && <p className=''>No Posts Yet</p>}
            <>
                {posts?.map((post) => (
                    <PostCard post={post} />
                ))}
            </>
        </div>
    )
}

export default Community;