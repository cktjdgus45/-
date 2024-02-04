import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../../service/post';
import { IPost } from '../../types';
import Loader from '../UI/Loader.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Avartar from '../UI/Avartar.tsx';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface IUpdatePostFormProps {
    post: IPost;
    postService: PostService;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
    postId: number;
    setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePostForm = ({ post, postService, setPosts, postId, setUpdateForm }: IUpdatePostFormProps) => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File>();
    const [dragging, setDragging] = useState(false);
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const existUrl = post.fileUrl;
        postService.updatePost(postId, text, file, existUrl).then((updated) => {
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
        }).catch((error) => {
            setLoading(false);
            setUpdateForm(false);
            console.error(error)
        });
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
        <form encType='multipart/form-data' className="flex-col items-end relative bg-white p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
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
                placeholder={post.text}
                value={text}
                onChange={onChange}
                className="mb-4 w-full h-32 focus:outline-none resize-none"
            />
            <div className='w-full h-full flex justify-around items-center gap-2'>
                <div className='basis-1/2 h-full flex items-center justify-center'>
                    <Avartar width={24} height={24} url={post.fileUrl ?? ""} name='profile_image' />
                </div>
                {file && (<FontAwesomeIcon className='text-2xl font-bold text-main-color' icon={faArrowRight} />)}
                <div className='basis-1/2 h-full flex items-center justify-center'>
                    <input onChange={handleChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
                    <label className={`overflow-hidden w-full h-full cursor-pointer flex flex-col items-center  justify-center ${!file && 'border-2 border-main-color border-dashed'}`} htmlFor="input-upload" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDragOver} onDrop={handleDrop}>
                        {dragging && (
                            <div className='absolute inset-0 z-50 bg-sky-500/20 pointer-events-none' />
                        )}
                        {!file && (
                            <div className='p-6 flex flex-col items-center  justify-center pointer-events-none'>
                                <FontAwesomeIcon className='text-hover-main-color p-5 text-4xl font-bold' icon={faImage} />
                                <p className='text-main-color text-sm font-semibold'>여기에 파일을 드롭하세요.</p>
                            </div>
                        )}
                        {file && (
                            <div className='w-full h-full flex flex-col items-center  justify-center '>
                                <Avartar width={24} height={24} url={URL.createObjectURL(file)} name='local file' />
                                {/* <img className='object-cover -full h-32' src={URL.createObjectURL(file)} alt='local file' sizes='650px' /> */}
                            </div>
                        )}
                    </label>
                </div>
            </div>
            <button
                type='submit'
                className="relative w-full h-full mt-6 px-4 py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out"
            >
                {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                    <span>변경</span>
                )}
            </button>
        </form>
    )
}
export default UpdatePostForm;