import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../CSS/global.css';
import axios from 'axios';
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

const arBtn = document.getElementById("arBtn");
const enBtn = document.getElementById("enBtn");

function changeLang(lang) {
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });
}

arBtn.addEventListener("click", () => changeLang("ar"));
enBtn.addEventListener("click", () => changeLang("en"));

changeLang("ar");
