import React from 'react';
import { IPost } from '../../../types/index.ts';
import CommentContainerBox from '../comment/CommentContainerBox.tsx';
import ConditionalRenderer from '../../../components/UI/ConditionalRenderer.tsx';
import PostContent from '../../../components/UI/post/PostContent.tsx';
import PostAuthorProfile from '../../../components/UI/post/PostAuthorProfile.tsx';
import CommentForm from '../comment/CommentForm.tsx';
import PostCardImage from '../../../components/UI/post/PostCardImage.tsx';
import CommentInfo from '../../../components/UI/comment/CommentInfo.tsx';
import usePostCard from '../../../hooks/components/post/usePostCard.tsx';

export interface IPostCardProps {
    post: IPost;
}

const PostCard = ({ post }: IPostCardProps) => {
    const { comments, isOpenCommentBox, setIsOpenCommentBox, goProfilePage, handleOpenCommentContainerBox } = usePostCard(post);
    const { text, createdAt, name, url, fileUrl } = post;
    return (
        <section className='w-1/2 h-full bg-white rounded-md shadow-md overflow-hidden'>
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
        </section>
    )
}

export default PostCard;
