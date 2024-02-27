import { useEffect, useState } from 'react';
import { RootState } from '../../store/store.ts';
import { IComment } from '../../types/index.ts';
import { useSelector } from 'react-redux';

const useGetPostComments = (postId: number) => {
    const [comments, setComments] = useState<IComment[]>();
    const post = useSelector((state: RootState) => state.post.posts.find((p) => p.id === postId));
    useEffect(() => {
        setComments(post?.comments);
    }, [post?.comments]);
    return { comments };
}
export default useGetPostComments;