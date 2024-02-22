import React from 'react';
import usePostComment from '../../../hooks/usePostComment.tsx';
import Loader from '../../UI/Loader.tsx';
import useText from '../../../hooks/useText.tsx';

interface CommentFormProps {
    postId: number;
}

const CommentForm = ({ postId }: CommentFormProps) => {
    const { handlePostComment, loading } = usePostComment();
    const { text, setText, handleTextAreaChange } = useText(155);

    const handleAddComment = () => {
        handlePostComment(text, postId);
        setText('');
    }
    return (
        <div className="w-full flex-col items-end bg-white p-2 rounded-lg shadow-md">
            <textarea
                className="ring-2 w-full h-16 p-2 border border-glass outline-none focus:ring-2 ring-stone-300 focus:ring-stone-500 resize-none transition-all duration-300 ease-in-out"
                placeholder="댓글 추가..."
                value={text}
                onChange={handleTextAreaChange}
            />
            <div className="flex justify-end w-full">
                <button
                    className={`px-4 py-2 bg-main-color text-white rounded-full focus:outline-none transition-colors duration-300 ease-in-out ${text.trim() === '' && 'opacity-50 cursor-default hover:bg-main-color'}`}
                    onClick={handleAddComment}
                    disabled={text.trim() === ''}
                >
                    {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                        <p>댓글</p>
                    )}
                </button>
            </div>
        </div>
    )
}

export default CommentForm;