import React from 'react';

const TextInputField = ({ placeholder = '', autoFocus = false, value = '', onChange, className = '' }) => (
    <textarea
        aria-label='강아지에 대한 말을 적어주세요.'
        required
        autoFocus={autoFocus}
        name="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`text-sm mobile:text-base mb-4 w-full h-16 focus:outline-none resize-none ${className}`}
    />
);

export default TextInputField;
