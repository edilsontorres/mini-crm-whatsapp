import axios from 'axios';

export const DefaultConection = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: 'http://localhost:5070/api',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    });
}
