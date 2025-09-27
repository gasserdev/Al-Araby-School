import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import '/src/CSS/create_account.css';
import axios from 'axios';
export default function initLogin() {
  const enBtn = document.getElementById('enBtn');
  const arBtn = document.getElementById('arBtn');
  const form = document.querySelector('form#createForm');
  const fullNameInput = document.getElementById('fullName');
  const passwordInput = document.getElementById('password');

  if (!form) return;

  let lang = 'ar';

  const translations = {
    title: { en: "Al-Arabi School", ar: "مدرسة العربي" },
    heading: { en: "Al-Arabi School", ar: "مدرسة العربي للتكنولوجيا التطبيقية" },
    fullName: { en: "Full Name", ar: "الاسم الكامل" },
    password: { en: "Password", ar: "كلمة المرور" },
    login: { en: "Login", ar: "تسجيل دخول"},
    placeholder: {
      fullName: { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
      password: { en: "Enter your password", ar: "أدخل كلمة المرور" }
    },
    fillAllFields: { en: 'Please fill in all fields!', ar: 'يرجى ملء كل الحقول!' },
    createAccount: { en: "Create Account", ar: "إنشاء الحساب" },
    arabic:{en:"Arabic",ar:"العربية"},
    english:{en:"English",ar:"الأنجليزية"},
    home:{en:"Home",ar:"الرئيسية"}


  };


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
  }

  const savedLang = localStorage.getItem('lang') || 'ar';
  setLanguage(savedLang);

  if (enBtn) enBtn.addEventListener('click', () => setLanguage('en'));
  if (arBtn) arBtn.addEventListener('click', () => setLanguage('ar'));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = fullNameInput.value.trim();
    const password = passwordInput.value.trim();
    if (!fullName || !password ) {
      alert(translations.fillAllFields[lang]);
      return;
    }

    const user = { fullName, password};
    localStorage.setItem('user', JSON.stringify(user));

  });
}
