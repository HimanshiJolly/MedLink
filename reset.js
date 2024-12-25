function validatePasswords() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword !== confirmPassword) {
        document.getElementById('error-message').style.display = 'block';
        return false; // Prevent form submission
    }
    
    document.getElementById('error-message').style.display = 'none';
    return true; // Allow form submission
}

document.querySelector('.reset-password-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    
    fetch('/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'new-password': newPassword,
            'confirm-password': confirmPassword,
        }),
    })
    .then(response => {
        if (response.redirected) {
            // Redirect to the login page
            window.location.href = response.url;
        } else {
            return response.text().then(text => {
                alert(text); // Show error message
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
