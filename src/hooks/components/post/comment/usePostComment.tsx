import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../../store/features/post.ts';
import { usePostService } from '../../../../context/PostServiceContext.tsx';


const usePostComment = () => {
    const [loading, setLoading] = useState(false);
    const postService = usePostService();
    const dispatch = useDispatch();
    const handlePostComment = async (comment, postId) => {
        setLoading(true);
        try {
            const comments = await postService.postComment(comment, postId);
            dispatch(addComment({ comments, postId }));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.message);
        }
    }
    return { handlePostComment, loading };
}

export default usePostComment;