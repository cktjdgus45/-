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
        // const response = await fetch(`${this.baseURL}/posts${query}`, { //중복
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' }
        // });
        // const data = await response.json();
        // if (response.status !== 200) {
        //     throw new Error(data.message);
        // }
        // return data;
    }

    async postPost(text) {
        return this.http.fetch(`/posts`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ text })
        })
        // const response = await fetch(`${this.baseURL}/posts`, { //중복
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ text, username: 'popo', name: 'popo' })
        // });
        // const data = await response.json();
        // if (response.status !== 201) {
        //     throw new Error(data.message);
        // }
        // return data;
    }

    async deletePost(postId) {
        return this.http.fetch(`/posts/${postId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        })
        // const response = await fetch(`${this.baseURL}/posts/${postId}`, {
        //     method: 'DELETE',
        //     headers: { 'Content-Type': 'application/json' }
        // });
        // const data = await response.json();
        // if (response.status !== 204) {
        //     throw new Error(data.message);
        // }
    }

    async updateTweet(postId, text) {
        return this.http.fetch(`/posts/${postId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ text }),
        })
        // const response = await fetch(`${this.baseURL}/posts/${postId}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ text })
        // });
        // const data = await response.json();
        // if (response.status !== 200) {
        //     throw new Error(data.message);
        // }
        // return data;
    }
    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        }
    }
}