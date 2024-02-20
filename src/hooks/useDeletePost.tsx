import { usePostService } from '../context/PostServiceContext.tsx';
import { useDispatch } from 'react-redux';
import { deletePost } from '../store/features/post.ts';
const useDeletePost = () => {
    const postService = usePostService();
    const dispatch = useDispatch();
    const handleDeletePost = (postId: number) => {
        try {
            postService.deletePost(postId);
            dispatch(deletePost(postId));
        } catch (error) {
            console.error(error.message);
        }
    }
    return { handleDeletePost };
}

export default useDeletePost;