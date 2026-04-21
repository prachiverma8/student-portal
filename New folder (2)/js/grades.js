// Navigate back to dashboard
document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

// Get logged-in user
const loggedInEmail = localStorage.getItem("loggedInUserEmail");
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = users.find(u => u.email === loggedInEmail);

// Sample grades for multiple semesters (5 subjects each)
const grades = [
    { email: loggedInEmail, semester: "1", subject: "Mathematics I", grade: "A" },
    { email: loggedInEmail, semester: "1", subject: "Physics", grade: "B+" },
    { email: loggedInEmail, semester: "1", subject: "Chemistry", grade: "A-" },
    { email: loggedInEmail, semester: "1", subject: "English", grade: "B" },
    { email: loggedInEmail, semester: "1", subject: "Computer Fundamentals", grade: "A" },

    { email: loggedInEmail, semester: "2", subject: "Mathematics II", grade: "A-" },
    { email: loggedInEmail, semester: "2", subject: "Data Structures", grade: "A" },
    { email: loggedInEmail, semester: "2", subject: "DBMS", grade: "B+" },
    { email: loggedInEmail, semester: "2", subject: "Digital Logic", grade: "B" },
    { email: loggedInEmail, semester: "2", subject: "Environmental Science", grade: "A" },

    { email: loggedInEmail, semester: "3", subject: "Operating Systems", grade: "A" },
    { email: loggedInEmail, semester: "3", subject: "AI Basics", grade: "A" },
    { email: loggedInEmail, semester: "3", subject: "Computer Networks", grade: "B+" },
    { email: loggedInEmail, semester: "3", subject: "Database Design", grade: "A-" },
    { email: loggedInEmail, semester: "3", subject: "Software Engineering", grade: "B+" },

    { email: loggedInEmail, semester: "4", subject: "Web Development", grade: "A" },
    { email: loggedInEmail, semester: "4", subject: "Compiler Design", grade: "B+" },
    { email: loggedInEmail, semester: "4", subject: "Machine Learning", grade: "A-" },
    { email: loggedInEmail, semester: "4", subject: "Microprocessors", grade: "B" },
    { email: loggedInEmail, semester: "4", subject: "Statistics", grade: "A" },

    { email: loggedInEmail, semester: "5", subject: "Data Mining", grade: "A-" },
    { email: loggedInEmail, semester: "5", subject: "Cloud Computing", grade: "A" },
    { email: loggedInEmail, semester: "5", subject: "Cyber Security", grade: "B+" },
    { email: loggedInEmail, semester: "5", subject: "Mobile App Development", grade: "B" },
    { email: loggedInEmail, semester: "5", subject: "Project Management", grade: "A" },
];

// Function to populate table for selected semester
function populateGrades(semester) {
    const tableBody = document.querySelector("#gradesTable tbody");
    tableBody.innerHTML = ""; // clear previous rows

    const userGrades = grades.filter(g => g.email === loggedInEmail && g.semester === semester);

    if (userGrades.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="2" style="text-align:center;">No grades available</td></tr>`;
        return;
    }

    userGrades.forEach(g => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${g.subject}</td>
            <td>${g.grade}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial population for semester 1
populateGrades("1");

// Handle semester selection
document.getElementById("semesterSelect").addEventListener("change", (e) => {
    populateGrades(e.target.value);
});
