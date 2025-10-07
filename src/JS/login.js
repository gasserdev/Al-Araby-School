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
      const API_URL = 'https://raw.githubusercontent.com/gasserdev/Al-Araby-DB-test/main/users.json';
      const response = await axios.get(API_URL, { timeout: 10000 });
      let users = response.data;
      if (typeof users === 'string') users = JSON.parse(users);

      const foundUser = users.find(user =>
        (user.fullname || '').toString().trim().toLowerCase() === fullName.toLowerCase() &&
        String(user.password).toString().trim() === password
      );

      if (!foundUser) {
        alert('الاسم أو كلمة المرور غير صحيحة!');
        return;
      }

      const roleValue = (foundUser.role || '').toString().trim().toLowerCase();
      if (roleValue === 'مدرس') foundUser.role = 'teacher';
      else if (roleValue === 'طالب') foundUser.role = 'student';
      else if (roleValue === 'مدير') foundUser.role = 'manager';

      localStorage.setItem('user', JSON.stringify(foundUser));
      alert(`مرحبًا ${foundUser.fullname}`);

      const role = (foundUser.role || '').toString().trim().toLowerCase();
      if (role === 'student') window.location.href = '/student_dashboard';
      else if (role === 'teacher') window.location.href = '/teacher_dashboard';
      else if (role === 'manager') window.location.href = '/';
      else window.location.href = '/';

    } catch (err) {
      console.error('login error:', err);
      alert('حدث خطأ أثناء تسجيل الدخول — افتح Console للتفاصيل.');
    }
  });
}
