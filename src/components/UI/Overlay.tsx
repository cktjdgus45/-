import React from 'react';

interface IOverlayProps {
    setForm: (value: React.SetStateAction<boolean>) => void;
    children: React.ReactNode;
}

const Overlay = ({ setForm, children }: IOverlayProps) => {
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('Overlay closed');
        setForm(prev => !prev);
    }
    return (
        <div onClick={handleClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
            <button
                type="button"
                className="absolute top-2 right-2 text-white hover:text-hover-main-color focus:outline-none"
                onClick={handleClose}
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            {children}
        </div>
    )
}

export default Overlay;