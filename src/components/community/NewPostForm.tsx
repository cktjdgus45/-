import React, { useState } from 'react';
import PostService from '../../service/post';

interface INewPostFormProps {
    postService: PostService;
    onError: (error: any) => void;
    setAddPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPostForm = ({ postService, onError, setAddPostForm }: INewPostFormProps) => {
    const [text, setText] = useState('');
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        postService.postPost(text).then((created) => {
            console.log(created);
            setText('');
        })
            .catch(onError);
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input required autoFocus type="text" placeholder='text 입력' value={text} onChange={onChange} />
                <button type='submit'>Post</button>
            </form>
        </>
    )
}

export default NewPostForm;