import { useNavigate } from 'react-router-dom';
import useDeletePost from './useDeletePost.tsx';

const useDeleteClick = (postId) => {
    const { handleDeletePost } = useDeletePost();
    const navigate = useNavigate();
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        handleDeletePost(postId);
        navigate('/dogWorld');
    };
    return { handleDeleteClick };
}


export default useDeleteClick;