import TokenStorage from '../db/token';
import HttpClient from '../network/http';

export default class AuthService {
    http: HttpClient;
    tokenStorage: TokenStorage;
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async signup(username, password, name, email, url) {
        const data = await this.http.fetch('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username, password, name, email, url
            })
        })
        this.tokenStorage.saveToken(data.token);
        return data;
    }
    async login(username, password) {
        const data = await this.http.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        })
        this.tokenStorage.saveToken(data.token); // response로 token을 받음.
        return data;
    }
    async update(username, file) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('file', file);
        const data = await this.http.fetch('/auth/me', {
            method: 'PUT',
            headers: this.getHeaders(),
            body: formData,
            multipart: true
        })
        this.tokenStorage.saveToken(data.token); // response로 token을 받음.
        return data;
    }
    async me() {
        return this.http.fetch('/auth/me', {
            method: 'GET',
            headers: this.getHeaders(),
        })
    }
    async logout() {
        this.tokenStorage.clearToken();
    }
    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        }
    }
}