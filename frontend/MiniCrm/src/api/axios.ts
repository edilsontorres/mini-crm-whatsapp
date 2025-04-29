import axios from 'axios';

export const DefaultConection = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZjMzIzNzNhLWFkMGEtNDZiZi05ZTQ2LWIwMjg4YTM5NWFlYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImVkaWxzb250ZXN0ZUBlbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRWRpbHNvbiBUb3JyZXMiLCJleHAiOjE3NDU4OTUwMDAsImlzcyI6Ik1pbmlDcm0iLCJhdWQiOiJNaW5pQ3JtVXNlcnMifQ.7IQWPhemWsvw1AR3l3nmQpYf5PUwumcfTby7FBt-smU"
    
    return axios.create({
        baseURL: 'http://localhost:5070/api',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    });
}
