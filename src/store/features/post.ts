import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IComment, IPost } from '../../types';

interface PostState {
    posts: IPost[];
}
const initialState: PostState = {
    posts: [],
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<IPost>) => {
            state.posts.unshift(action.payload);
        },
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            const parsePostComments = () => {
                const posts = action.payload.map(post => {
                    if (typeof post.comments === 'string') {
                        return {
                            ...post,
                            comments: JSON.parse(post.comments)
                        };
                    }
                    return post;
                });
                return posts;
            }
            state.posts = parsePostComments();
        },
        updatePost: (state, action: PayloadAction<IPost>) => {
            const updatedPost = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === updatedPost.id);
            if (postIndex !== -1) {
                state.posts.splice(postIndex, 1, updatedPost);
            }
        },
        deletePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        addComment: (state, action: PayloadAction<{ comments: IComment[], postId: number }>) => {
            const { comments, postId } = action.payload;
            const postIndex = state.posts.findIndex(post => post.id === postId);
            if (postIndex !== -1) {
                state.posts[postIndex].comments = comments;
            }
        }

    },

});
export const { addPost, deletePost, addComment, setPosts, updatePost } = postSlice.actions;

export default postSlice.reducer;
