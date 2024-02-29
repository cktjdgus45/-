import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../../components/UI/Overlay.tsx';
import { IAuthHandler } from '../../types/index.ts';
import Avartar from '../../components/UI/Avartar.tsx';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/UI/Loader.tsx';

import useUpdateProfile from '../../hooks/update/useUpdateProfile.tsx';

interface IUpdateProfileFormProps {
    authHandler: IAuthHandler;
    setEditProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileForm = ({ setEditProfileForm, authHandler }: IUpdateProfileFormProps) => {
    const { handleTextChange,
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
    } = useUpdateProfile(setEditProfileForm, authHandler);
    return (
        <Overlay onClose={handleClose}>
            <form encType='multipart/form-data' onClick={preventCloseEventFromOverlay} className="max-mobile:text-xs relative w-1/3 flex-col items-end bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmitForm}>
                <input
                    aria-label='업데이트할 이름을 입력해주세요.'
                    required
                    autoFocus
                    type="text"
                    name="name"
                    placeholder={name}
                    value={text}
                    onChange={handleTextChange}
                    className="mb-4 w-full focus:outline-none"
                />
                <section className='w-full h-full flex flex-col mobile:flex-row justify-around items-center gap-2'>
                    <div className='basis-1/2 h-full flex items-center justify-center'>
                        <Avartar width={64} height={64} url={url ?? ""} name='profile_image' />
                    </div>
                    {file && (<FontAwesomeIcon className='text-2xl font-bold text-main-color' icon={faArrowRight} />)}
                    <div className='basis-1/2 h-full flex items-center justify-center'>
                        <input onChange={handleChangeFileInputChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
                        <label aria-label='업데이트할 프로필사진을 업로드해주세요.' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDragOver} onDrop={handleDrop} className={`overflow-hidden w-full h-full cursor-pointer flex flex-col items-center  justify-center ${!file && 'border-2 border-main-color border-dashed'}`} htmlFor="input-upload" >
                            {dragging && (
                                <div className='absolute inset-0 z-50 bg-sky-500/20 pointer-events-none' />
                            )}
                            {!file && (
                                <div className='p-3 mobile:p-6 flex flex-col items-center  justify-center pointer-events-none'>
                                    <FontAwesomeIcon className='text-hover-main-color p-5 text-4xl font-bold' icon={faImage} />
                                    <p className='text-main-color text-xs font-semibold text-center'>여기에 파일을 드롭하세요.</p>
                                </div>
                            )}
                            {file && (
                                <div className='w-full h-full flex flex-col items-center  justify-center '>
                                    <Avartar width={64} height={64} url={URL.createObjectURL(file)} name='local file' />
                                    {/* <img className='object-cover -full h-32' src={URL.createObjectURL(file)} alt='local file' sizes='650px' /> */}
                                </div>
                            )}
                        </label>
                    </div>
                </section>
                <button
                    type='submit'
                    className="relative w-full h-full mt-3 px-2 py-1 max-mobile:text-xs mobile:mt-6 mobile:px-4 mobile:py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out"
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