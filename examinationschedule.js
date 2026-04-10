function submitForm() {
    const nameEl = document.getElementById("name");
    const phoneEl = document.getElementById("phone");
    const dateEl = document.getElementById("date");
    const noteEl = document.getElementById("note");

    // LẤY SELECT AN TOÀN HƠN (tránh lỗi sai thứ tự)
    const serviceEl = document.getElementById("service");
    const timeEl = document.getElementById("time");

    let name = nameEl.value.trim();
    let phone = phoneEl.value.trim();
    let date = dateEl.value;
    let note = noteEl.value.trim();
    let service = serviceEl ? serviceEl.value : "";
    let time = timeEl ? timeEl.value : "";

    let valid = true;

    // RESET LỖI
    document.getElementById("errorName").innerText = "";
    document.getElementById("errorPhone").innerText = "";
    document.getElementById("errorDate").innerText = "";

    // ===== VALIDATE =====
    if (name.length < 2) {
        document.getElementById("errorName").innerText = "Tên phải ≥ 2 ký tự";
        valid = false;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById("errorPhone").innerText = "SĐT phải 10 số (bắt đầu bằng 0)";
        valid = false;
    }

    if (!date) {
        document.getElementById("errorDate").innerText = "Vui lòng chọn ngày";
        valid = false;
    } else {
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        let selectedDate = new Date(date);

        if (selectedDate < today) {
            document.getElementById("errorDate").innerText = "Không chọn ngày trong quá khứ";
            valid = false;
        }
    }

    // ===== LƯU =====
    if (valid) {
        let appointment = {
            id: Date.now(),
            name,
            phone,
            date,
            time,
            service,
            note
        };

        let list = JSON.parse(localStorage.getItem("appointments")) || [];
        list.push(appointment);

        localStorage.setItem("appointments", JSON.stringify(list));

        alert("Đặt lịch thành công!");

        // RESET FORM
        nameEl.value = "";
        phoneEl.value = "";
        dateEl.value = "";
        noteEl.value = "";
        if (serviceEl) serviceEl.selectedIndex = 0;
        if (timeEl) timeEl.selectedIndex = 0;

        // CHUYỂN TRANG
        window.location.href = "seecalendar.html";
    }
}

/* ===== NÚT QUAY LẠI ===== */
function goHome() {
    window.location.href = "home.html";
}