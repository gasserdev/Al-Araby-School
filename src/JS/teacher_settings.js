import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/CSS/global.css';

export default function initTeacherSettings() {
  const container = document.getElementById("teacher-settings");
  if (!container) return;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "teacher") {
    window.location.href = "/";
    return;
  }

  async function loadTeacherData() {
    try {
      const res = await axios.get(
        "https://raw.githubusercontent.com/gasserdev/Al-Araby-DB-test/refs/heads/main/users.json"
      );

      const teacher = res.data.find(
        (u) =>
          u.role === "teacher" &&
          (u.fullname === user.fullname || u.id === user.id)
      );

      if (!teacher) {
        container.innerHTML = "<div class='alert alert-danger text-center'> لم يتم العثور على بيانات المدرس.</div>";
        return;
      }

      const classNames = teacher.classes
        ? teacher.classes.map((cls) => {
            if (typeof cls === "string") return cls;
            if (typeof cls === "object") return cls.name || cls.class || "غير معروف";
            return "غير معروف";
          })
        : [];

      const years = [
        ...new Set(
          classNames
            .map((cls) => {
              const match = cls.match(/^(\d)/);
              return match ? match[1] : null;
            })
            .filter(Boolean)
        ),
      ];

      container.innerHTML = `
        <div class="card shadow-lg mt-5 mx-auto" style="max-width: 500px;">
          <div class="card-body text-center">
            <h3 class="card-title mb-4 text-primary fw-bold"> إعدادات المدرس</h3>
            <p><strong>الاسم:</strong> ${teacher.fullname}</p>
            <p><strong>المادة:</strong> ${teacher.section || "غير معروف"}</p>
            <p><strong>الفصول:</strong> ${
              classNames.length ? classNames.join(", ") : "غير معروف"
            }</p>
            <p><strong>السنين التي يدرّسها:</strong> ${
              years.length ? years.map((y) => "الصف " + y).join(", ") : "غير معروفة"
            }</p>

            <div class="d-flex justify-content-center gap-2 mt-4 flex-wrap">
              <button id="logout-btn" class="btn btn-outline-primary"> تسجيل خروج</button>
              <button id="delete-btn" class="btn btn-outline-danger">حذف الحساب</button>
            </div>

            <button id="back-btn" class="btn btn-secondary mt-4 w-100">⬅ الرجوع</button>
          </div>
        </div>
      `;

      document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "/";
      });

      document.getElementById("delete-btn").addEventListener("click", () => {
        alert("ميزة حذف الحساب غير مفعّلة حالياً ");
      });

      document.getElementById("back-btn").addEventListener("click", () => {
        window.location.href = "/teacher_dashboard";
      });
    } catch (err) {
      container.innerHTML = `
        <div class="alert alert-warning text-center mt-5">
          حدث خطأ أثناء تحميل البيانات.
        </div>`;
      console.error(err);
    }
  }

  loadTeacherData();
}
