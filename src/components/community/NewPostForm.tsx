import React, { useState } from 'react';
import PostService from '../../service/post';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../../types';
interface INewPostFormProps {
    postService: PostService;
    onError: (error: any) => void;
    setAddPostForm: React.Dispatch<React.SetStateAction<boolean>>;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

const NewPostForm = ({ postService, onError, setAddPostForm, setPosts }: INewPostFormProps) => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        postService.postPost(text).then((created) => {
            console.log(created);
            setText('');
            setAddPostForm(false);
            setPosts((prevPosts) => [created, ...prevPosts || []]);
            navigate('/dogWorld');
        })
            .catch(onError);
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }
    const handleClose = () => {
        setAddPostForm(false);
    }
    const preventCloseEventFromOverlay = (event: React.MouseEvent<HTMLFormElement>) => {
        event.stopPropagation();
    }
    return (
        <>
            <div onClick={handleClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
                <form onClick={preventCloseEventFromOverlay} className="flex-col items-end relative bg-white p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
                    <button
                        type="button"
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={handleClose}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <input
                        required
                        autoFocus
                        type="text"
                        placeholder='Enter your text...'
                        value={text}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type='submit'
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Post
                    </button>
                </form>
            </div>
        </>
    )
}

export default NewPostForm;