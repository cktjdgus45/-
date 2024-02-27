import React from 'react';
import ConditionalRenderer from '../../components/UI/ConditionalRenderer.tsx';
import Banner from '../../components/UI/Banner.tsx';
import useGetPosts from '../../hooks/read/useGetPosts.tsx';
import PostsRenderer from '../../components/UI/post/PostRenderer.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import NewPostForm from './post/NewPostForm.tsx';

interface ICommunityProps {
    isAddPostFormOpen: boolean;
    setAddPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Community = ({ isAddPostFormOpen, setAddPostForm }: ICommunityProps) => {
    const { posts, loading } = useGetPosts();
    const { error: { error } } = useAuth();

    return (
        <section className='w-full h-full bg-sub-color'>
            <ConditionalRenderer condition={!!error}>
                {() => <Banner text={error} isAlert={true} />}
            </ConditionalRenderer>
            <ConditionalRenderer condition={isAddPostFormOpen}>
                {() => <NewPostForm setAddPostForm={setAddPostForm} />}
            </ConditionalRenderer>
            <PostsRenderer posts={posts} loading={loading} />
        </section>
    )
}

export default Community;