import useFileUpload from './useFileUpload.tsx';
import useEditPost from './useEditPost.tsx';
import useText from './useText.tsx';
import usePostForm from './usePostForm.tsx';
import useDragAndDrop from './useDragAndDrop.tsx';

const useUpdateForm = (post, setIsPostDetailOpen) => {
    const { handleEditPost, loading } = useEditPost();
    const { text, handleTextAreaChange } = useText(255);
    const { file, handleChangeFileInputChange, handleDragFileLabelChange } = useFileUpload();
    const { dragging, handleDrag, handleDragOver, handleDrop } = useDragAndDrop({ onDrop: handleDragFileLabelChange });
    const onSubmit = () => {
        const existUrl = post.fileUrl;
        const newText = text.trim() === '' ? post.text : text;
        handleEditPost(post.id, newText, file, existUrl);
        setIsPostDetailOpen(false);
    }
    const { handleSubmitForm } = usePostForm(onSubmit);
    return { text, handleTextAreaChange, handleChangeFileInputChange, dragging, handleDrag, handleDragOver, handleDrop, file, handleSubmitForm, loading };
}

export default useUpdateForm;