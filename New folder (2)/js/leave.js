// Navigate back to dashboard
document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

// Load logged in user
const loggedInEmail = localStorage.getItem("loggedInUserEmail");
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = users.find(u => u.email === loggedInEmail);

// Load existing leaves from localStorage
const leaveList = document.getElementById("leaveList");
let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

// Display leaves for current user
function displayLeaves() {
    leaveList.innerHTML = "";
    const userLeaves = leaves.filter(l => l.email === loggedInEmail);
    if (userLeaves.length === 0) {
        leaveList.innerHTML = "<li>No leave applications submitted yet.</li>";
    } else {
        userLeaves.forEach((l, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${l.leaveType} from ${l.fromDate} to ${l.toDate} - Reason: ${l.reason}`;
            leaveList.appendChild(li);
        });
    }
}
displayLeaves();

// Handle leave form submission
document.getElementById("leaveForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const leaveType = document.getElementById("leaveType").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const reason = document.getElementById("reason").value;

    if (!leaveType || !fromDate || !toDate || !reason) return alert("All fields are required!");

    // Save leave
    const leave = { email: loggedInEmail, leaveType, fromDate, toDate, reason };
    leaves.push(leave);
    localStorage.setItem("leaves", JSON.stringify(leaves));

    alert("Leave application submitted successfully!");
    document.getElementById("leaveForm").reset();
    displayLeaves();
});
