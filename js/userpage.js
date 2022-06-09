window.onload = () => {
    const logoutButton = document.getElementById('logout-btn');
    const updateForm = document.getElementById('update-user-form');
    const deleteButton = document.getElementById('delete-user');

    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        logout();

        request.onerror = () => {
            alert('No internet connection.');
        };
    });

    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        formValues.user_id = localStorage.getItem('user_id');

        request = createRequest('editAccount', 'PATCH', JSON.stringify(formValues), true);

        request.onload = () => {
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                logout();
            }
        };

        request.onerror = () => {
            alert('No internet connection.');
        };
    });

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('user_id');
        const params = {
            user_id: userId,
        };
        const request = createRequest('deleteAccount', 'DELETE', JSON.stringify(params), true);

        request.onload = () => {
            if (request.status !== 200) {
                alert(request.responseText);
            } else {
                logout();
            }
        };

        request.onerror = () => {
            alert('No internet connection.');
        };
    });
};
