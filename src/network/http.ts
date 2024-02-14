import { AuthErrorEventBus, ServerErrorEventBus } from '../context/AuthContext';

export default class HttpClient {
    baseURL: string;
    authErrorEventBus: AuthErrorEventBus;
    serverErrorEventBus: ServerErrorEventBus
    constructor(baseURL, authErrorEventBus, serverErrorEventBus) {
        this.baseURL = baseURL;
        this.authErrorEventBus = authErrorEventBus;
        this.serverErrorEventBus = serverErrorEventBus;
    }

    async fetch(url, options) {
        const { body, method, headers: headersOptions, multipart } = options;
        const headers = {
            ...headersOptions,
        };

        if (!multipart) {
            headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(`${this.baseURL}${url}`, {
            method,
            headers,
            body
        })
        let data;
        try {
            data = await response.json();
        } catch (error) {
            console.error(error);
        }
        if (response.status > 299 || response.status < 200) {  //100,300,400,500 error
            const message = data && data.message; //message response from server.
            const error = new Error(message);
            if (response.status === 401) { // only 401 notify. set global error.
                this.authErrorEventBus && this.authErrorEventBus.notify(message);
                return;
            } else {
                this.serverErrorEventBus && this.serverErrorEventBus.notify(message); // except 401 , every http api error.
            }
            throw error;
        }
        return data;
    }
}