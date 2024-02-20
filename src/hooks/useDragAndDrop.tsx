import { useState, DragEvent } from 'react';

interface IUseDragAndDrop {
    onDrop: (event: DragEvent<HTMLLabelElement>) => void
}

const useDragAndDrop = ({ onDrop }: IUseDragAndDrop) => {
    const [dragging, setDragging] = useState(false);
    const handleDrag = (event: DragEvent<HTMLLabelElement>) => {
        if (event.type === 'dragenter') {
            setDragging(true);
        } else if (event.type === 'dragleave') {
            setDragging(false);
        }
    }
    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();

    }
    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragging(false);
        onDrop(event);
    }
    return { dragging, handleDrag, handleDragOver, handleDrop };
}

export default useDragAndDrop;