import React from 'react';
import { IPost } from '../../../types/index.ts';
import CommentContainerBox from '../comment/CommentContainerBox.tsx';
import CommentForm from '../comment/CommentForm.tsx';
import PostAuthorProfile from '../../UI/PostAuthorProfile.tsx';
import PostCardImage from '../../UI/PostCardImage.tsx';
import CommentInfo from '../../UI/CommentInfo.tsx';
import PostContent from '../../UI/PostContent.tsx';
import usePostCard from './../../../hooks/usePostCard.tsx';
import ConditionalRenderer from './../../UI/ConditionalRenderer.tsx';
interface IPostCardProps {
    post: IPost;
}

const PostCard = ({ post }: IPostCardProps) => {
    const { comments, isOpenCommentBox, setIsOpenCommentBox, goProfilePage, handleOpenCommentContainerBox } = usePostCard(post);
    const { text, createdAt, name, url, fileUrl } = post;
    return (
        <div className='w-1/2 h-full bg-white rounded-md shadow-md overflow-hidden'>
            <div className='flex flex-col'>
                <PostAuthorProfile url={url} name={name} createdAt={createdAt} onClick={goProfilePage} />
                <PostCardImage fileUrl={fileUrl} />
                <PostContent name={name} text={text} />
                <CommentInfo comments={comments} onClick={handleOpenCommentContainerBox} />
                <CommentForm postId={post.id} />
                <ConditionalRenderer condition={isOpenCommentBox}>
                    {() => <CommentContainerBox setIsOpenCommentBox={setIsOpenCommentBox} comments={comments} post={post} />}
                </ConditionalRenderer>
            </div>
        </div>
    )
}

export default PostCard;
