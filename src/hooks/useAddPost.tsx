import { useState } from 'react';
import { usePostService } from '../context/PostServiceContext.tsx';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/features/post.ts';

const useAddPost = () => {
    const [loading, setLoading] = useState(false);
    const postService = usePostService();
    const dispatch = useDispatch();
    const handleAddPost = async (text, file) => {
        setLoading(true);
        try {
            const newPost = await postService.postPost(text, file);
            dispatch(addPost(newPost));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.message);
        }
    }
    return { handleAddPost, loading };
}
export default useAddPost;