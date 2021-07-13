export default function authHeader() {
    const store = JSON.parse(localStorage.getItem('store'));

    if (store && store.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': store.accessToken };
    } else {
        return {};
    }
}