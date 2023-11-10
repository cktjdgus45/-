import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then(res => res.data);


// export const fetcher2 = (url: string) => {

//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: url,
//         headers: {}
//     };
//     return axios.request(config)
//         .then((response) => {
//             console.log(JSON.stringify(response.data));
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }
