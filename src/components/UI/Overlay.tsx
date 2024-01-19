import React from 'react';

interface IOverlayProps {
    setForm: (value: React.SetStateAction<boolean>) => void;
    children: React.ReactNode;
}

const Overlay = ({ setForm, children }: IOverlayProps) => {

    const handleClose = () => {
        setForm(false);
    }
    return (
        <div onClick={handleClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
            {children}
        </div>
    )
}

export default Overlay;