import axios from 'axios';

export const DefaultConection = () => {
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc
    2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW
    1laWRlbnRpZmllciI6IjZjMzIzNzNhLWFkMGEtNDZiZi05ZTQ2LWIwMjg4YTM5NWFlYiIs
    Imh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2Vt
    YWlsYWRkcmVzcyI6ImVkaWxzb250ZXN0ZUBlbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxz
    b2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiRWRpbHNvbiBUb3JyZXMi
    LCJleHAiOjE3NDUyODA3MDUsImlzcyI6Ik1pbmlDcm0iLCJhdWQiOiJNaW5pQ3JtVXNlcnMifQ.Wi
    0aG0416T6Ur-RPP4-yXX2s_193ASII7CFIJiXxSQQ`
    
    return axios.create({
        baseURL: 'http://localhost:5070/api',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    });
}
