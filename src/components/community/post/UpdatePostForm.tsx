import React from 'react';
import { IPost } from '../../../types/index.ts';
import Loader from '../../UI/Loader.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Avartar from '../../UI/Avartar.tsx';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import useUpdateForm from '../../../hooks/useUpdateForm.tsx';

interface IUpdatePostFormProps {
    post: IPost;
    setIsPostDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePostForm = ({ post, setIsPostDetailOpen }: IUpdatePostFormProps) => {
    const { text, handleTextAreaChange, handleChangeFileInputChange, dragging, handleDrag, handleDragOver, handleDrop, file, handleSubmitForm, loading } = useUpdateForm(post, setIsPostDetailOpen);
    return (
        <form onSubmit={handleSubmitForm} encType='multipart/form-data' className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <textarea
                required
                name="text"
                placeholder={post.text}
                value={text || post.text}
                onChange={handleTextAreaChange}
                className="mb-4 w-full h-16 focus:outline-none resize-none ring-2 p-2 border border-glass outline-none focus:ring-2 ring-stone-300 focus:ring-stone-500 transition-all duration-300 ease-in-out"
            />
            <div className='flex flex-col items-center gap-2'>
                <div className='basis-1/2 h-full flex items-center justify-center'>
                    <Avartar width={64} height={64} url={post.fileUrl ?? ""} name='profile_image' />
                </div>
                {file && (<FontAwesomeIcon className='text-2xl font-bold text-main-color' icon={faArrowDown} />)}
                <div className='basis-1/2 h-full flex items-center justify-center'>
                    <input onChange={handleChangeFileInputChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
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
                                <Avartar width={64} height={64} url={URL.createObjectURL(file)} name='local file' />
                            </div>
                        )}
                    </label>
                </div>
            </div>
            <button
                type='submit'
                className="w-full mt-6 px-4 py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out"
            >
                {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                    <span>변경</span>
                )}
            </button>
        </form>
    )
}
export default UpdatePostForm;