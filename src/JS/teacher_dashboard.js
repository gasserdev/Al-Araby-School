import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';

export default function initTeacherDashboard() {
  const classesCardBody = document.getElementById("classesList");
  const studentsTableBody = document.getElementById("studentsTableBody");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    alert("لم يتم العثور على بيانات المستخدم. يرجى تسجيل الدخول.");
    return;
  }

  if (user.isHOD === true) {
    if (!document.querySelector(".go-hod-dashboard-btn")) {
      const hodLink = document.createElement("a");
      hodLink.href = "/hod_dashboard";
      hodLink.textContent = " الذهاب إلى لوحة رئيس القسم";
      hodLink.className = "btn btn-warning my-3 w-100 fw-bold go-hod-dashboard-btn";

      const topArea = document.querySelector(".container") || document.body;
      topArea.prepend(hodLink);
    }
  }





  const role = (user.role || "").toString().toLowerCase();
  if (!(role === "teacher" || role === "مدرس")) {
    alert("هذا الحساب ليس حساب مدرس.");
    return;
  }

  const API_URL = "https://raw.githubusercontent.com/gasserdev/Al-Araby-DB-test/main/users.json";

  const getYearFromClassName = (clsName) => {
    if (!clsName || typeof clsName !== "string") return "غير معروف";
    const first = clsName.trim()[0];
    if (first === "1") return "الأولى";
    if (first === "2") return "الثانية";
    if (first === "3") return "الثالثة";
    return "غير معروف";
  };

  const normalizeClasses = (raw) => {
    if (!Array.isArray(raw)) return [];
    return raw.map(item => {
      if (typeof item === "string") {
        return { name: item, year: getYearFromClassName(item) };
      }
      return { name: item.name, year: item.year || getYearFromClassName(item.name) };
    });
  };

  function showToast(msg, success = true) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.position = 'fixed';
    t.style.top = '20px';
    t.style.left = '50%';
    t.style.transform = 'translateX(-50%)';
    t.style.background = success ? '#198754' : '#d63384';
    t.style.color = '#fff';
    t.style.padding = '8px 14px';
    t.style.borderRadius = '8px';
    t.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    t.style.zIndex = 9999;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  }

  const saveLocalGrades = (studentId, gradesObj) => {
    try {
      const saved = JSON.parse(localStorage.getItem('updatedGrades') || '{}');
      saved[studentId] = gradesObj;
      localStorage.setItem('updatedGrades', JSON.stringify(saved));
    } catch (err) {
      console.error("خطأ في حفظ الدرجات محليًا:", err);
    }
  };

  async function init() {
    try {
      const res = await axios.get(API_URL, { timeout: 10000 });
      let data = res.data;
      if (typeof data === "string") data = JSON.parse(data);

      const teacher = data.find(u => Number(u.id) === Number(user.id)) ||
                      data.find(u => (u.fullname || "").toLowerCase() === (user.fullname || "").toLowerCase());

      if (!teacher) {
        classesCardBody.innerHTML = "<li class='list-group-item text-danger'>لم يتم العثور على بيانات المدرس في الـ API.</li>";
        return;
      }

      const classes = normalizeClasses(teacher.classes || []);
      if (classes.length === 0) {
        classesCardBody.innerHTML = "<li class='list-group-item text-muted'>لا توجد فصول مرتبطة بهذا الحساب.</li>";
        return;
      }

      buildYearAndClassSelectors(classes, data, teacher);
    } catch (err) {
      console.error("خطأ في تحميل بيانات الـ API:", err);
      classesCardBody.innerHTML = "<li class='list-group-item text-danger'>حدث خطأ أثناء تحميل بيانات الـ API.</li>";
    }
  }

  function buildYearAndClassSelectors(classesArr, allData, teacher) {
    const parentEl = classesCardBody;
    parentEl.innerHTML = "";

    const years = [...new Set(classesArr.map(c => c.year))];
    const yearLabel = document.createElement('div');
    yearLabel.className = "p-2";
    yearLabel.innerHTML = `<label class="form-label mb-1">اختر السنة</label>`;
    const yearSelect = document.createElement('select');
    yearSelect.className = "form-select mb-2";
    const defaultYearOpt = document.createElement('option');
    defaultYearOpt.value = "";
    defaultYearOpt.textContent = "اختر السنة";
    defaultYearOpt.selected = true;
    defaultYearOpt.disabled = true;
    yearSelect.appendChild(defaultYearOpt);
    years.forEach(y => {
      const o = document.createElement('option');
      o.value = y;
      o.textContent = y;
      yearSelect.appendChild(o);
    });
    yearLabel.appendChild(yearSelect);
    parentEl.appendChild(yearLabel);

    const classLabel = document.createElement('div');
    classLabel.className = "p-2";
    classLabel.innerHTML = `<label class="form-label mb-1">اختر الفصل</label>`;
    const classSelect = document.createElement('select');
    classSelect.className = "form-select";
    const defaultClassOpt = document.createElement('option');
    defaultClassOpt.value = "";
    defaultClassOpt.textContent = "اختر الفصل";
    defaultClassOpt.selected = true;
    defaultClassOpt.disabled = true;
    classSelect.appendChild(defaultClassOpt);
    classLabel.appendChild(classSelect);
    parentEl.appendChild(classLabel);

    yearSelect.addEventListener('change', () => {
      const selectedYear = yearSelect.value;
      populateClassesForYear(classesArr, selectedYear, classSelect);
      studentsTableBody.innerHTML = `<tr><td colspan="3" class="text-muted text-center">اختر فصلًا لعرض الطلاب.</td></tr>`;
    });

    classSelect.addEventListener('change', () => {
      const selectedClass = classSelect.value;
      loadStudentsByClass(allData, selectedClass, teacher.section);
    });
  }

  function populateClassesForYear(classesArr, year, classSelectEl) {
    classSelectEl.innerHTML = "";
    const defaultClassOpt = document.createElement('option');
    defaultClassOpt.value = "";
    defaultClassOpt.textContent = "اختر الفصل";
    defaultClassOpt.selected = true;
    defaultClassOpt.disabled = true;
    classSelectEl.appendChild(defaultClassOpt);

    const filtered = classesArr.filter(c => c.year === year);
    if (filtered.length === 0) {
      const o = document.createElement('option');
      o.value = "";
      o.textContent = "لا توجد فصول";
      o.disabled = true;
      classSelectEl.appendChild(o);
      return;
    }

    filtered.forEach(c => {
      const o = document.createElement('option');
      o.value = c.name;
      o.textContent = c.name;
      classSelectEl.appendChild(o);
    });
  }

  function loadStudentsByClass(allData, className, teacherSection) {
    studentsTableBody.innerHTML = "";

    const students = allData.filter(u => (u.role === "student" || u.role === "طالب") && u.class === className);

    if (students.length === 0) {
      studentsTableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">لا يوجد طلاب في هذا الفصل.</td></tr>`;
      return;
    }

    const headerRow = document.createElement('tr');
    headerRow.className = "table-dark";
    headerRow.innerHTML = `
      <th>اسم الطالب</th>
      <th>درجة ${escapeHtml(teacherSection || "المادة")}</th>
      <th>حفظ</th>
    `;
    studentsTableBody.appendChild(headerRow);

    const savedAll = JSON.parse(localStorage.getItem('updatedGrades') || '{}');

    students.forEach(student => {
      student.grades = student.grades || {};
      const localGrades = savedAll[student.id] || {};
      const currentGrade = (localGrades[teacherSection] !== undefined) ? localGrades[teacherSection] : (student.grades[teacherSection] ?? 0);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="align-middle">${escapeHtml(student.fullname)}</td>
        <td class="align-middle">
          <input type="number" min="0" max="100" value="${currentGrade}" data-student-id="${student.id}" data-subject="${escapeHtmlAttribute(teacherSection)}" class="form-control grade-input" />
        </td>
        <td class="align-middle">
          <button class="btn btn-success btn-sm save-btn"> حفظ</button>
        </td>
      `;

      const saveBtn = tr.querySelector(".save-btn");
      saveBtn.addEventListener('click', () => {
        const input = tr.querySelector('.grade-input');
        const value = parseInt(input.value);
        const gradeVal = isNaN(value) ? 0 : value;

        student.grades[teacherSection] = gradeVal;
        saveLocalGrades(student.id, student.grades);
        showToast(`تم حفظ درجة ${student.fullname} في ${teacherSection} محليًا`);
      });

      studentsTableBody.appendChild(tr);
    });
  }

  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function escapeHtmlAttribute(str) {
    if (str === undefined || str === null) return "";
    return String(str).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function loadSchedule() {
    const data = JSON.parse(localStorage.getItem("teacherSchedule") || "[]");
    const tbody = document.getElementById("scheduleTableBody");
    tbody.innerHTML = "";
    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" class="text-muted">لا توجد مواعيد بعد.</td></tr>`;
      return;
    }
    data.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.day}</td>
        <td>${item.time}</td>
        <td>
          <button class="btn btn-sm btn-warning editBtn" data-index="${index}">تعديل</button>
          <button class="btn btn-sm btn-danger deleteBtn" data-index="${index}">حذف</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function saveSchedule(data) {
    localStorage.setItem("teacherSchedule", JSON.stringify(data));
    loadSchedule();
  }

  document.getElementById("addScheduleBtn")?.addEventListener("click", () => {
    const day = prompt("أدخل اليوم:");
    const time = prompt("أدخل الوقت:");
    if (!day || !time) return alert("الرجاء ملء جميع الحقول.");
    const data = JSON.parse(localStorage.getItem("teacherSchedule") || "[]");
    data.push({ day, time });
    saveSchedule(data);
  });

  document.addEventListener("click", e => {
    if (e.target.classList.contains("deleteBtn")) {
      const i = e.target.dataset.index;
      const data = JSON.parse(localStorage.getItem("teacherSchedule") || "[]");
      data.splice(i, 1);
      saveSchedule(data);
    }
    if (e.target.classList.contains("editBtn")) {
      const i = e.target.dataset.index;
      const data = JSON.parse(localStorage.getItem("teacherSchedule") || "[]");
      const item = data[i];
      const day = prompt("اليوم:", item.day);
      const time = prompt("الوقت:", item.time);
      data[i] = { day, time };
      saveSchedule(data);
    }
  });

  loadSchedule();

  init();
}
