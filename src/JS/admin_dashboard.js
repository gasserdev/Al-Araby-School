import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import '/src/CSS/create_account.css';
import axios from 'axios';
import page from 'page';

export default function initManagerDashboard() {
  const container = document.getElementById("dashboardContainer");
  const backBtn = document.getElementById("backBtn");
  if (!container) return;

  const header = document.createElement("div");
  header.className = "p-3 mb-3 bg-light border-bottom d-flex justify-content-between align-items-center";

  header.innerHTML = `
    <div class="d-flex flex-column">
      <h4 id="greetingText" class="m-0 mb-1"></h4>
      <small class="text-muted" id="roleText"></small>
    </div>
    <button class="btn btn-outline-primary btn-sm" id="settingsBtn">الإعدادات</button>
  `;
  container.parentElement.prepend(header);


  const settingsBtn = document.getElementById("settingsBtn");
  settingsBtn.onclick = () => page("/admin_settings");

  const user = JSON.parse(localStorage.getItem("user"));
  const greetingText = document.getElementById("greetingText");
  const roleText = document.getElementById("roleText");
  if (user) {
    greetingText.textContent = `أهلًا ${user.fullname || "مستخدم"}`;
    const role = user.role === "manager" ? "مدير النظام" :
                 user.role === "teacher" ? "مدرس" :
                 user.role === "student" ? "طالب" : "عضو";
    roleText.textContent = `الدور: ${role}`;
  } else {
    greetingText.textContent = "مرحبًا بك";
    roleText.textContent = "";
  }

  const API_URL = 'https://raw.githubusercontent.com/gasserdev/Al-Araby-DB-test/main/users.json';

  async function fetchData() {
    const response = await axios.get(API_URL);
    return typeof response.data === "string" ? JSON.parse(response.data) : response.data;
  }

  function showDepartments() {
    container.innerHTML = `<h2 class="mb-3">الأقسام</h2>`;
    const departments = ["اداب", "فزياء", "لوجيستيات"];
    departments.forEach(dep => {
      const card = document.createElement("div");
      card.className = "card m-2 p-3";
      card.style.cursor = "pointer";
      card.textContent = dep;
      card.onclick = () => showYears(dep);
      container.appendChild(card);
    });
  }

  function showYears(section) {
    container.innerHTML = `<h2 class="mb-3">قسم ${section}</h2>`;
    const years = ["الأولى", "الثانية", "الثالثة"];
    years.forEach(year => {
      const card = document.createElement("div");
      card.className = "card m-2 p-3";
      card.style.cursor = "pointer";
      card.textContent = `الصف ${year}`;
      card.onclick = () => chooseType(section, year);
      container.appendChild(card);
    });
  }

  function chooseType(section, year) {
    container.innerHTML = `
      <h2>قسم ${section} - الصف ${year}</h2>
      <div class="mt-3">
        <button class="btn btn-primary m-2" id="showTeachers">عرض المدرسين</button>
        <button class="btn btn-secondary m-2" id="showStudents">عرض الطلاب</button>
      </div>
    `;
    document.getElementById("showTeachers").onclick = () => showTeachers(section, year);
    document.getElementById("showStudents").onclick = () => showStudents(section, year);
  }

  async function showTeachers(section, year) {
    const data = await fetchData();
    const teachers = data.filter(u =>
      u.role === "teacher" &&
      u.section === section &&
      u.classes?.some(c => c.year === year)
    );

    container.innerHTML = `<h3 class="mb-3">مدرسي ${section} - ${year}</h3>`;
    if (!teachers.length) {
      container.innerHTML += `<p>لا يوجد مدرسين</p>`;
      return;
    }

    teachers.forEach(teacher => {
      const isHOD = localStorage.getItem(`HOD_${teacher.fullname}`) === "true" || teacher.isHOD;
      const rating = teacher.rating ? `${teacher.rating.toFixed(1)} / 5` : "غير متوفر";

      const card = document.createElement("div");
      card.className = "card m-2 p-3 shadow-sm";
      card.innerHTML = `
        <h5>${teacher.fullname}</h5>
        <p class="mb-1">القسم: ${teacher.section}</p>
        <p class="mb-1">${isHOD ? "رئيس قسم" : "مدرس"}</p>
        <p class="mb-2">التقييم: <strong>${rating}</strong></p>
        <div class="mt-2 d-flex gap-2">
          <button class="btn btn-sm ${isHOD ? "btn-danger" : "btn-success"} toggle-hod">
            ${isHOD ? "إسقاط من رئيس قسم" : "ترقية لرئيس قسم"}
          </button>
          <button class="btn btn-sm btn-outline-danger delete-teacher">حذف</button>
        </div>
      `;

      card.querySelector(".toggle-hod").onclick = () => {
        const key = `HOD_${teacher.fullname}`;
        const current = localStorage.getItem(key) === "true";
        localStorage.setItem(key, !current);
        showTeachers(section, year);
      };

      card.querySelector(".delete-teacher").onclick = () => {
        card.remove();
      };

      container.appendChild(card);
    });
  }

  async function showStudents(section, year) {
    const data = await fetchData();
    const students = data.filter(u =>
      u.role === "student" && u.section === section && u.year === year
    );

    container.innerHTML = `<h3 class="mb-3">طلاب ${section} - ${year}</h3>`;
    if (!students.length) {
      container.innerHTML += `<p>لا يوجد طلاب</p>`;
      return;
    }

    students.forEach(st => {
      const grades = st.grades ? Object.entries(st.grades)
        .map(([subject, grade]) => `<li>${subject}: <strong>${grade}</strong></li>`)
        .join("") : "<li>لم تُرصد درجات بعد</li>";

      const card = document.createElement("div");
      card.className = "card m-2 p-3 shadow-sm";
      card.innerHTML = `
        <h5>${st.fullname}</h5>
        <p class="mb-1">الفصل: ${st.class}</p>
        <ul>${grades}</ul>
        <button class="btn btn-sm btn-outline-danger delete-student">حذف</button>
      `;

      card.querySelector(".delete-student").onclick = () => {
        card.remove();
      };

      container.appendChild(card);
    });
  }

  backBtn.onclick = () => showDepartments();
  showDepartments();
}
