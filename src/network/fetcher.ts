import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then(res => res.data)

//use
// const additionalData = { text: 's' };
// const { data, error } = useSWR(['/api/data', formData],

export const postFetcher = async (url: string, formData: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    const data = await response.json();
    if (response.status !== 201) {
        throw new Error(data.message);
    }
    return data;
}
export const deleteFetcher = async (url: string) => {
    const response = await fetch(url, {
        method: 'DELETE',
    })
    const data = await response.json();
    if (response.status !== 204) {
        throw new Error(data.message);
    }
    return data;
}
export const putFetcher = async (url: string, formData: any) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.message);
    }
    return data;
}





