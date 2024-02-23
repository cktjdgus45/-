import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import Banner from '../components/UI/Banner.tsx';
import NewPostForm from '../components/community/post/NewPostForm.tsx';
import useGetPosts from '../hooks/useGetPosts.tsx';
import PostsRenderer from '../components/UI/PostRenderer.tsx';
import ConditionalRenderer from '../components/UI/ConditionalRenderer.tsx';
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