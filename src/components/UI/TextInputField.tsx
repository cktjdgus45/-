import React from 'react';

const TextInputField = ({ placeholder = '', autoFocus = false, value = '', onChange, className = '' }) => (
    <textarea
        required
        autoFocus={autoFocus}
        name="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mb-4 w-full h-16 focus:outline-none resize-none ${className}`} // Adjust the height as needed
    />
);

export default TextInputField;
