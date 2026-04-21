// ------------- LOGIN HANDLING ------------- //
document.addEventListener("DOMContentLoaded", () => {
    const loggedInEmail = localStorage.getItem("loggedInUserEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find logged-in user object
    const currentUser = users.find(u => u.email === loggedInEmail);

    // Update dashboard fields
    if (currentUser) {
        const nameField = document.getElementById("studentName");
        const emailField = document.getElementById("studentEmail");

        if (nameField) nameField.textContent = currentUser.name;
        if (emailField) emailField.textContent = currentUser.email;
    }

    // Load profile image if saved earlier
    const savedImage = localStorage.getItem("studentProfileImg");
    const previewImg = document.getElementById("studentImagePreview");
    if (savedImage && previewImg) {
        previewImg.src = savedImage;
    }
});


// ------------- IMAGE UPLOAD + PREVIEW ------------- //
const fileInput = document.getElementById("studentImage");
const previewImage = document.getElementById("studentImagePreview");

if (fileInput) {
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;

            // Store in localStorage so it remains on reload
            localStorage.setItem("studentProfileImg", e.target.result);
        };
        reader.readAsDataURL(file);
    });
}


// ------------- LOGOUT HANDLER ------------- //
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUserEmail");
        window.location.href = "login.html";
    });
}



// -------- MINI CALENDAR -------- //
function generateCalendar() {
    const calendar = document.getElementById("calendar");
    if (!calendar) return;

    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const firstDay = new Date(year, date.getMonth(), 1).getDay();
    const totalDays = new Date(year, date.getMonth() + 1, 0).getDate();

    calendar.innerHTML = `
        <div class="calendar-header">${month} ${year}</div>
        <div class="calendar-grid">
            <div class="calendar-day">Sun</div>
            <div class="calendar-day">Mon</div>
            <div class="calendar-day">Tue</div>
            <div class="calendar-day">Wed</div>
            <div class="calendar-day">Thu</div>
            <div class="calendar-day">Fri</div>
            <div class="calendar-day">Sat</div>
        </div>
    `;

    const grid = document.createElement("div");
    grid.classList.add("calendar-grid");

    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= totalDays; d++) {
        const today = d === date.getDate();
        grid.innerHTML += `<div class="calendar-date ${today ? "today" : ""}">${d}</div>`;
    }

    calendar.appendChild(grid);
}

document.addEventListener("DOMContentLoaded", generateCalendar);

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month = currentMonth, year = currentYear) {
    const calendar = document.getElementById("calendar");
    const monthYearLabel = document.getElementById("monthYear");
    if (!calendar) return;

    const date = new Date(year, month, 1);
    const monthName = date.toLocaleString("default", { month: "long" });
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Update month-year label
    monthYearLabel.textContent = `${monthName} ${year}`;

    // Build calendar grid
    calendar.innerHTML = `
        <div class="calendar-grid">
            <div class="calendar-day">Sun</div>
            <div class="calendar-day">Mon</div>
            <div class="calendar-day">Tue</div>
            <div class="calendar-day">Wed</div>
            <div class="calendar-day">Thu</div>
            <div class="calendar-day">Fri</div>
            <div class="calendar-day">Sat</div>
        </div>
    `;

    const grid = document.createElement("div");
    grid.classList.add("calendar-grid");

    // Empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    // Days
    for (let d = 1; d <= totalDays; d++) {
        const today = d === new Date().getDate() &&
                      month === new Date().getMonth() &&
                      year === new Date().getFullYear();
        grid.innerHTML += `<div class="calendar-date ${today ? "today" : ""}">${d}</div>`;
    }

    calendar.appendChild(grid);
}

// Event listeners for buttons
document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => generateCalendar());

// REMOVE PROFILE IMAGE
const removeBtn = document.getElementById("removeImage");
if (removeBtn) {
    removeBtn.addEventListener("click", () => {
        const previewImg = document.getElementById("studentImagePreview");
        const fileInput = document.getElementById("studentImage");

        // Reset image preview to default
        previewImg.src = "default avatar.webp";

        // Clear file input
        fileInput.value = "";

        // Remove saved image from localStorage if any
        localStorage.removeItem("studentProfileImg");
    });
}
