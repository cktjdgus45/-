import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import FileUploadLabel from './FileUploadLabel.tsx';
import Avartar from './Avartar.tsx';

const ImageInputField = ({ file, post, handleChangeFileInputChange, dragging, handleDrag, handleDragOver, handleDrop }) => {
    return (
        <div className='flex flex-col items-center gap-2'>
            <div className='basis-1/2 h-full flex items-center justify-center'>
                <Avartar width={64} height={64} url={post.fileUrl ?? ""} name='profile_image' />
            </div>
            {file && (<FontAwesomeIcon className='text-2xl font-bold text-main-color' icon={faArrowDown} />)}
            <div className='basis-1/2 h-full flex items-center justify-center'>
                <input onChange={handleChangeFileInputChange} type="file" name="file" id="input-upload" accept='image/*' className='hidden' />
                <FileUploadLabel file={file} dragging={dragging} handleDrag={handleDrag} handleDragOver={handleDragOver} handleDrop={handleDrop} />
            </div>
        </div>
    )
}

export default ImageInputField;