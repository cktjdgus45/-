import { useState } from 'react';

const useProfileForm = () => {
    const [editProfileForm, setEditProfileForm] = useState(false);
    return { editProfileForm, setEditProfileForm };
};

export default useProfileForm;
