function createRequest(endpoint, method, params, requiresAuth) {
    const url = `http://127.0.0.1:5000/${endpoint}`;
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.setRequestHeader('Content-Type', 'application/json');
    if (requiresAuth) {
        request.setRequestHeader('Authorization', `Basic ${localStorage.getItem('api_key')}`);
    }
    request.send(params);

    return request;
}

function logout() {
    localStorage.removeItem('api_key');
    localStorage.removeItem('user_id');
    window.location = 'index.html';
}
