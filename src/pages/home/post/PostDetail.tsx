import React from 'react';
import { IPost } from '../../../types/index.ts';
import CommentForm from '../comment/CommentForm.tsx';
import usePostDetail from '../../../hooks/components/post/usePostDetail.tsx';
import useDeleteClick from '../../../hooks/delete/useDeleteClick.tsx';
import UpdatePostForm from './UpdatePostForm.tsx';
import Overlay from '../../../components/UI/Overlay.tsx';
import PostDetailHeader from '../../../components/UI/post/PostDetailHeader.tsx';
import ConditionalRenderer from '../../../components/UI/ConditionalRenderer.tsx';
import CommentSection from '../../../components/UI/comment/CommentSection.tsx';

interface IPostCardProps {
    post: IPost;
    setIsPostDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PostDetail = ({ post, setIsPostDetailOpen }: IPostCardProps) => {
    const { isUpdateFormOpen, toggleUpdateForm, comments, username } = usePostDetail(post);
    const { username: owner, name: ownerName, url: ownerUrl, fileUrl, id } = post;
    const { handleDeleteClick } = useDeleteClick(id);


    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        const isClickInsideForm = e.target instanceof Element && e.target.closest('.post-detail-component');
        if (!isClickInsideForm) {
            setIsPostDetailOpen(false);
        }
    }
    return (
        <Overlay onClose={handleClose}>
            <div className='post-detail-component flex gap-2 p-2 w-1/2 h-3/4 mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-auto'>
                <div className='w-1/2'>
                    <img className='object-cover w-full h-full rounded-sm' src={fileUrl} alt="post_image" />
                </div>
                <div className='w-1/2 flex flex-col justify-around'>
                    <PostDetailHeader owner={owner} ownerName={ownerName} ownerUrl={ownerUrl} username={username} toggleUpdateForm={toggleUpdateForm} handleDeleteClick={handleDeleteClick} />
                    <hr className='my-1 opacity-60 w-full bg-main-color border-t-2 border-b-2 border-solid' />
                    <ConditionalRenderer condition={isUpdateFormOpen}>
                        {() => <UpdatePostForm post={post} setIsPostDetailOpen={setIsPostDetailOpen} />}
                    </ConditionalRenderer>
                    <CommentSection comments={comments} />
                    <CommentForm postId={id} />
                </div>
            </div>
        </Overlay>
    )
}

export default PostDetail;