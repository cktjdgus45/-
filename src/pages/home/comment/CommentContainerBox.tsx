import React from 'react';
import { IComment, IPost } from '../../../types/index.ts';
import CommentList from './CommentList.tsx';
import CommentForm from './CommentForm.tsx';
import Overlay from '../../../components/UI/Overlay.tsx';

interface ICommentContainerBoxProps {
    comments: IComment[] | undefined;
    post: IPost;
    setIsOpenCommentBox: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentContainerBox = ({ setIsOpenCommentBox, comments, post }: ICommentContainerBoxProps) => {
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        const isClickInsideForm = e.target instanceof Element && e.target.closest('.comments-component');
        if (!isClickInsideForm) {
            setIsOpenCommentBox(false);
        }
    }
    return (
        <Overlay onClose={handleClose}>
            <section data-testid="comment-container-box" className="max-w-md comments-component relative w-1/3 flex-col items-end bg-white rounded-lg shadow-md">
                <header className='p-6 bg-sub-color rounded-t-lg'>
                    <h3 className='text-xl font-semibold text-main-color'>Comments</h3>
                </header>
                <main className='mb-2 max-h-64 overflow-y-auto flex flex-col gap-1'>
                    {comments ? comments.map((comment) => (
                        <CommentList key={comment.id} comment={comment} />
                    )) : '댓글이 없습니다.'}
                </main>
                <footer className='w-full'>
                    <CommentForm postId={post.id} />
                </footer>
            </section>
        </Overlay>

    )
}

export default CommentContainerBox;