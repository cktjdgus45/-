import useDragAndDrop from './useDragAndDrop.tsx';
import useFileUpload from './useFileUpload.tsx';
import usePostForm from './usePostForm.tsx';
import useText from '../../../useText.tsx';
import useAddPost from '../../../create/useAddPost.tsx';

const useNewPostForm = (setAddPostForm) => {
    const { handleAddPost, loading } = useAddPost();
    const { text, handleTextAreaChange } = useText(255);
    const { file, handleChangeFileInputChange, handleDragFileLabelChange } = useFileUpload();
    const { dragging, handleDrag, handleDragOver, handleDrop } = useDragAndDrop({ onDrop: handleDragFileLabelChange });
    const onSubmit = () => {
        handleAddPost(text, file);
        setAddPostForm(false);
    }
    const { handleSubmitForm } = usePostForm(onSubmit);
    const preventCloseEventFromOverlay = (event: React.MouseEvent<HTMLFormElement>) => {
        event.stopPropagation();
    }

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAddPostForm(false);
    }
    return { text, handleTextAreaChange, handleChangeFileInputChange, dragging, handleDrag, handleDragOver, handleDrop, file, handleSubmitForm, loading, preventCloseEventFromOverlay, handleClose };
}

export default useNewPostForm;