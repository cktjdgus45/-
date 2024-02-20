import { useState } from 'react';

const useAddPostFormOpen = () => {
    const [isAddPostFormOpen, setAddPostForm] = useState(false);
    return { isAddPostFormOpen, setAddPostForm };
};

export default useAddPostFormOpen;
