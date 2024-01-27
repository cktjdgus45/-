import TokenStorage from '../db/token';
import HttpClient from '../network/http';
export default class PostService {
    http: HttpClient;
    tokenStorage: TokenStorage;
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

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

    async deletePost(postId) {
        return this.http.fetch(`/posts/${postId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        })
    }

    async updatePost(postId, text, file, existUrl) {
        const formData = new FormData();
        formData.append('text', text);
        if (file) {
            formData.append('file', file);
        } else {
            formData.append('existUrl', existUrl);
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