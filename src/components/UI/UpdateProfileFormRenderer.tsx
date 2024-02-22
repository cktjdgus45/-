import React from 'react';
import UpdateProfileForm from '../profile/UpdateProfileForm.tsx';

const UpdateProfileFormRenderer = ({ editProfileForm, setEditProfileForm, authHandler }) =>
(
    editProfileForm && (<UpdateProfileForm setEditProfileForm={setEditProfileForm} authHandler={authHandler} />)
)


export default UpdateProfileFormRenderer;