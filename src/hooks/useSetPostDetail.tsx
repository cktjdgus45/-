import { useState } from 'react';
import { IPost } from '../types/index.ts';

const useSetPostDetail = () => {
    const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
    const [clickedPost, setClickedPost] = useState<IPost>();

    const handlePostThumbnailClick = (clickedPost: IPost) => {
        setClickedPost(clickedPost);
        setIsPostDetailOpen(true);
    };

    return { isPostDetailOpen, setIsPostDetailOpen, clickedPost, handlePostThumbnailClick };
};
export default useSetPostDetail;
