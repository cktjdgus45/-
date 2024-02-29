import React from 'react';
import { IPost } from '../../../types/index.ts';
import Overlay from '../../../components/UI/Overlay.tsx';
import usePostDetail from '../../../hooks/components/post/usePostDetail.tsx';
import useDeleteClick from '../../../hooks/delete/useDeleteClick.tsx';
import PostDetailHeader from '../../../components/UI/post/PostDetailHeader.tsx';
import CommentSection from '../../../components/UI/comment/CommentSection.tsx';
import ConditionalRenderer from '../../../components/UI/ConditionalRenderer.tsx';
import UpdatePostForm from './UpdatePostForm.tsx';
import CommentForm from '../comment/CommentForm.tsx';

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
            <article className='max-mobile:text-xs post-detail-component flex flex-col laptop:flex-row gap-2 p-2 w-1/2 h-3/4 mx-auto my-4 bg-white border border-gray-300 rounded-md shadow-md overflow-auto'>
                <section className='w-full h-full'>
                    <img className='object-cover w-full h-full rounded-sm' src={fileUrl} alt="post_image" />
                </section>
                <section className='w-full h-full flex flex-col justify-around'>
                    <PostDetailHeader owner={owner} ownerName={ownerName} ownerUrl={ownerUrl} username={username} toggleUpdateForm={toggleUpdateForm} handleDeleteClick={handleDeleteClick} />
                    <hr className='my-1 opacity-60 w-full bg-main-color border-t-2 border-b-2 border-solid' />
                    <ConditionalRenderer condition={isUpdateFormOpen}>
                        {() => <UpdatePostForm post={post} setIsPostDetailOpen={setIsPostDetailOpen} />}
                    </ConditionalRenderer>
                    <CommentSection comments={comments} />
                    <CommentForm postId={id} />
                </section>
            </article>
        </Overlay>
    )
}

export default PostDetail;