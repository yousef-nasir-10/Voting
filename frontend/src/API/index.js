import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios';
// export const apiBaseURL = 'http://localhost:2000/api/v1'
// export const apiBaseURL = 'http://voting-api.yousef-alsuwaileh.com:2000/api/v1'
export const apiBaseURL = 'https://voting-beryl-omega.vercel.app/api/v1'
export const GET = url => {
    return axios.get(`${apiBaseURL}/${url}`);
}

// if need for headers etc.

export const POST = (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            
        },
        data,
    });
}

export const PUT = (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            
        },
        data,
    });
}

export const PATCH = (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            
        },
        data,
    });
}


const token = localStorage.getItem('token')
export const myDecodedToken = decodeToken(token);
export const username =myDecodedToken &&  myDecodedToken.username
