import TokenStorage from '../db/token.ts';
import HttpClient from '../network/http.ts';
export default class PostService {
    http: HttpClient;
    tokenStorage: TokenStorage;
    // static instance: PostService;
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }
    //singleton pattern
    // public static getInstance(): PostService {
    //     if (!PostService.instance) {
    //         const url = process.env.REACT_APP_SERVER_BASE_URL;
    //         const authErrorEventBus = new AuthErrorEventBus();
    //         const serverErrorEventBus = new ServerErrorEventBus();
    //         const httpClient = new HttpClient(url, authErrorEventBus, serverErrorEventBus);
    //         const tokenService = new TokenStorage();
    //         PostService.instance = new PostService(httpClient, tokenService);
    //     }
    //     return PostService.instance;
    // }

    async getPosts(username?: string) {
        const query = username ? `?username=${username}` : '';
        return this.http.fetch(`/posts${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        })
    }

    async postPost(text, file) {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('file', file);
        return this.http.fetch(`/posts`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: formData,
            multipart: true
        })
    }
    async postComment(text, postId) {
        return this.http.fetch(`/posts/${postId}/comments`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ text }),
            multipart: false
        })
    }

    async deletePost(postId) {
        return this.http.fetch(`/posts/${postId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        })
    }

    async updatePost(postId, text, fileOrExistUrl) {
        const formData = new FormData();
        formData.append('text', text);
        if (fileOrExistUrl instanceof File) {
            formData.append('file', fileOrExistUrl);
        } else { // Assume it's an existing URL
            formData.append('existUrl', fileOrExistUrl);
        }
        return this.http.fetch(`/posts/${postId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: formData,
            multipart: true
        })
    }
    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        }
    }
}