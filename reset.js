// Validate Passwords
function validatePasswords() {
    const newPasswordField = document.getElementById("new-password");
    const confirmPasswordField = document.getElementById("confirm-password");
    const errorMessage = document.getElementById("error-message");

    const newPassword = newPasswordField.value.trim();
    const confirmPassword = confirmPasswordField.value.trim();

    // Clear any previous error messages
    errorMessage.style.display = "none";
    errorMessage.textContent = "";

    // Check if the fields are empty
    if (!newPassword || !confirmPassword) {
        errorMessage.textContent = "Both password fields are required.";
        errorMessage.style.display = "block";
        return false; // Prevent form submission
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.style.display = "block";
        return false; // Prevent form submission
    }

    // Validation passed
    return true;
}

// Handle Form Submission
document.querySelector(".reset-password-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Perform password validation
    if (!validatePasswords()) {
        return; // Stop further execution if validation fails
    }

    // Fetch request if validation is successful
    const newPassword = document.getElementById("new-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    fetch("/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            email: document.getElementById("email").value.trim(), // Ensure email is passed
            "new-password": newPassword,
            "confirm-password": confirmPassword,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.text().then((text) => {
                    alert(text);
                    window.location.href = "/login";
                });
            } else {
                return response.text().then((text) => {
                    alert(`Error: ${text}`);
                });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
        });
});
