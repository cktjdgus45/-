export default class AddressService {
    baseURL: string;
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async getAddress(city) {
        const response = await fetch(`${this.baseURL}/address/${city}}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message);
        }
        return data;
    }
}