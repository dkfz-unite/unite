export function parse(token) {
    if (token) {
        const data = JSON.parse(atob(token.split(".")[1]));
        const valid = new Date() < new Date(data.exp * 1000);
        const value = token;
        return { data, valid, value };
    } else {
        return null;
    }
}

export function get() {
    const token = localStorage.getItem('token');
    return parse(token);
}

export function set(token) {
    localStorage.setItem('token', token);
}

export function remove() {
    localStorage.removeItem('token');
}

export default {
    parse,
    get,
    set,
    remove
}