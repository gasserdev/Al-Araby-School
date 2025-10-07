import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';

export default function initTeacherDashboard() {
  const classesList = document.getElementById("classesList");
  const studentsTableBody = document.getElementById("studentsTableBody");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "teacher") {
    alert("لم يتم العثور على بيانات المدرس!");
    return;
  }

  const API_URL = "https://raw.githubusercontent.com/gasserdev/Al-Araby-DB-test/main/users.json";

  async function loadTeacherClasses() {
    try {
      const response = await axios.get(API_URL, { timeout: 10000 });
      let data = response.data;
      if (typeof data === 'string') data = JSON.parse(data);

      const teacher = data.find(u => u.id === user.id);
      if (!teacher) {
        classesList.innerHTML = "<li class='list-group-item text-danger'>لم يتم العثور على بيانات المدرس.</li>";
        return;
      }

      const classesArr = teacher.classes || [];
      if (classesArr.length === 0) {
        classesList.innerHTML = "<li class='list-group-item text-muted'>لا توجد فصول مرتبطة بهذا الحساب.</li>";
        return;
      }

      classesList.innerHTML = "";
      classesArr.forEach(cls => {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-action";
        li.style.cursor = "pointer";
        li.textContent = cls;
        li.addEventListener("click", () => loadStudentsByClass(data, cls, teacher.section));
        classesList.appendChild(li);
      });

    } catch (err) {
      console.error("خطأ في تحميل بيانات المدرس:", err);
      classesList.innerHTML = "<li class='list-group-item text-danger'>حدث خطأ أثناء تحميل البيانات.</li>";
    }
  }

  function loadStudentsByClass(data, className, teacherSection) {
    studentsTableBody.innerHTML = "";
    const students = data.filter(
      u => u.role === "student" && u.class === className
    );

    if (students.length === 0) {
      studentsTableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">لا يوجد طلاب في هذا الفصل.</td></tr>`;
      return;
    }

    students.forEach(student => {
      student.grades = student.grades || {};
      const subjectName = teacherSection;
      const currentGrade = student.grades[subjectName] ?? 0;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${student.fullname}</td>
        <td><input type="number" min="0" max="100" value="${currentGrade}" data-subject="${subjectName}" class="form-control grade-input" /></td>
        <td><button class="btn btn-success btn-sm save-btn">💾 حفظ</button></td>
      `;

      tr.querySelector(".save-btn").addEventListener("click", () => {
        const input = tr.querySelector(".grade-input");
        const value = parseInt(input.value);
        student.grades[subjectName] = isNaN(value) ? 0 : value;

        saveLocalGrades(student);
        showTemporaryToast(`تم حفظ درجة ${student.fullname} في ${subjectName} محليًا`);
      });

      studentsTableBody.appendChild(tr);
    });
  }

  function saveLocalGrades(student) {
    const saved = JSON.parse(localStorage.getItem('updatedGrades') || '{}');
    saved[student.id] = student.grades;
    localStorage.setItem('updatedGrades', JSON.stringify(saved));
  }

  function showTemporaryToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.position = 'fixed';
    t.style.top = '20px';
    t.style.left = '50%';
    t.style.transform = 'translateX(-50%)';
    t.style.background = '#198754';
    t.style.color = '#fff';
    t.style.padding = '8px 14px';
    t.style.borderRadius = '8px';
    t.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    t.style.zIndex = 9999;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  }

  loadTeacherClasses();
}
