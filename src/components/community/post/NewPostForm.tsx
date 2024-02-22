import React from 'react';
import Overlay from '../../UI/Overlay.tsx';
import useNewPostForm from '../../../hooks/useNewPostForm.tsx';
import FileUploadLabel from '../../UI/FileUploadLabel.tsx';
import SubmitButton from '../../UI/SubmitButton.tsx';
import TextInputField from '../../UI/TextInputField.tsx';

interface INewPostFormProps {
    setAddPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPostForm = ({ setAddPostForm }: INewPostFormProps) => {
    const { text, handleTextAreaChange, handleChangeFileInputChange, dragging, handleDrag, handleDragOver, handleDrop, file, handleSubmitForm, loading, preventCloseEventFromOverlay, handleClose } = useNewPostForm(setAddPostForm);
    return (
        <Overlay onClose={handleClose}>
            <form onSubmit={handleSubmitForm} encType='multipart/form-data' onClick={preventCloseEventFromOverlay} className="relative w-1/3 flex-col items-end bg-white p-8 rounded-lg shadow-md">
                <TextInputField
                    autoFocus
                    placeholder='강아지에 대한 정보를 입력해주세요.'
                    value={text}
                    onChange={handleTextAreaChange}
                />
                <input onChange={handleChangeFileInputChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
                <FileUploadLabel file={file} dragging={dragging} handleDrag={handleDrag} handleDragOver={handleDragOver} handleDrop={handleDrop} handleChangeFileInputChange={handleChangeFileInputChange} />
                <SubmitButton text={'업로드'} loading={loading} />
            </form>
        </Overlay>
    )
}

export default NewPostForm;