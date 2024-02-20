import { useState } from 'react';

const useText = (maxLength: number) => {
    const [text, setText] = useState('');

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textareaText = event.target.value;
        if (textareaText.length <= maxLength) {
            setText(textareaText);
        }
    }
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const textareaText = event.target.value;
        if (textareaText.length <= maxLength) {
            setText(textareaText);
        }
    }

    return { text, handleTextChange, handleTextAreaChange };
}

export default useText;