function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Get all registered users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Incorrect email or password!");
    }
}
