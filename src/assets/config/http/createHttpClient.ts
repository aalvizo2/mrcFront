import axios from "axios";


const createHttpClient= (API_BASE_URL: any) =>{
    const httpClient= axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return httpClient;
};

export default createHttpClient;


