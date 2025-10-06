import page from 'page';

const app = document.getElementById('app');

const showHome = async () => {
  app.innerHTML = `
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#" data-link data-i18n="brand">مدرسة العربي للتكنولوجيا التطبيقية</a>
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
                <button id="enBtn" class="nav-link active btn btn-light">English</button>
              </li>
              <li class="nav-item">
                <button id="arBtn" class="nav-link active btn btn-primary">العربية</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="container w-100">
      <div id='hero' class="d-flex justify-content-center gap-3 align-items-center flex-column">
        <div class="d-flex flex-column justify-content-center text-center mt-5 align-content-center">
          <h2 class="fs-2" data-i18n="welcome">مرحبا بك في مدرسة العربي</h2>
          <p class="fs-5" data-i18n="desc">بوابتك إلى النمو والتعلم</p>
        </div>
        <div class="d-flex gap-2 flex-column">
          <a href="/login" class="btn btn-primary" id="signInBtn" data-i18n="signin">تسجيل دخول</a>
          <a href="/create_account" class="btn btn-light mb-2" id="createAccountBtn" data-link data-i18n="create">حساب جديد</a>
        </div>
      </div>
    </div>
  </main>
  `;
  await import("/src/JS/main.js").then(module => module.default());
};

const showCreateAccount = async () => {
  app.innerHTML = `
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="/" data-link data-i18n="title">العربي للتكنولوجيا التطبيقية</a>
        <button class="navbar-toggler noborder" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header justify-content-between">
            <h5 class="offcanvas-title fw-bold mb-0 flex-grow-1 text-truncate" id="offcanvasNavbarLabel" data-i18n="heading">
              مدرسة العربي للتكنولوجيا التطبيقية
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="إغلاق"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 gap-2">
              <li class="nav-item">
                <a href="/" class="nav-link btn text-primary" data-link data-i18n="home" style="width:100px;">الرئيسية</a>
              </li>
              <li class="nav-item">
                <button id="enBtn" class="nav-link active btn" style="width:110px;" data-i18n="english">English</button>
              </li>
              <li class="nav-item">
                <button id="arBtn" class="nav-link active btn" style="width:110px;" data-i18n="arabic">العربية</button>
              </li>
              <li class="nav-item">
                <a href="/login" data-link class="nav-link active btn btn-primary" data-i18n="login">تسجيل دخول</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="container">
      <h3 class="text-center mb-4 fw-bold" data-i18n="createAccount">إنشاء حساب</h3>
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
          <select class="form-select" id="grade">
            <option value="" selected disabled>اختر السنة الدراسية</option>
            <option value="الأولى">الأولى</option>
            <option value="الثانية">الثانية</option>
            <option value="الثالثة">الثالثة</option>
          </select>
        </div>
        <div class="mb-3" id="section-wrapper">
          <label class="form-label" for="section" data-i18n="section">القسم</label>
          <select class="form-select" id="section">
            <option value="" selected disabled>اختر قسمك</option>
            <option value="اداب">اداب</option>
            <option value="فيزياء">فيزياء</option>
            <option value="كمياء">كمياء</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100" data-i18n="createAccount">إنشاء الحساب</button>
      </form>
    </div>
  </main>
  `;
  await import("/src/JS/create_account.js").then(module => module.default());
};

const showLogin = async () => {
  app.innerHTML = `
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="/" data-link data-i18n="heading">مدرسة العربي للتكنولوجيا التطبيقية</a>
        <button class="navbar-toggler noborder" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header justify-content-between">
            <h5 data-i18n="heading" class="offcanvas-title fw-bold mb-0 flex-grow-1 text-truncate" id="offcanvasNavbarLabel" data-i18n="brand">
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
                <button id="enBtn" class="nav-link active btn" style="width:110px;" data-i18n="english">English</button>
              </li>
              <li class="nav-item">
                <button id="arBtn" class="nav-link active btn" data-i18n="arabic" style="width:110px;">العربية</button>
              </li>
              <li class="nav-item">
                <a href="/create_account" data-link class="nav-link active btn btn-primary" data-i18n="createAccount">حساب جديد</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="container">
      <h3 class="text-center mb-4 fw-bold" data-i18n="login">تسجيل دخول</h3>
      <form id="createForm">
        <div class="mb-3">
          <label class="form-label" for="fullName" data-i18n="fullName">الاسم الكامل</label>
          <input type="text" class="form-control" id="fullName" required placeholder="أدخل اسمك الكامل">
        </div>
        <div class="mb-3">
          <label class="form-label" for="password" data-i18n="password">كلمة المرور</label>
          <input type="password" class="form-control" minlength="8" required id="password" placeholder="أدخل كلمة المرور">
        </div>
        <button type="submit" class="btn btn-primary w-100" data-i18n="login">تسجيل دخول</button>
      </form>
    </div>
  </main>
  `;
  await import("/src/JS/login.js").then(module => module.default());
};

const showStudentDashboard = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    page.redirect('/login');
    return;
  }

  app.innerHTML = `
  <div class="container-fluid">
    <button id="sidebarMobileBtn" class="btn btn-primary my-3 d-md-none" type="button"
      data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas">
      ☰ القائمة
    </button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel">
      <div class="offcanvas-header d-flex justify-content-between">
        <h5 class="offcanvas-title" id="sidebarOffcanvasLabel">مدرسة العربي</h5>
        <button type="button" class="btn-close text-reset ms-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <nav class="nav flex-column gap-2">
          <a href="/student_dashboard" class="nav-link active"><i class="fas fa-house"></i> الرئيسية</a>
          <a href="#" class="nav-link"><i class="fas fa-gear"></i> الإعدادات</a>
        </nav>
      </div>
    </div>

    <div class="row min-vh-100">
      <div class="col-md-3 col-lg-2 d-none d-md-flex flex-column border-end pe-0">
        <div class="p-3 d-flex flex-column justify-content-between" style="min-height:700px;">
          <nav class="nav flex-column gap-2">
            <h5 class="mb-3">مدرسة العربي</h5>
            <a href="/student_dashboard" class="nav-link active"><i class="fas fa-house"></i> الرئيسية</a>
            <a href="#" class="nav-link"><i class="fas fa-gear"></i> الإعدادات</a>
          </nav>
        </div>
      </div>

      <div class="col-12 col-md-9 col-lg-10">
        <div class="p-4">
          <h1 class="fw-bold fs-2 mb-3">لوحة الطالب</h1>
          <h2 class="fw-bold fs-4 mb-4">مرحبًا ${user.fullname}</h2>

          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h3 class="card-title mb-0">الدرجات</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover" id="gradesTable">
                  <thead>
                    <tr>
                      <th scope="col">المادة</th>
                      <th scope="col">الدرجة</th>
                    </tr>
                  </thead>
                  <tbody id="gradesTableBody">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header bg-success text-white">
              <h3 class="card-title mb-0">الجدول الدراسي</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover" id="scheduleTable">
                  <thead>
                    <tr>
                      <th scope="col">اليوم</th>
                      <th scope="col">المادة</th>
                      <th scope="col">الوقت</th>
                    </tr>
                  </thead>
                  <tbody id="scheduleTableBody">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  await import("/src/JS/student_dashboard.js").then(module => module.default());
};


page('/', showHome);
page('/create_account', showCreateAccount);
page('/login', showLogin);
page('/student_dashboard', showStudentDashboard);

document.addEventListener('click', e => {
  const link = e.target.closest('a[data-link]');
  if (link) {
    e.preventDefault();
    page(link.getAttribute('href'));
  }
});

page();
