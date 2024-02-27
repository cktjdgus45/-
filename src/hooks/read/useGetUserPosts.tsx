import { useEffect, useState } from 'react';
import { usePostService } from '../../context/PostServiceContext.tsx';
import { setPosts } from '../../store/features/post.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { useParams } from 'react-router-dom';

const useGetUserPosts = () => {
    const { username } = useParams();
    const [loading, setLoading] = useState(true);
    const postService = usePostService();
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.post.posts);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await postService.getPosts(username);
                dispatch(setPosts(fetchedPosts));
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [postService, dispatch, username]);

    return { posts, loading };
}
export default useGetUserPosts;