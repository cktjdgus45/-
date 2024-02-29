import React from 'react';
import Loader from './Loader.tsx';

const SubmitButton = ({ text, loading }) => {
    return (
        <button
            type='submit'
            className="relative w-full text-sm mobile:text-base mt-3 mobile:mt-6 px-2  mobile:px-4 py-1  mobile:py-2 bg-main-color text-white rounded-md hover:bg-hover-main-color focus:outline-none transition-colors duration-300 ease-in-out"
        >
            {loading ? (<Loader kind='clip' isLoading={loading} color='#fff' />) : (
                <span>{text}</span>
            )}
        </button>
    )
}


export default SubmitButton;
