// ===== CHECK LOGIN =====
let user = localStorage.getItem("currentUser");

if (!user) {
    window.location.href = "index.html";
} else {
    let usernameEl = document.getElementById("username");
    if (usernameEl) {
        usernameEl.innerText = user;
    }
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// ===== MENU ẨN =====
function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("active");
    }
}

// click ra ngoài để đóng menu
document.addEventListener("click", function(e) {
    let sidebar = document.getElementById("sidebar");
    let menuBtn = document.querySelector(".menu-btn");

    if (!sidebar || !menuBtn) return;

    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove("active");
    }
});

// ===== POPUP ĐẶT LỊCH =====
function openBooking() {
    let modal = document.getElementById("bookingModal");
    if (modal) {
        modal.style.display = "block";
    }
}

function closeBooking() {
    let modal = document.getElementById("bookingModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// ===== ĐẶT LỊCH =====
function book() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let date = document.getElementById("date").value;

    if (!name || !phone || !date) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // kiểm tra số điện thoại
    if (!/^[0-9]{9,11}$/.test(phone)) {
        alert("Số điện thoại không hợp lệ!");
        return;
    }

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
        name: name,
        phone: phone,
        date: date,
        user: user
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Đặt lịch thành công!");

    // reset form
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("date").value = "";

    closeBooking();
}