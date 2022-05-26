import axios from "axios";

const tokenUrl = 'api/identity/token';

function parseToken(token) {
    if (token) {
        const data = JSON.parse(atob(token.split(".")[1]));
        const valid = new Date() < new Date(data.exp * 1000);
        const value = token;
        return { data, valid, value };
    } else {
        return null;
    }
}

export function getToken() {
    const token = localStorage.getItem('token');
    return parseToken(token);
}

export async function refreshToken(token) {
    const login = token.data.email;
    const url = `${tokenUrl}?login=${login}`;
    try {
        const response = await axios.post(url);
        return parseToken(response.data);
    } catch {
        return null;
    }
}

export default {
    getToken,
    refreshToken
}
