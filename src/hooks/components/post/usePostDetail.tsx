import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';
import { IAuthorizedUser, IPost, IUser } from '../../../types/index.ts';
import { useAuth } from '../../../context/AuthContext.tsx';

const usePostDetail = (post: IPost) => {
    const [isUpdateFormOpen, setUpdateForm] = useState(false);
    const [comments, setComments] = useState(post.comments);
    const posts = useSelector((state: RootState) => state.post.posts);
    const authHandler = useAuth();
    const { user } = authHandler.user as IAuthorizedUser;
    const { username } = user ?? (authHandler.user as unknown as IUser);
    useEffect(() => {
        const currentPost = posts.find(p => p.id === post.id);
        if (currentPost) {
            setComments(currentPost.comments);
        }
    }, [posts, post]);

    const toggleUpdateForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setUpdateForm(prev => !prev);
    };

    return { isUpdateFormOpen, toggleUpdateForm, comments, username };
};
export default usePostDetail;