import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import page from 'page';

export default function initManagerSettings() {
  const container = document.getElementById("dashboardContainer");
  const backBtn = document.getElementById("backBtn");
  if (!container) return;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    page("/login");
    return;
  }

  container.innerHTML = `
    <div class="p-3">
      <div class="d-flex align-items-center mb-4">
        <button class="btn btn-outline-secondary me-2" id="goBackBtn">رجوع</button>
        <h2 class="m-0 text-center flex-grow-1">إعدادات الحساب</h2>
      </div>

      <form id="settingsForm" class="card p-4 shadow-sm">
        <div class="mb-3">
          <label class="form-label">الاسم الكامل</label>
          <input type="text" class="form-control" id="fullnameInput" value="${user.fullname}">
        </div>

        <div class="mb-3">
          <label class="form-label">كلمة المرور</label>
          <div class="input-group">
            <input type="password" class="form-control" id="passwordInput" value="${user.password}">
            <button type="button" class="btn btn-outline-secondary" id="togglePasswordBtn">اظهار</button>
          </div>
        </div>

        ${user.section ? `
        <div class="mb-3">
          <label class="form-label">القسم</label>
          <input type="text" class="form-control" id="sectionInput" value="${user.section}">
        </div>` : ""}

        <div class="mt-4 d-flex justify-content-between">
          <button type="submit" class="btn btn-success">حفظ التعديلات</button>
          <button type="button" class="btn btn-danger" id="logoutBtn">تسجيل خروج</button>
        </div>
      </form>
    </div>
  `;

  const goBackBtn = document.getElementById("goBackBtn");
  goBackBtn.onclick = () => page("/admin_dashboard");

  const passwordInput = document.getElementById("passwordInput");
  const toggleBtn = document.getElementById("togglePasswordBtn");
  toggleBtn.onclick = () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleBtn.textContent = "اخفاء";
    } else {
      passwordInput.type = "password";
      toggleBtn.textContent = "اظهار";
    }
  };

  const form = document.getElementById("settingsForm");
  form.onsubmit = (e) => {
    e.preventDefault();
    user.fullname = document.getElementById("fullnameInput").value;
    user.password = document.getElementById("passwordInput").value;
    if (user.section) user.section = document.getElementById("sectionInput").value;

    localStorage.setItem("user", JSON.stringify(user));
    alert("تم تحديث بياناتك ");
  };

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("user");
    page("/login");
  };
}
