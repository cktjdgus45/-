import React from 'react';
import { IComment } from '../../../types';

interface ICommentInfoProps {
    comments: IComment[] | undefined;
    onClick: () => void;
}

const CommentInfo = ({ comments, onClick }: ICommentInfoProps) => {
    return (
        <>
            {comments && comments?.length > 0 && (
                <p className='p-2 text-sm text-stone-500'>
                    <span onClick={onClick} className="hover:text-hover-main-color transition-colors duration-300 ease-in-out cursor-pointer underline">
                        댓글 {comments.length}개
                    </span>
                </p>
            )}
        </>
    )
}

export default CommentInfo;
