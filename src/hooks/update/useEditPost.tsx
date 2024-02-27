import { useState } from 'react';
import { usePostService } from '../../context/PostServiceContext.tsx';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/features/post.ts';

const useEditPost = () => {
    const [loading, setLoading] = useState(false);
    const postService = usePostService();
    const dispatch = useDispatch();
    const handleEditPost = async (postId, text, file, existUrl) => {
        setLoading(true);
        try {
            const updatedPost = await postService.updatePost(postId, text, file ?? existUrl);
            dispatch(updatePost(updatedPost));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.message);
        }
    }
    return { handleEditPost, loading };
}

export default useEditPost;