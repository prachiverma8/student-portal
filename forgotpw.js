function resetPassword() {
    let enteredEmail = document.getElementById("resetEmail").value;
    let newPass = document.getElementById("newPassword").value;
    let confirmPass = document.getElementById("confirmPassword").value;

    // Load users array from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with matching email
    let userIndex = users.findIndex(u => u.email === enteredEmail);

    if (userIndex === -1) {
        alert("Email not found!");
        return;
    }

    if (newPass === "" || confirmPass === "") {
        alert("Password fields cannot be empty!");
        return;
    }

    if (newPass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    // Update password
    users[userIndex].password = newPass;

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Password reset successfully!");
    window.location.href = "index.html";
}
