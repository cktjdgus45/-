import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../UI/Overlay.tsx';
import { IAuthContext } from '../../context/AuthContext.tsx';

interface IUpdateProfileFormProps {
    authHandler: IAuthContext;
    setEditProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileForm = ({ setEditProfileForm, authHandler }: IUpdateProfileFormProps) => {
    console.log(authHandler);
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File>();
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        authHandler.update(text, file).then((result) => {
            console.log(result);
            setText('');
            setEditProfileForm(false);
            navigate('/dogWorld');
        })
            .catch(authHandler.error.onError);
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }
    const handleClose = () => {
        setEditProfileForm(false);
    }
    const preventCloseEventFromOverlay = (event: React.MouseEvent<HTMLFormElement>) => {
        event.stopPropagation();
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target?.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    }
    const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
        if (e.type === 'dragenter') {
            setDragging(true);
        } else if (e.type === 'dragleave') {
            setDragging(false);
        }
    }
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();

    }
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer?.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    }
    return (
        <Overlay setForm={setEditProfileForm}>
            <form encType='multipart/form-data' onClick={preventCloseEventFromOverlay} className="relative w-1/3 flex-col items-end bg-white p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
                <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleClose}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <input
                    required
                    autoFocus
                    type="text"
                    name="username"
                    placeholder={authHandler.user?.user.username}
                    value={text}
                    onChange={onChange}
                    className="mb-4 w-full focus:outline-none"
                />
                <input onChange={handleChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
                <label className={`w-full h-60 flex flex-col items-center  justify-center ${!file && 'border-2 border-main-color border-dashed'}`} htmlFor="input-upload" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDragOver} onDrop={handleDrop}>
                    {dragging && (
                        <div className='absolute inset-0 z-50 bg-sky-500/20 pointer-events-none' />
                    )}
                    {!file && (
                        <div className='flex flex-col items-center  justify-center pointer-events-none'>
                            <FontAwesomeIcon className='text-hover-main-color p-5 text-4xl font-bold' icon={faImage} />
                            <p className='text-main-color text-sm font-semibold'>여기에 파일을 드롭하세요.</p>
                        </div>
                    )}
                    {file && (
                        <div className='relative w-full aspect-square'>
                            <img className='object-cover' src={URL.createObjectURL(file)} alt='local file' sizes='650px' />
                        </div>
                    )}
                </label>
                <button
                    type='submit'
                    className="mt-4 px-4 py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out"
                >
                    업데이트
                </button>
            </form>
        </Overlay>
    )
}

export default UpdateProfileForm;