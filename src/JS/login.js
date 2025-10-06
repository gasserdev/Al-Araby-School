import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import '/src/CSS/create_account.css';
import axios from 'axios';

export default function initLogin() {

  const form = document.querySelector('form#createForm');
  const fullNameInput = document.getElementById('fullName');
  const passwordInput = document.getElementById('password');

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!fullName || !password) {
      alert('يرجى ملء كل الحقول!');
      return;
    }

    try {
      const response = await axios.get('https://al-araby-db.vercel.app/users.json');
      let users = response.data;

      if (typeof users === "string") {
        users = JSON.parse(users);
      }

      const foundUser = users.find(
        user =>
          user.fullname.toLowerCase() === fullName.toLowerCase() &&
          String(user.password) === password
      );

      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        alert(`مرحبًا ${foundUser.fullname}`);
        window.location.href = '/student_dashboard';
      } else {
        alert('الاسم أو كلمة المرور غير صحيحة!');
      }

    } catch (err) {
      console.error("حدث خطأ أثناء الاتصال بواجهة الـ API:", err);
      alert("حدث خطأ أثناء تسجيل الدخول");
    }
  });
}
