import React, { ChangeEvent, useState } from 'react';
import PostService from '../../service/post';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../UI/Overlay.tsx';
import Loader from '../UI/Loader.tsx';

interface INewPostFormProps {
    postService: PostService;
    onError: (error: any) => void;
    setAddPostForm: React.Dispatch<React.SetStateAction<boolean>>;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

const NewPostForm = ({ postService, onError, setAddPostForm, setPosts }: INewPostFormProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File>();
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        postService.postPost(text, file).then((created) => {
            setText('');
            setLoading(false);
            setAddPostForm(false);
            setPosts((prevPosts) => [created, ...prevPosts || []]);
            navigate('/dogWorld');
        })
            .catch(onError);
    }
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textareaText = event.target.value;
        if (textareaText.length <= 255) {
            setText(textareaText);
        }
    }
    const handleClose = () => {
        setAddPostForm(false);
    }
    const preventCloseEventFromOverlay = (event: React.MouseEvent<HTMLFormElement>) => {
        event.stopPropagation();
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target?.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    }
    const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
        if (e.type === 'dragenter') {
            setDragging(true);
        } else if (e.type === 'dragleave') {
            setDragging(false);
        }
    }
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();

    }
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer?.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    }
    return (
        <Overlay setForm={setAddPostForm}>
            <form encType='multipart/form-data' onClick={preventCloseEventFromOverlay} className="relative w-1/3 flex-col items-end bg-white p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
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
                <input onChange={handleChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
                <label className={`w-full h-60 flex flex-col items-center  justify-center ${!file && 'border-2 border-main-color border-dashed'}`} htmlFor="input-upload" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDragOver} onDrop={handleDrop}>
                    {dragging && (
                        <div className='absolute inset-0 z-50 bg-sky-500/20 pointer-events-none' />
                    )}
                    {!file && (
                        <div className='flex flex-col items-center  justify-center pointer-events-none'>
                            <FontAwesomeIcon className='text-hover-main-color p-5 text-4xl font-bold' icon={faImage} />
                            <p className='text-main-color text-sm font-semibold'>여기에 파일을 드롭하세요.</p>
                        </div>
                    )}
                    {file && (
                        <div className='relative w-full h-full aspect-square'>
                            <img className='object-cover w-full h-full' src={URL.createObjectURL(file)} alt='local file' sizes='650px' />
                        </div>
                    )}
                </label>
                <button
                    type='submit'
                    className="relative w-full h-full mt-6 px-4 py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out"
                >
                    {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                        <span>업데이트</span>
                    )}
                </button>
            </form>
        </Overlay>
    )
}

export default NewPostForm;