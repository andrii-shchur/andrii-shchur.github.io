window.onload = () => {
    const regForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    regForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        if (formValues.password !== formValues.cpassword) {
            alert('passwords should match');
            return;
        }
        delete formValues.cpassword;
        const auth = btoa(`${formValues.username}:${formValues.password}`);

        const request = createRequest('createAccount', 'POST', JSON.stringify(formValues), false);

        request.onload = () => {
            let response;
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                response = JSON.parse(request.response);
                localStorage.setItem('api_key', auth);
                localStorage.setItem('user_id', response.user_id);
                if (response.atype === 'admin') {
                    window.location = 'adminpage.html';
                } else {
                    window.location = 'userpage.html';
                }
            }
        };

        request.onerror = () => {
            alert('No internet connection.');
        };
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        const auth = btoa(`${formValues.username}:${formValues.password}`);

        const request = createRequest('loginAccount', 'POST', JSON.stringify(formValues), false);
        request.onload = () => {
            let response;
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                response = JSON.parse(request.response);
                localStorage.setItem('api_key', auth);
                localStorage.setItem('user_id', response.user_id);
                if (response.atype === 'admin') {
                    window.location = 'adminpage.html';
                } else {
                    window.location = 'userpage.html';
                }
            }
        };

        request.onerror = () => {
            alert('No internet connection.');
        };
    });
};
