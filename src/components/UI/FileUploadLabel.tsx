import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const FileUploadLabel = ({ file, dragging, handleDrag, handleDragOver, handleDrop, handleChangeFileInputChange }) => {
    return (
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
                <div className='relative w-full h-full aspect-square'>
                    <img className='object-cover w-full h-full' src={URL.createObjectURL(file)} alt='local file' sizes='650px' />
                </div>
            )}
        </label>
    )
}

export default FileUploadLabel;