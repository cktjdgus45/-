import React from 'react';
import { useParams } from 'react-router-dom';
import { IPostServiceProps } from '../App';

const MyPosts = ({ postService }: IPostServiceProps) => {
    const { username } = useParams();
    console.log(username);
    return (
        <>myposts page</>
    )
}

export default MyPosts;