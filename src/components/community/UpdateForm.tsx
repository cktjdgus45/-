import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../../service/post';
import { IPost } from '../../types';

interface IUpdatePostFormProps {
    postService: PostService;
    onError: (error: any) => void;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
    postId: number;
    prevText: string;
    setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateForm = ({ postService, onError, setPosts, postId, prevText, setUpdateForm }: IUpdatePostFormProps) => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        postService.updatePost(postId, text).then((updated) => {
            console.log(updated);
            setText('');
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
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }
    return (
        <form className="flex-col items-end relative bg-white p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
            <input
                required
                autoFocus
                type="text"
                placeholder={prevText}
                value={text}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
                type='submit'
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                변경
            </button>
        </form>
    )
}
export default UpdateForm;