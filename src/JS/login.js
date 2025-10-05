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
    login: { en: "Login", ar: "تسجيل دخول" },
    placeholder: {
      fullName: { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
      password: { en: "Enter your password", ar: "أدخل كلمة المرور" }
    },
    fillAllFields: { en: 'Please fill in all fields!', ar: 'يرجى ملء كل الحقول!' },
    invalid: { en: 'Invalid name or password!', ar: 'الاسم أو كلمة المرور غير صحيحة!' },
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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!fullName || !password) {
      alert(translations.fillAllFields[lang]);
      return;
    }

    try {
      const response = await axios.get('https://al-araby-db.vercel.app/users.json');
      let users = response.data;

      // لو الـ API بيرجع نص JSON نعمله parse
      if (typeof users === "string") {
        users = JSON.parse(users);
      }

      // ندوّر على المستخدم في الداتا
      const foundUser = users.find(
        user =>
          user.fullname.toLowerCase() === fullName.toLowerCase() &&
          String(user.password) === password
      );

      if (foundUser) {
        // حفظ في localStorage
        localStorage.setItem('user', JSON.stringify(foundUser));
        alert(`${lang === 'ar' ? 'مرحبا' : 'Welcome'} ${foundUser.fullname}`);
        window.location.href = '/student_dashboard';
      } else {
        alert(translations.invalid[lang]);
      }

    } catch (err) {
      console.error("خطأ أثناء الاتصال بالـ API:", err);
      alert("حدث خطأ أثناء تسجيل الدخول 💀");
    }
  });
}
