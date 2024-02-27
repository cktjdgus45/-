import React from 'react';
import { IPost } from '../../../types/index.ts';
import TextInputField from '../../../components/UI/TextInputField.tsx';
import SubmitButton from '../../../components/UI/SubmitButton.tsx';
import useUpdateForm from '../../../hooks/update/useUpdateForm.tsx';
import ImageInputField from '../../../components/UI/ImageInputField.tsx';


interface IUpdatePostFormProps {
    post: IPost;
    setIsPostDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePostForm = ({ post, setIsPostDetailOpen }: IUpdatePostFormProps) => {
    const { text, handleTextAreaChange, handleChangeFileInputChange, dragging, handleDrag, handleDragOver, handleDrop, file, handleSubmitForm, loading } = useUpdateForm(post, setIsPostDetailOpen);
    return (
        <form onSubmit={handleSubmitForm} encType='multipart/form-data' className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <TextInputField
                placeholder={post.text}
                value={text || post.text}
                onChange={handleTextAreaChange}
                className="ring-2 p-2 border border-glass outline-none focus:ring-2 ring-stone-300 focus:ring-stone-500 transition-all duration-300 ease-in-out"
            />
            <ImageInputField file={file} post={post} handleChangeFileInputChange={handleChangeFileInputChange} dragging={dragging} handleDrag={handleDrag} handleDragOver={handleDragOver} handleDrop={handleDrop} />
            <SubmitButton text={'변경'} loading={loading} />
        </form>
    )
}
export default UpdatePostForm;