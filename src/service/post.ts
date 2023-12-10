export default class PostService {
    baseURL: string;
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async getPosts(username) {
        const query = username ? `?username=${username}` : '';
        const response = await fetch(`${this.baseURL}/posts${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }

    async postPost(text) {
        const response = await fetch(`${this.baseURL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, username: 'popo', name: 'popo' })
        });
        const data = await response.json();
        if (response.status !== 201) {
            throw new Error(data.message);
        }
        return data;
    }

    async deletePost(tweetId) {
        const response = await fetch(`${this.baseURL}/posts/${tweetId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (response.status !== 204) {
            throw new Error(data.message);
        }
    }

    async updateTweet(tweetId, text) {
        const response = await fetch(`${this.baseURL}/posts/${tweetId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }
}