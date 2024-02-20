import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import Banner from '../components/UI/Banner.tsx';
import PostCard from '../components/community/post/PostCard.tsx';
import NewPostForm from '../components/community/post/NewPostForm.tsx';
import useGetPosts from '../hooks/useGetPosts.tsx';
import Loader from '../components/UI/Loader.tsx';
interface ICommunityProps {
    isAddPostFormOpen: boolean;
    setAddPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Community = ({ isAddPostFormOpen, setAddPostForm }: ICommunityProps) => {
    const { posts, loading } = useGetPosts();
    console.log(posts);
    const { error: { error } } = useAuth();

    return (
        <section className='w-full h-full bg-sub-color'>
            {error && <Banner text={error} isAlert={true} />}
            {isAddPostFormOpen && (<NewPostForm setAddPostForm={setAddPostForm} />)}
            {posts?.length === 0 && <p className=''>포스트가 아직 없습니다.</p>}
            {loading ? <Loader isLoading={loading} color='#776B5D' kind='grid' />
                : (
                    <div className='flex flex-col items-center gap-y-20'>
                        {posts?.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                )}
        </section>
    )
}

export default Community;