import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';

export default function initSettings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user.fullname) {
    document.body.innerHTML = `<div class="container py-5 text-center">
      <h3 class="text-danger"> لم يتم تسجيل الدخول</h3>
    </div>`;
    return;
  }

  document.title = "إعدادات الحساب";

  const container = document.getElementById("settingsContainer");
  if (!container) {
    console.error("settingsContainer missing in HTML!");
    return;
  }

  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="m-0"> إعدادات الحساب</h4>
      <button id="backBtn" class="btn btn-outline-secondary btn-sm">
        ← رجوع
      </button>
    </div>

    <ul class="nav nav-tabs mb-3" id="settingsTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="tab-account" data-bs-toggle="tab" data-bs-target="#pane-account" type="button" role="tab">الحساب الشخصي</button>
      </li>
      <li class="nav-item ms-auto" role="presentation">
        <button class="nav-link" id="tab-logout" data-bs-toggle="tab" data-bs-target="#pane-logout" type="button" role="tab">تسجيل الخروج</button>
      </li>
    </ul>

    <div class="tab-content border rounded-bottom p-4 shadow-sm" style="min-height:250px">
      <div class="tab-pane fade show active" id="pane-account" role="tabpanel">
        <h5 class="mb-3">معلومات الحساب</h5>
        <ul class="list-group">
          <li class="list-group-item"><strong>الاسم الكامل:</strong> ${user.fullname}</li>
          <li class="list-group-item"><strong>الدور:</strong> ${user.role || "غير محدد"}</li>
          <li class="list-group-item"><strong>السنة الدراسية:</strong> ${user.school_year || user.year || "غير محددة"}</li>
          <li class="list-group-item"><strong>القسم:</strong> ${user.section || "غير محدد"}</li>
        </ul>
      </div>

      <div class="tab-pane fade" id="pane-logout" role="tabpanel">
        <h5 class="mb-3 text-danger">تسجيل الخروج</h5>
        <p>سيتم مسح بياناتك من المتصفح وإعادتك إلى صفحة تسجيل الدخول.</p>
        <button id="logoutBtn" class="btn btn-danger">تسجيل الخروج الآن</button>
      </div>
    </div>
  `;

  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "/hod_dashboard";
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("هل تريد تسجيل الخروج فعلًا؟")) {
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  });
}
