import { useState } from 'react';
import useHandleNavigate from '../../useHandleNavigate.tsx';
import useGetPostComments from '../../read/useGetPostComments.tsx';

const usePostCard = (post) => {
    const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
    const { comments } = useGetPostComments(post.id);
    const { handleNavigate } = useHandleNavigate();
    const goProfilePage = () => handleNavigate(`/${post.username}`);
    const handleOpenCommentContainerBox = () => setIsOpenCommentBox(true);

    return { comments, isOpenCommentBox, setIsOpenCommentBox, goProfilePage, handleOpenCommentContainerBox };
};

export default usePostCard;
