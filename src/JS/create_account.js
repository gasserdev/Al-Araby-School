import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import '/src/CSS/create_account.css';
import axios from 'axios';

export default function initCreateAccount() {
  const enBtn = document.getElementById('enBtn');
  const arBtn = document.getElementById('arBtn');
  const form = document.querySelector('form#createForm');
  const fullNameInput = document.getElementById('fullName');
  const passwordInput = document.getElementById('password');
  const roleSelect = document.getElementById('role');
  const gradeWrapper = document.getElementById('grade-wrapper');
  const gradeSelect = document.getElementById('grade');

  if (!form) return;

  let lang = localStorage.getItem('lang') || 'ar';

  const translations = {
    title: { en: "Al-Arabi School", ar: "مدرسة العربي" },
    arabic:{en:"Arabic",ar:"العربية"},
    login: { en: "Login", ar: "تسجيل دخول"},
    fullName: { en: "Full Name", ar: "الاسم الكامل" },
    password: { en: "Password", ar: "كلمة المرور" },
    roleOptions: { en: ["Select Role", "Student", "Teacher"], ar:["اختر الدور", "طالب", "مدرس"]},
    gradeOptions: { en: ["Select Grade", "First", "Second", "Third"], ar: ["اختر السنة الدراسية", "الأولى", "الثانية", "الثالثة"] },
    createAccount: { en: "Create Account", ar: "إنشاء الحساب" },
    placeholder: {
      fullName: { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
      password: { en: "Enter your password", ar: "أدخل كلمة المرور" }
    },
    fillAllFields: { en: 'Please fill in all fields!', ar: 'يرجى ملء كل الحقول!' },
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

  function setLanguage(newLang) {
    lang = newLang;
    localStorage.setItem('lang', lang);

    document.title = translations.title[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) el.textContent = translations[key][lang];
    });

    if (fullNameInput) fullNameInput.placeholder = translations.placeholder.fullName[lang];
    if (passwordInput) passwordInput.placeholder = translations.placeholder.password[lang];

    updateSelect(roleSelect, translations.roleOptions[lang]);
    updateSelect(gradeSelect, translations.gradeOptions[lang]);
  }

  setLanguage(lang);

  if (enBtn) enBtn.addEventListener('click', () => setLanguage('en'));
  if (arBtn) arBtn.addEventListener('click', () => setLanguage('ar'));

  roleSelect.addEventListener('change', () => {
    if (roleSelect.value === "مدرس" || roleSelect.value === "Teacher") {
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

    if (!fullName || !password || role === "" || (role !== "مدرس" && role !== "Teacher" && grade === "")) {
      alert(translations.fillAllFields[lang]);
      return;
    }

    const user = {
      fullName,
      password,
      role,
      grade: (role === "مدرس" || role === "Teacher") ? null : grade
    };
    localStorage.setItem('user', JSON.stringify(user));

    // redirect based on role correctly
    if (role === "مدرس" || role === "Teacher") {
      window.location.href = '/';
    } else if (role === "طالب" || role === "Student") {
      window.location.href = '/student_dashboard';
    }
  });
}
