import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../CSS/global.css';
import '../CSS/create_account.css';
import axios from 'axios';

const enBtn = document.getElementById('enBtn');
const arBtn = document.getElementById('arBtn');
const form = document.querySelector('form');
const fullNameInput = document.getElementById('fullName');
const passwordInput = document.getElementById('password');

let lang = 'ar';

const translations = {
  title: { en: "Al-Arabi School", ar: "مدرسة العربي" },
  brand: { en: "Al-Arabi School", ar: "مدرسة العربي" },
  heading: { en: "Create Account", ar: "إنشاء حساب" },
  fullName: { en: "Full Name", ar: "الاسم الكامل" },
  password: { en: "Password", ar: "كلمة المرور" },
  role: { en: "Role", ar: "الدور" },
  roleOptions: { en: ["Select Role", "Student", "Teacher", "Supervisor"], ar: ["اختر الدور", "طالب", "مدرس", "مشرف"] },
  grade: { en: "Grade", ar: "السنة الدراسية" },
  gradeOptions: { en: ["Select Grade", "First", "Second", "Third"], ar: ["اختر السنة الدراسية", "الأولى", "الثانية", "الثالثة"] },
  createAccount: { en: "Create Account", ar: "إنشاء الحساب" },
  placeholder: {
    fullName: { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
    password: { en: "Enter your password", ar: "أدخل كلمة المرور" }
  },
  fillAllFields: { en: 'Please fill in all fields!', ar: 'يرجى ملء كل الحقول!' }
};

function updateSelect(selectEl, options) {
  if (!selectEl) return;
  selectEl.innerHTML = '';
  options.forEach(optText => {
    const opt = document.createElement('option');
    opt.textContent = optText;
    opt.value = optText === options[0] ? "" : optText;
    selectEl.appendChild(opt);
  });
}

function setLanguage(newLang) {
  lang = newLang;
  document.title = translations.title[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key][lang];
  });

  if (fullNameInput) fullNameInput.placeholder = translations.placeholder.fullName[lang];
  if (passwordInput) passwordInput.placeholder = translations.placeholder.password[lang];

  updateSelect(document.querySelector('select[name="role"]'), translations.roleOptions[lang]);
  updateSelect(document.querySelector('select[name="grade"]'), translations.gradeOptions[lang]);

  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.textContent = translations.createAccount[lang];
}

enBtn.addEventListener('click', () => setLanguage('en'));
arBtn.addEventListener('click', () => setLanguage('ar'));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = fullNameInput.value.trim();
  const password = passwordInput.value.trim();
  const role = document.querySelector('select[name="role"]').value;
  const grade = document.querySelector('select[name="grade"]').value;

  if (!fullName || !password || role === "" || grade === "") {
    alert(translations.fillAllFields[lang]);
    return;
  };
  const user = { fullName, password, role, grade };
  localStorage.setItem('user', JSON.stringify(user));
});
