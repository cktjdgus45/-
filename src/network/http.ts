export default class HttpClient {
    baseURL: string;
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetch(url, options) {
        const response = await fetch(`${this.baseURL}${url}`, {
            ...options,
            headers: {
                'Cotent-Type': 'application/json',
                ...options.headers,
            },
        })
        let data;
        try {
            data = await response.json();
        } catch (error) {
            console.error(error);
        }
        if (response.status > 299 || response.status < 200) {  //100,300,400,500
            const message = data && data.message ? data.message : 'Something wrong';
            throw new Error(message);
        }
        return data;
    }
}