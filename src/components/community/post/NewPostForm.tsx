import React from 'react';
import Overlay from '../../UI/Overlay.tsx';
import Loader from '../../UI/Loader.tsx';
import useNewPostForm from '../../../hooks/useNewPostForm.tsx';
import FileUploadLabel from '../../UI/FileUploadLabel.tsx';

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
                <FileUploadLabel file={file} dragging={dragging} handleDrag={handleDrag} handleDragOver={handleDragOver} handleDrop={handleDrop} handleChangeFileInputChange={handleChangeFileInputChange} />
                <button
                    type='submit'
                    className="relative w-full h-full mt-6 px-4 py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out"
                >
                    {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                        <span>업로드</span>
                    )}
                </button>
            </form>
        </Overlay>
    )
}

export default NewPostForm;