import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../../service/post';
import { IPost } from '../../types';
import Loader from '../UI/Loader.tsx';

interface IUpdatePostFormProps {
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
    postId: number;
    prevText: string;
    setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePostForm = ({ postService, onError, setPosts, postId, prevText, setUpdateForm }: IUpdatePostFormProps) => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        postService.updatePost(postId, text).then((updated) => {
            setText('');
            setLoading(false);
            setUpdateForm(false);
            setPosts((prevPosts) => {
                const updatedPosts = [...prevPosts || []];
                const postIndex = updatedPosts.findIndex(post => post.id === updated.id);
                if (postIndex !== -1) {
                    updatedPosts.splice(postIndex, 1, updated);
                }
                return updatedPosts;
            }
            );
            navigate('/dogWorld');
        }).catch(onError);
    }
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textareaText = event.target.value;
        if (textareaText.length <= 255) {
            setText(textareaText);
        }
    }
    const handleClose = () => {
        setUpdateForm(false);
    }
    return (
        <form className="flex-col items-end relative bg-white p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
            <button
                type="button"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleClose}
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <textarea
                required
                autoFocus
                name="text"
                placeholder='Enter your text...'
                value={text}
                onChange={onChange}
                className="mb-4 w-full h-32 focus:outline-none resize-none" // Adjust the height as needed
            />
            <button
                type='submit'
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                    <span>변경</span>
                )}
            </button>
        </form>
    )
}
export default UpdatePostForm;