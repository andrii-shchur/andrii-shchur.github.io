window.onload = () => {
    const logoutButton = document.getElementById('logout-btn');
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
};
