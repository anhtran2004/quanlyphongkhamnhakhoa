// CHECK LOGIN
let user = localStorage.getItem("currentUser");

if (!user) {
    window.location.href = "index.html";
}

// LOAD DATA
function loadData() {
    let list = JSON.parse(localStorage.getItem("appointments")) || [];
    let table = document.getElementById("data");

    table.innerHTML = "";

    // lọc theo user
    let userList = list.filter(item => item.user === user);

    userList.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.phone}</td>
                <td>${item.date}</td>
                <td>${item.createdAt}</td>
                <td>${item.status}</td>
                <td>
                    <button class="btn-cancel" onclick="cancel(${item.id})">Hủy</button>
                    <button class="btn-delete" onclick="deleteItem(${item.id})">Xóa</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// HỦY LỊCH
function cancel(id) {
    let list = JSON.parse(localStorage.getItem("appointments")) || [];

    list = list.map(item => {
        if (item.id === id) {
            item.status = "Đã hủy";
        }
        return item;
    });

    localStorage.setItem("appointments", JSON.stringify(list));
    loadData();
}

// XÓA
function deleteItem(id) {
    let list = JSON.parse(localStorage.getItem("appointments")) || [];

    list = list.filter(item => item.id !== id);

    localStorage.setItem("appointments", JSON.stringify(list));
    loadData();
}

// QUAY LẠI
function goHome() {
    window.location.href = "home.html";
}

window.onload = loadData;