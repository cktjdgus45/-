import React, { createContext, useContext } from 'react';
import PostService from '../service/post';

export const PostServiceContext = createContext({} as PostService);


interface IPostServiceProvider {
    postService: PostService;
    children: React.ReactNode;
}

export const PostServiceProvider = ({ postService, children }: IPostServiceProvider) => {
    return (
        <PostServiceContext.Provider value={postService}>
            {children}
        </PostServiceContext.Provider>
    )
}

export default PostServiceContext;
export const usePostService = (): PostService => useContext(PostServiceContext);