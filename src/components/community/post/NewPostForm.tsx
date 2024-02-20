import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../../UI/Overlay.tsx';
import Loader from '../../UI/Loader.tsx';
import useNewPostForm from '../../../hooks/useNewPostForm.tsx';

interface INewPostFormProps {
    setAddPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPostForm = ({ setAddPostForm }: INewPostFormProps) => {
    const { text, handleTextAreaChange, handleChangeFileInputChange, dragging, handleDrag, handleDragOver, handleDrop, file, handleSubmitForm, loading, preventCloseEventFromOverlay, handleClose } = useNewPostForm(setAddPostForm);
    return (
        <Overlay onClose={handleClose}>
            <form onSubmit={handleSubmitForm} encType='multipart/form-data' onClick={preventCloseEventFromOverlay} className="relative w-1/3 flex-col items-end bg-white p-8 rounded-lg shadow-md">
                <textarea
                    required
                    autoFocus
                    name="text"
                    placeholder='Enter your text...'
                    value={text}
                    onChange={handleTextAreaChange}
                    className="mb-4 w-full h-32 focus:outline-none resize-none" // Adjust the height as needed
                />
                <input onChange={handleChangeFileInputChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
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