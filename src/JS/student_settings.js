import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import axios from 'axios';

export default function initStudentSettings() {
  const container = document.getElementById('student-settings');

  if (!container) return;

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    container.innerHTML = '<p>لم يتم العثور على بيانات الطالب.</p>';
    return;
  }

  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0 text-center flex-grow-1">إعدادات الحساب</h2>
      <button id="backToDashboard" class="btn btn-light border rounded-circle ms-2" title="رجوع">
        ✖
      </button>
    </div>

    <div class="card p-3 shadow">
      <div class="mb-3">
        <label class="form-label">الاسم الكامل:</label>
        <input type="text" class="form-control" value="${user.fullname}" disabled>
      </div>
      <div class="mb-3">
        <label class="form-label">السنة الدراسية:</label>
        <input type="text" class="form-control" value="${user.year || 'غير محددة'}" disabled>
      </div>
      <div class="mb-3">
        <label class="form-label">القسم:</label>
        <input type="text" class="form-control" value="${user.section || 'غير محدد'}" disabled>
      </div>
      <div class="mb-3">
        <label class="form-label">الرقم السري:</label>
        <input type="text" class="form-control" value="${user.password}" disabled>
      </div>
      <button id="delete-account" class="btn btn-danger w-100 mt-2">حذف الحساب</button>
      <button id="logout" class="btn btn-secondary w-100 mt-2">تسجيل الخروج</button>
    </div>
  `;

  document.getElementById('backToDashboard').addEventListener('click', () => {
    window.location.href = '/student_dashboard';
  });

  document.getElementById('delete-account').addEventListener('click', async () => {
    if (!confirm('هل أنت متأكد أنك تريد حذف الحساب؟')) return;

    try {
      localStorage.removeItem('user');
      alert('تم حذف الحساب بنجاح');
      window.location.href = '/';
    } catch (err) {
      console.error('خطأ أثناء حذف الحساب:', err);
      alert('حدث خطأ أثناء حذف الحساب');
    }
  });

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  });
}
