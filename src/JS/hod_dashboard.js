import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import axios from 'axios';

export default async function initHODDashboard() {
  const API_URL = "https://raw.githubusercontent.com/gasserdev/Al-Araby-DB-test/refs/heads/main/users.json";
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.isHOD) {
    document.body.innerHTML = `
      <h2 class='text-center mt-5 text-danger'>
        لا تملك صلاحية الوصول إلى لوحة رئيس القسم.
      </h2>
      <div class="text-center mt-3">
        <button class="btn btn-outline-primary" id="goToTeacher">الذهاب إلى لوحة المدرس</button>
      </div>
    `;
    document.getElementById("goToTeacher").addEventListener("click", () => {
      window.location.href = "/teacher_dashboard";
    });
    return;
  }

  // إنشاء الشريط العلوي
  if (!document.querySelector(".hod-topbar")) {
    const topBar = document.createElement("div");
    topBar.className = "hod-topbar d-flex justify-content-between align-items-center p-3 bg-light border-bottom sticky-top";
    topBar.innerHTML = `
      <h4 class="m-0 fw-bold text-primary">لوحة رئيس القسم</h4>
      <button id="backToTeacher" class="btn btn-outline-secondary">
         العودة إلى لوحة المدرس
      </button>
    `;
    document.body.prepend(topBar);

    document.getElementById("backToTeacher").addEventListener("click", () => {
      window.location.href = "/teacher_dashboard";
    });
  }

  const yearsContainer = document.getElementById("yearsContainer");
  const detailsContainer = document.getElementById("detailsContainer");

  try {
    const { data } = await axios.get(API_URL);
    const sectionData = data.filter(u => u.section === user.section);
    const years = [...new Set(sectionData.filter(u => u.year).map(u => u.year))];

    yearsContainer.innerHTML = `
      <div class="d-flex flex-wrap gap-2">
        ${years.map(y => `<button class="btn btn-outline-primary" data-year="${y}">${y}</button>`).join("")}
      </div>
    `;

    yearsContainer.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => showYear(btn.dataset.year, sectionData));
    });

  } catch (error) {
    yearsContainer.innerHTML = "<p class='text-danger'>فشل تحميل البيانات.</p>";
    console.error(error);
  }

  function showYear(year, sectionData) {
    detailsContainer.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h5 class="mb-0">${year}</h5>
          <div>
            <button class="btn btn-light me-2" id="showTeachersBtn">عرض المدرسين</button>
            <button class="btn btn-light" id="showStudentsBtn">عرض الطلاب</button>
          </div>
        </div>
        <div class="card-body" id="yearContent">اختر عرض المدرسين أو الطلاب</div>
      </div>
    `;

    document.getElementById("showTeachersBtn").onclick = () => showTeachers(year, sectionData);
    document.getElementById("showStudentsBtn").onclick = () => showStudents(year, sectionData);
  }

  function showTeachers(year, sectionData) {
    const teachers = sectionData.filter(u => u.role === "teacher" && u.classes?.some(c => c.year === year));
    const container = document.getElementById("yearContent");

    if (!teachers.length) {
      container.innerHTML = "<p>لا يوجد مدرسين لهذه السنة الدراسية.</p>";
      return;
    }

    container.innerHTML = teachers.map(t => `
      <div class="border rounded p-3 mb-3 shadow-sm bg-light">
        <p><strong>${t.fullname}</strong></p>
        <p>الفصول: ${t.classes.map(c => c.name).join(", ")}</p>
        <button class="btn btn-sm btn-outline-success" onclick="rateTeacher('${t.fullname}')">
          تقييم المدرس
        </button>
      </div>
    `).join("");
  }

  function showStudents(year, sectionData) {
    const students = sectionData.filter(u => u.role === "student" && u.year === year);
    const container = document.getElementById("yearContent");

    const classes = [...new Set(students.map(s => s.class))];
    if (!classes.length) {
      container.innerHTML = "<p>لا يوجد طلاب في هذه السنة.</p>";
      return;
    }

    container.innerHTML = `
      <h5>اختر الفصل:</h5>
      <div class="d-flex flex-wrap gap-2 mb-3">
        ${classes.map(c => `<button class="btn btn-outline-primary" data-class="${c}">${c}</button>`).join("")}
      </div>
      <div id="classStudents"></div>
    `;

    container.querySelectorAll("[data-class]").forEach(btn => {
      btn.addEventListener("click", () => showClassStudents(year, btn.dataset.class));
    });
  }

  async function showClassStudents(year, cls) {
    const { data } = await axios.get(API_URL);
    const students = data.filter(u => u.role === "student" && u.year === year && u.class === cls);
    const container = document.getElementById("classStudents");

    if (!students.length) {
      container.innerHTML = "<p>لا يوجد طلاب في هذا الفصل.</p>";
      return;
    }

    container.innerHTML = students.map(s => `
      <div class="border rounded p-3 mb-3 shadow-sm bg-white">
        <p><strong>${s.fullname}</strong></p>
        <ul>${Object.entries(s.grades || {}).map(([subj, grade]) => `<li>${subj}: ${grade}</li>`).join("")}</ul>
        <button class="btn btn-sm ${localStorage.getItem("banned_" + s.id) ? "btn-success" : "btn-danger"}"
          onclick="toggleBan('${s.id}')">
          ${localStorage.getItem("banned_" + s.id) ? "مسموح بالتعيين" : "ممنوع من التعيين"}
        </button>
      </div>
    `).join("");
  }

  window.rateTeacher = function (teacherName) {
    const rating = prompt(`كم تقييمك للمدرس ${teacherName} من 5؟`);
    if (rating && !isNaN(rating) && rating > 0 && rating <= 5) {
      alert(`تم تسجيل تقييم ${rating}/5 للمدرس ${teacherName}`);
    } else {
      alert("تقييم غير صالح!");
    }
  };

  window.toggleBan = function (studentId) {
    const key = "banned_" + studentId;
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      alert("تم السماح بالتعيين لهذا الطالب.");
    } else {
      localStorage.setItem(key, "true");
      alert("تم منعه من التعيين.");
    }
    window.location.reload();
  };
}

initHODDashboard();
