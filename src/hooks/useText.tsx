import { useState } from 'react';

const useText = (maxLength: number) => {
    const [text, setText] = useState('');

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textareaText = event.target.value;
        if (textareaText.length <= maxLength) {
            setText(textareaText);
        }
    }

    return { text, handleTextAreaChange };
}

export default useText;