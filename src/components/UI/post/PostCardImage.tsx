import React from 'react';

interface IVPostCardImage {
    fileUrl: string;
}

const PostCardImage = ({ fileUrl }: IVPostCardImage) => {
    return (
        <div className="w-full h-full relative overflow-hidden">
            <img className='object-cover w-full h-full' src={fileUrl} alt="post_image" />
        </div>
    )
}

export default PostCardImage;