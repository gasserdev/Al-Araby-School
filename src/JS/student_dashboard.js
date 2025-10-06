import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/CSS/global.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import axios from 'axios';

export default function initStudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = '/';
    return;
  }

  async function loadStudentData(user) {
    try {
      const response = await axios.get('https://al-araby-db.vercel.app/users.json');
      let users = response.data;

      if (typeof users === "string") {
        users = JSON.parse(users);
      }

      const currentStudent = users.find(u =>
        u.id === Number(user.id) && (u.role === "student" || u.role === "طالب")
      );

      if (currentStudent) {
        // عرض الدرجات
        const gradesTableBody = document.getElementById('gradesTableBody');
        if (gradesTableBody && currentStudent.grades) {
          gradesTableBody.innerHTML = '';
          Object.entries(currentStudent.grades).forEach(([subject, grade]) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${subject}</td><td>${grade}</td>`;
            gradesTableBody.appendChild(row);
          });
        }

        // عرض الجدول الأسبوعي
        const scheduleTableBody = document.getElementById('scheduleTableBody');
        if (scheduleTableBody && currentStudent.schedule) {
          scheduleTableBody.innerHTML = '';
          currentStudent.schedule.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.day}</td><td>${item.subject}</td><td>${item.time}</td>`;
            scheduleTableBody.appendChild(row);
          });
        }
      } else {
        console.error('لم يتم العثور على بيانات الطالب');
      }
    } catch (error) {
      console.error('خطأ في تحميل بيانات الطالب:', error);
    }
  }

  loadStudentData(user);
}
