import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../UI/Overlay.tsx';
import { IAuthHandler } from '../../types/index.ts';
import Avartar from '../UI/Avartar.tsx';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Loader from '../UI/Loader.tsx';

interface IUpdateProfileFormProps {
    authHandler: IAuthHandler;
    setEditProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileForm = ({ setEditProfileForm, authHandler }: IUpdateProfileFormProps) => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File>();
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const existUrl = authHandler.user?.user.url! as string;
        authHandler.update(text, file, existUrl).then((result) => {
            setText('');
            setLoading(false);
            setEditProfileForm(false);
            navigate('/dogWorld');
        })
            .catch(authHandler.error.onError);
    }
    // const cloudinaryId = () => {
    //     const profileUrl = authHandler.user?.user.url ?? "";
    //     const regex = /\/upload\/v\d+\/([^./]+)/;
    //     const match = regex.exec(profileUrl);
    //     const cloudinaryId = match ? match[1] : "";
    //     console.log(cloudinaryId); // Output: y6eozxfdlpmvlozuyz0w
    //     return cloudinaryId;
    // }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 10) {
            setText(event.target.value);
        }
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
                    name="name"
                    placeholder={authHandler.user?.user.name}
                    value={text}
                    onChange={onChange}
                    className="mb-4 w-full focus:outline-none"
                />
                <div className='w-full h-full flex justify-around items-center gap-2'>
                    <div className='basis-1/2 h-full flex items-center justify-center'>
                        <Avartar width={24} height={24} url={authHandler.user?.user.url ?? ""} name='profile_image' />
                    </div>
                    {file && (<FontAwesomeIcon className='text-2xl font-bold text-main-color' icon={faArrowRight} />)}
                    <div className='basis-1/2 h-full flex items-center justify-center'>
                        <input onChange={handleChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
                        <label className={`overflow-hidden w-full h-full cursor-pointer flex flex-col items-center  justify-center ${!file && 'border-2 border-main-color border-dashed'}`} htmlFor="input-upload" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDragOver} onDrop={handleDrop}>
                            {dragging && (
                                <div className='absolute inset-0 z-50 bg-sky-500/20 pointer-events-none' />
                            )}
                            {!file && (
                                <div className='p-6 flex flex-col items-center  justify-center pointer-events-none'>
                                    <FontAwesomeIcon className='text-hover-main-color p-5 text-4xl font-bold' icon={faImage} />
                                    <p className='text-main-color text-sm font-semibold'>여기에 파일을 드롭하세요.</p>
                                </div>
                            )}
                            {file && (
                                <div className='w-full h-full flex flex-col items-center  justify-center '>
                                    <Avartar width={24} height={24} url={URL.createObjectURL(file)} name='local file' />
                                    {/* <img className='object-cover -full h-32' src={URL.createObjectURL(file)} alt='local file' sizes='650px' /> */}
                                </div>
                            )}
                        </label>
                    </div>
                </div>
                <button
                    type='submit'
                    className="w-full h-full mt-6 px-4 py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out"
                >
                    {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                        <span>업데이트</span>
                    )}
                </button>
            </form>
        </Overlay>
    )
}

export default UpdateProfileForm;