import { ChangeEvent, DragEvent, useState } from 'react';

const useFileUpload = () => {
    const [file, setFile] = useState<File>();
    const handleChangeFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };
    const handleDragFileLabelChange = (event: DragEvent<HTMLLabelElement>) => {
        const files = event.dataTransfer.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };
    return { file, handleChangeFileInputChange, handleDragFileLabelChange };
}

export default useFileUpload;