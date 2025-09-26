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

  let lang = 'ar';

  const translations = {
    title: { en: "Al-Arabi School", ar: "مدرسة العربي" },
    heading: { en: "Al-Arabi School", ar: "مدرسة العربي للتكنولوجيا التطبيقية"},
    fullName: { en: "Full Name", ar: "الاسم الكامل" },
    password: { en: "Password", ar: "كلمة المرور" },
    roleOptions: { en: ["Select Role", "Student", "Teacher"], ar:["اختر الدور", "طالب", "مُعلم"]},
    gradeOptions: { en: ["Select Grade", "First", "Second", "Third"], ar: ["اختر السنة الدراسية", "الأولى", "الثانية", "الثالثة"] },
    createAccount: { en: "Create Account", ar: "إنشاء الحساب" },
    placeholder: {
      fullName: { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
      password: { en: "Enter your password", ar: "أدخل كلمة المرور" },
      role: { en: "Select Role", ar: "اختر الدور" },
      grade: { en: "Select Grade", ar: "اختر السنة الدراسية" }
    },
    fillAllFields: { en: 'Please fill in all fields!', ar: 'يرجى ملء كل الحقول!' },
    login:{en:"Login",ar:"تسجيل دخول"},
    createAccount: { en: "Create Account", ar: "إنشاء الحساب" },
    arabic:{en:"Arabic",ar:"العربية"},
    english:{en:"English",ar:"الأنجليزية"},
    home:{en:"Home",ar:"الرئيسية"}
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

  setLanguage('ar');

  if (enBtn) enBtn.addEventListener('click', () => setLanguage('en'));
  if (arBtn) arBtn.addEventListener('click', () => setLanguage('ar'));

  roleSelect.addEventListener('change', () => {
    if (roleSelect.value === "مُعلم" || roleSelect.value === "Teacher") {
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

    const user = { fullName, password, role, grade: (role === "مدرس" || role === "Teacher") ? null : grade };
    localStorage.setItem('user', JSON.stringify(user));

    alert(lang === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!');
    form.reset();
    gradeWrapper.style.display = 'block';
  });
}
