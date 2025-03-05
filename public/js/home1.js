function updateNavbar() {
    const queryParams = new URLSearchParams(window.location.search);
    const isLoggedIn = queryParams.get('loggedIn') === 'true';
    const username = queryParams.get('username');
    console.log(username);
    console.log(isLoggedIn);

    const loginElement = document.getElementById('login');
    const userInfoElement = document.getElementById('user-info');
    const usernameSpan = document.getElementById('username');
    const logoutButton = document.getElementById('logout-btn');

    if (isLoggedIn) {
        usernameSpan.textContent = username;
        userInfoElement.style.display = 'inline-block';
        loginElement.style.display = 'none';

        logoutButton.addEventListener('click', handleLogout);

    } else {
        userInfoElement.style.display = 'none';
        loginElement.style.display = 'inline-block';

        logoutButton.removeEventListener('click', handleLogout);
    }
}

function handleLogout() {
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
    updateNavbar();
    window.location.href = "/login";
}

document.addEventListener('DOMContentLoaded', updateNavbar);