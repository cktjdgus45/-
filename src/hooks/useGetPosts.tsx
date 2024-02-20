import { useEffect, useState } from 'react';
import { usePostService } from '../context/PostServiceContext.tsx';
import { setPosts } from '../store/features/post.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';

const useGetPosts = () => {
    const [loading, setLoading] = useState(false);
    const postService = usePostService();
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.post.posts);
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const fetchedPosts = await postService.getPosts();
                dispatch(setPosts(fetchedPosts));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error.message);
            }
        };
        fetchPosts();
    }, [postService, dispatch]);

    return { posts, loading };
}
export default useGetPosts;