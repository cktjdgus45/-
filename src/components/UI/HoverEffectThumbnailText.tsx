import React from 'react';

interface IHoverEffectThumbnailTextProps {
    text: string;
    isHovered: boolean;
}

const HoverEffectThumbnailText = ({ text, isHovered }: IHoverEffectThumbnailTextProps) => {
    const title = text.slice(0, 8);
    return (
        <div
            className={`dropdown-menu ${isHovered ? 'dropdown-menu active' : 'dropdown-menu'} absolute inset-0 bg-glass opacity-0 transition-opacity flex justify-center items-center`}
        >
            <h2 className='text-white font-bold text-sm'>{title}</h2>
        </div>
    )
}


export default HoverEffectThumbnailText;