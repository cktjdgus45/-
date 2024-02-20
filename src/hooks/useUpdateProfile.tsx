import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useText from './useText.tsx';
import useFileUpload from './useFileUpload.tsx';
import useDragAndDrop from './useDragAndDrop.tsx';
import usePostForm from './usePostForm.tsx';
import { IAuthorizedUser, IUser } from '../types';

const useUpdateProfile = (setEditProfileForm, authHandler) => {
    const { text, handleTextChange } = useText(10);
    const { file, handleChangeFileInputChange, handleDragFileLabelChange } = useFileUpload();
    const { dragging, handleDrag, handleDragOver, handleDrop } = useDragAndDrop({ onDrop: handleDragFileLabelChange });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user } = authHandler.user as IAuthorizedUser;
    const { name, url } = user ?? (authHandler.user as unknown as IUser);

    const onSubmit = () => {
        setLoading(true);
        authHandler.update(text, file, url ?? user.url).then(() => {
            setLoading(false);
            setEditProfileForm(false);
            navigate('/dogWorld');
        })
            .catch(authHandler.error.onError);
    }
    const { handleSubmitForm } = usePostForm(onSubmit);

    const preventCloseEventFromOverlay = (event: React.MouseEvent<HTMLFormElement>) => {
        event.stopPropagation();
    }

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditProfileForm(false);
    }
    return {
        handleTextChange,
        text,
        handleChangeFileInputChange,
        file,
        dragging,
        handleDrag,
        handleDragOver,
        handleDrop,
        loading,
        name,
        url,
        handleSubmitForm,
        preventCloseEventFromOverlay,
        handleClose
    }
}

export default useUpdateProfile;