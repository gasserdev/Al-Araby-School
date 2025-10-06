import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import '/src/CSS/create_account.css';
import axios from 'axios';

export default function initCreateAccount() {
  const form = document.querySelector('form#createForm');
  const fullNameInput = document.getElementById('fullName');
  const passwordInput = document.getElementById('password');
  const roleSelect = document.getElementById('role');
  const gradeWrapper = document.getElementById('grade-wrapper');
  const gradeSelect = document.getElementById('grade');
  const sectionSelect = document.getElementById('section');
  const sectionWrapper = document.getElementById('section-wrapper');

  if (!form) return;

  document.title = "مدرسة العربي";
  document.documentElement.lang = "ar";

  const translations = {
    roleOptions: ["اختر الدور", "طالب", "مدرس"],
    gradeOptions: ["اختر السنة الدراسية", "الأولى", "الثانية", "الثالثة"],
    sectionOptions: ["اختر قسمك", "اداب", "فيزياء", "كيمياء"],
    placeholders: {
      fullName: "أدخل اسمك الكامل",
      password: "أدخل كلمة المرور"
    },
    fillAllFields: "يرجى ملء كل الحقول!"
  };

  function updateSelect(selectEl, options) {
    if (!selectEl) return;
    selectEl.innerHTML = '';
    options.forEach((optText, index) => {
      const opt = document.createElement('option');
      opt.textContent = optText;
      opt.value = index === 0 ? "" : optText;
      if (index === 0) opt.disabled = true;
      selectEl.appendChild(opt);
    });
    selectEl.selectedIndex = 0;
  }

  if (fullNameInput) fullNameInput.placeholder = translations.placeholders.fullName;
  if (passwordInput) passwordInput.placeholder = translations.placeholders.password;

  updateSelect(roleSelect, translations.roleOptions);
  updateSelect(gradeSelect, translations.gradeOptions);
  updateSelect(sectionSelect, translations.sectionOptions);

  roleSelect.addEventListener('change', () => {
    if (roleSelect.value === "مدرس") {
      gradeWrapper.style.display = 'none';
    } else {
      gradeWrapper.style.display = 'block';
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value;
    const grade = gradeSelect.value;
    const section = sectionSelect.value;

    if (!fullName || !password || role === "" || (role !== "مدرس" && grade === "") || section === "") {
      alert(translations.fillAllFields);
      return;
    }

    const user = {
      fullName,
      password,
      role,
      grade: (role === "مدرس") ? null : grade,
      section
    };
    localStorage.setItem('user', JSON.stringify(user));

    if (role === "مدرس") {
      window.location.href = '/';
    } else if (role === "طالب") {
      window.location.href = '/student_dashboard';
    }
  });
}
