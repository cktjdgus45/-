import { AuthErrorEventBus } from '../context/AuthContext';

export default class HttpClient {
    baseURL: string;
    authErrorEventBus: AuthErrorEventBus;
    constructor(baseURL, authErrorEventBus) {
        this.baseURL = baseURL;
        this.authErrorEventBus = authErrorEventBus;
    }

    async fetch(url, options) {
        const { body, method, headers } = options;
        const response = await fetch(`${this.baseURL}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body
        })
        let data;
        try {
            data = await response.json();
        } catch (error) {
            console.error(error);
        }
        if (response.status > 299 || response.status < 200) {  //100,300,400,500 error
            const message = data && data.message ? data.message : 'Something wrong';
            const error = new Error(message);
            if (response.status === 401) {
                this.authErrorEventBus.notify(error);
                return;
            }
            throw error;
        }
        return data;
    }
}