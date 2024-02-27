import React from 'react';
import CommentList from '../../../pages/home/comment/CommentList.tsx';


const CommentSection = ({ comments }) => {
    return (
        <section className='h-3/4 mb-2 overflow-y-auto flex flex-col gap-1'>
            {comments ? comments.map((comment) => (
                <CommentList key={comment.id} comment={comment} />
            )) : 'no comments'}
        </section>
    )
}


export default CommentSection;
