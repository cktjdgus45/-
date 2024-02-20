import { useCallback } from 'react';

const usePostForm = (onSubmit) => {
    const handleSubmitForm = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        onSubmit();
    }, [onSubmit]);
    return { handleSubmitForm };
}

export default usePostForm;