const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "index.html";
}

function loadProfile() {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    if (!profiles[currentUser]) {
        profiles[currentUser] = {
            name: currentUser,
            role: "Bệnh nhân",
            email: `${currentUser}@gmail.com`,
            phone: "Chưa cập nhật",
            address: "Chưa cập nhật",
            patientId: "BN" + Math.floor(1000 + Math.random() * 9000),
            photo: "images/bs nu.jpg"
        };
        localStorage.setItem("profiles", JSON.stringify(profiles));
    }

    const profile = profiles[currentUser];

    document.getElementById("profileName").innerText = profile.name;
    document.getElementById("profileRole").innerText = profile.role;
    document.getElementById("profileEmail").innerText = profile.email;
    document.getElementById("phone").innerText = profile.phone;
    document.getElementById("address").innerText = profile.address;
    document.getElementById("patientId").innerText = profile.patientId;
    document.getElementById("profileImage").src = profile.photo || "images/bs nu.jpg";

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const count = bookings.filter(b => b.user === currentUser).length;
    document.getElementById("profileBookingCount").innerText = count;
}

function editInfo() {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    const profile = profiles[currentUser] || {};

    const phone = prompt("Nhập số điện thoại mới", profile.phone);
    const address = prompt("Nhập địa chỉ mới", profile.address);

    if (phone) {
        profile.phone = phone;
        document.getElementById("phone").innerText = phone;
    }

    if (address) {
        profile.address = address;
        document.getElementById("address").innerText = address;
    }

    profiles[currentUser] = profile;
    localStorage.setItem("profiles", JSON.stringify(profiles));

    alert("Cập nhật thông tin thành công");
}

function editName() {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    const profile = profiles[currentUser] || {};
    const newName = document.getElementById("nameInput").value.trim();

    if (newName) {
        profile.name = newName;
        document.getElementById("profileName").innerText = newName;
        profiles[currentUser] = profile;
        localStorage.setItem("profiles", JSON.stringify(profiles));
        alert("Cập nhật tên thành công");
        document.getElementById("nameInput").value = "";
    } else {
        alert("Vui lòng nhập tên");
    }
}

function uploadPhoto() {
    const fileInput = document.getElementById("photoInput");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64 = e.target.result;
            document.getElementById("profileImage").src = base64;
            const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
            const profile = profiles[currentUser] || {};
            profile.photo = base64;
            profiles[currentUser] = profile;
            localStorage.setItem("profiles", JSON.stringify(profiles));
            alert("Cập nhật ảnh thành công");
        };
        reader.readAsDataURL(file);
    } else {
        alert("Vui lòng chọn ảnh");
    }
}

function editPhone() {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    const profile = profiles[currentUser] || {};
    const newPhone = document.getElementById("phoneInput").value.trim();

    if (newPhone) {
        profile.phone = newPhone;
        document.getElementById("phone").innerText = newPhone;
        profiles[currentUser] = profile;
        localStorage.setItem("profiles", JSON.stringify(profiles));
        alert("Cập nhật số điện thoại thành công");
        document.getElementById("phoneInput").value = "";
    } else {
        alert("Vui lòng nhập số điện thoại");
    }
}

function editAddress() {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    const profile = profiles[currentUser] || {};
    const newAddress = document.getElementById("addressInput").value.trim();

    if (newAddress) {
        profile.address = newAddress;
        document.getElementById("address").innerText = newAddress;
        profiles[currentUser] = profile;
        localStorage.setItem("profiles", JSON.stringify(profiles));
        alert("Cập nhật địa chỉ thành công");
        document.getElementById("addressInput").value = "";
    } else {
        alert("Vui lòng nhập địa chỉ");
    }
}

function editEmail() {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    const profile = profiles[currentUser] || {};
    const newEmail = document.getElementById("emailInput").value.trim();

    if (newEmail) {
        profile.email = newEmail;
        document.getElementById("profileEmail").innerText = newEmail;
        profiles[currentUser] = profile;
        localStorage.setItem("profiles", JSON.stringify(profiles));
        alert("Cập nhật email thành công");
        document.getElementById("emailInput").value = "";
    } else {
        alert("Vui lòng nhập email");
    }
}

loadProfile();