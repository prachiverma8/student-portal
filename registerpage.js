function register() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // --- Validation ---
    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // --- Get existing users list ---
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // --- Check if email is already registered ---
    let existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("This email is already registered.");
        return;
    }

    // --- Create new user object ---
    let newUser = {
        name: name,
        email: email,
        password: password
    };

    // --- Save user into array ---
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "index.html";   // redirect to login page
}
