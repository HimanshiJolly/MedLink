function updateNavbar() {
    const loginElement = document.getElementById('login');
    const userInfoElement = document.getElementById('user-info');
    const usernameSpan = document.getElementById('name');
    const logoutButton = document.getElementById('logout-btn');

    fetch('/api/user')
        .then(response => response.json())
        .then(data => {
            const user = data.user; // Access the user object from the JSON response.
            if (user) {
                usernameSpan.textContent = user.name;
                userInfoElement.style.display = 'inline-block';
                loginElement.style.display = 'none';
                logoutButton.onclick = handleLogout;
            } else {
                userInfoElement.style.display = 'none';
                loginElement.style.display = 'inline-block';
                logoutButton.onclick = null;
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function handleLogout(event) {
    if (event) {
        event.preventDefault();
    }
    fetch('/api/logout')
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
                updateNavbar(); // Update navbar after logout.
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
}

document.addEventListener('DOMContentLoaded', updateNavbar);