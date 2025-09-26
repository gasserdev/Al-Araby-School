import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../CSS/global.css';


const translations = {
  ar: {
    title: "مدرسة العربي",
    brand: "مدرسة العربي",
    welcome: "مرحبا إلى مدرسة العربي",
    desc: "بوابتك إلى النمو والتعلم",
    signin: "تسجيل دخول",
    create: "حساب جديد",
  },
  en: {
    title: "Al-Arabi School",
    brand: "Al-Arabi School",
    welcome: "Welcome to Al-Arabi School",
    desc: "Your gateway to growth and learning",
    signin: "Sign In",
    create: "Create Account",
  },
};


function changeLang(lang) {
  document.title = translations[lang].title;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });


  localStorage.setItem("lang", lang);
}


const savedLang = localStorage.getItem("lang") || "ar";


changeLang(savedLang);


const arBtn = document.getElementById("arBtn");
const enBtn = document.getElementById("enBtn");

if (arBtn) {
  arBtn.addEventListener("click", () => changeLang("ar"));
}

if (enBtn) {
  enBtn.addEventListener("click", () => changeLang("en"));
}
