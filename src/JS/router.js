import page from 'page';
import axios from 'axios';

const showHome = async () => {
  document.getElementById('app').innerHTML = `
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#" data-link data-i18n="brand">مدرسة العربي</a>
        <button class="navbar-toggler noborder" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header justify-content-between">
            <h5 class="offcanvas-title fw-bold mb-0 flex-grow-1 text-truncate" id="offcanvasNavbarLabel" data-i18n="brand">
              مدرسة العربي
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="إغلاق"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 gap-2">
              <li class="nav-item">
                <button id="enBtn" class="nav-link active btn btn-light" onclick='changeLang("en")'>English</button>
              </li>
              <li class="nav-item">
                <button id="arBtn" class="nav-link active btn btn-primary" onclick='changeLang("en")''>العربية</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="container w-100">
      <div class="d-flex justify-content-center gap-3 align-items-center flex-column">
        <div class="d-flex flex-column justify-content-center text-center mt-5 align-content-center">
          <h2 class="fs-2" data-i18n="welcome">مرحبا إلى مدرسة العربي</h2>
          <p class="fs-5" data-i18n="desc">بوابتك إلى النمو والتعلم</p>
        </div>
        <img id="hero" src="/assets/images/hero.png" alt="صورة توضيحية لمدرسة العربي" />
        <div class="d-flex gap-2 flex-column">
          <button type="button" class="btn btn-primary" id="signInBtn" data-i18n="signin">تسجيل دخول</button>
          <a href="/create_account" class="btn btn-light mb-2" id="createAccountBtn" data-link data-i18n="create">حساب جديد</a>
        </div>
      </div>
    </div>
  </main>
  `;
  await import("/src/JS/main.js");
};

const showCreateAccount = async () => {
  document.getElementById('app').innerHTML = `
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="/" data-link data-i18n="brand">مدرسة العربي</a>
        <button class="navbar-toggler noborder" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header justify-content-between">
            <h5 class="offcanvas-title fw-bold mb-0 flex-grow-1 text-truncate" id="offcanvasNavbarLabel" data-i18n="brand">
              مدرسة العربي
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="إغلاق"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 gap-2">
              <li class="nav-item">
                <a href="/" class="nav-link btn text-primary" data-link data-i18n="home" style="width:100px;">الرئيسية</a>
              </li>
              <li class="nav-item">
                <button id="enBtn" class="nav-link active btn" style="width:110px;">English</button>
              </li>
              <li class="nav-item">
                <button id="arBtn" class="nav-link active btn" style="width:110px;">العربية</button>
              </li>
              <li class="nav-item">
                <button class="nav-link active btn btn-primary" data-i18n="login">تسجيل دخول</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="container">
      <h3 class="text-center mb-4 fw-bold" data-i18n="heading">إنشاء حساب</h3>
      <form id="createForm">
        <div class="mb-3">
          <label class="form-label" for="fullName" data-i18n="fullName">الاسم الكامل</label>
          <input type="text" class="form-control" id="fullName" required placeholder="أدخل اسمك الكامل">
        </div>
        <div class="mb-3">
          <label class="form-label" for="password" data-i18n="password">كلمة المرور</label>
          <input type="password" class="form-control" minlength="8" required id="password" placeholder="أدخل كلمة المرور">
        </div>
        <div class="mb-3">
          <label class="form-label" for="role" data-i18n="role">الدور</label>
          <select class="form-select" id="role" required>
            <option value="" selected disabled>اختر الدور</option>
            <option value="طالب">طالب</option>
            <option value="مدرس">مدرس</option>
          </select>
        </div>
        <div class="mb-3" id="grade-wrapper">
          <label class="form-label" for="grade" data-i18n="grade">السنة الدراسية</label>
          <select class="form-select" id="grade" >
            <option value="" selected disabled>اختر السنة الدراسية</option>
            <option value="الأولى">الأولى</option>
            <option value="الثانية">الثانية</option>
            <option value="الثالثة">الثالثة</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100" data-i18n="createAccount">إنشاء الحساب</button>
      </form>
    </div>
  </main>
  `;
  await import("/src/JS/create_account.js").then(module => module.default());
};

page('/', () => showHome());
page('/create_account', () => showCreateAccount());

document.addEventListener('click', e => {
  const link = e.target.closest('a[data-link]');
  if (link) {
    e.preventDefault();
    page(link.getAttribute('href'));
  }
});
page();
