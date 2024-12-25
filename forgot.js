document.getElementById('forgotForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;

    fetch('/forgot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email })
    })
    .then(response => response.text())
    .then(data => {
        if (data.redirected) {
            window.location.href = '/reset';
        } 
        else {
            document.getElementById('message').innerText = data;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    });
});
