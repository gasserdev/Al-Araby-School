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

  if (!form) return;

  function setDefaults() {
    if (roleSelect) {
      roleSelect.innerHTML = `
        <option value="" disabled selected>اختر الدور</option>
        <option value="طالب">طالب</option>
        <option value="مدرس">مدرس</option>
      `;
    }
  }
  setDefaults();

  roleSelect.addEventListener('change', () => {
    if (roleSelect.value === 'مدرس') gradeWrapper.style.display = 'none';
    else gradeWrapper.style.display = 'block';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = fullNameInput.value.trim();
    const password = passwordInput.value.trim();
    const roleSelected = roleSelect.value;
    const year = gradeSelect.value || null;
    const section = sectionSelect.value || '';

    if (!fullName || !password || !roleSelected || (roleSelected !== 'مدرس' && !year) || !section) {
      alert('يرجى ملء كل الحقول!');
      return;
    }

    const role = roleSelected === 'مدرس' ? 'teacher' : 'student';

    const newUser = {
      id: Date.now(),
      fullname: fullName,
      password,
      role,
      year: role === 'student' ? year : null,
      section,
      class: role === 'student' ? null : undefined,
      grades: role === 'student' ? { "العربية": 0, "الإنجليزية": 0, "رياضيات": 0 } : undefined,
      schedule: role === 'student' ? [] : undefined
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    alert('تم إنشاء الحساب محليًا. يمكنك الآن الدخول.');
    if (role === 'student') window.location.href = '/student_dashboard';
    else window.location.href = '/teacher_dashboard';
  });
}
