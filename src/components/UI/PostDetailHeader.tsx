import React from 'react';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avartar from './Avartar.tsx';

const PostDetailHeader = ({ owner, ownerName, ownerUrl, username, toggleUpdateForm, handleDeleteClick }) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <Avartar width={32} height={32} name={ownerName} url={ownerUrl} />
                <h3 className='text-main-color text-sm font-bold'>{ownerName}</h3>
            </div>
            {owner === username && (
                <div className='flex  gap-2'>
                    <button onClick={toggleUpdateForm} className='text-base cursor-pointer text-main-color hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={handleDeleteClick} className='text-base cursor-pointer text-main-color hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default PostDetailHeader;