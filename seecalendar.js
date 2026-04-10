function loadData() {
    let list = JSON.parse(localStorage.getItem("appointments")) || [];
    let table = document.getElementById("tableData");

    table.innerHTML = "";

    // Nếu không có dữ liệu
    if (list.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">Chưa có lịch khám nào</td>
            </tr>
        `;
        return;
    }

    // Hiển thị dữ liệu
    list.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.name || ""}</td>
                <td>${item.phone || ""}</td>
                <td>${item.date || ""}</td>
                <td>${item.note || ""}</td>
                <td>
                    <button onclick="deleteItem(${index})">Xóa</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Xóa có xác nhận
function deleteItem(index) {
    let list = JSON.parse(localStorage.getItem("appointments")) || [];

    if (confirm("Bạn có chắc muốn xóa lịch này không?")) {
        list.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(list));
        loadData();
    }
}

// Quay về trang chủ (đúng file của bạn)
function goHome() {
    window.location.href = "home.html";
}

// Load khi mở trang
window.onload = loadData;