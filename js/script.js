// ── Constants ──────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const MIN_PASSWORD_LENGTH = 8;
const DARK_MODE_CLASS = 'dark-mode';

const ASSETS = {
  burgerLight: 'assets/menu-burger.png',
  burgerDark:  'assets/menu-burger-white.png',
  crossLight:  'assets/cross.png',
  crossDark:   'assets/cross-white.png',
};

const PAGES = {
  home:          'index.html',
  dashboard:     'dashboard.html',
  login:         'login.html',
  createProfile: 'create-profile.html',
  editProfile:   'edit-profile.html',
  explore:       'explore.html',
};

// ── Dark Mode (runs before DOMContentLoaded to prevent flash) ──────────────────
(function () {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add(DARK_MODE_CLASS);
  }
})();

// ── Helpers ────────────────────────────────────────────────────────────────────

function getMenuIconSrc(isOpen) {
  const isDark = document.body.classList.contains(DARK_MODE_CLASS);
  if (isOpen) return isDark ? ASSETS.crossDark : ASSETS.crossLight;
  return isDark ? ASSETS.burgerDark : ASSETS.burgerLight;
}

function renderAvatar(containerEl, user, imgClass = 'profile-photo') {
  if (!containerEl) return;
  if (user.photoUrl) {
    const img = document.createElement('img');
    img.src = user.photoUrl;
    img.alt = user.name || 'Avatar';
    img.className = imgClass;
    img.id = containerEl.id;
    containerEl.replaceWith(img);
  } else {
    containerEl.textContent = getInitials(user.name);
  }
}

function handleImageUpload(file, onSuccess) {
  if (!file || !file.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    alert('Image must be smaller than 2MB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = evt => onSuccess(evt.target.result);
  reader.readAsDataURL(file);
}

function initPasswordToggle(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const btn = input.closest('.input-group').querySelector('.password-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isVisible = input.type === 'text';
    input.type = isVisible ? 'password' : 'text';
    btn.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
    const icon = btn.querySelector('i');
    if (icon) icon.className = isVisible ? 'fas fa-eye' : 'fas fa-eye-slash';
  });
}

function renderSkillTags(containerId, skills) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = skills && skills.length
    ? skills.map(s => `<span class="skill-tag">${s}</span>`).join('')
    : '<span class="skills-empty">No skills added yet.</span>';
}

// ── Initialisation Modules ─────────────────────────────────────────────────────

function initDarkModeToggle() {
  document.querySelectorAll('.theme-toggle, .auth-theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle(DARK_MODE_CLASS);
      const isDark = document.body.classList.contains(DARK_MODE_CLASS);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      const burgerImg = document.querySelector('#burger-menu img');
      const nav = document.getElementById('main-nav');
      if (burgerImg && nav && !nav.classList.contains('open')) {
        burgerImg.src = getMenuIconSrc(false);
      }
    });
  });
}

function initBurgerMenu() {
  const burgerMenu = document.getElementById('burger-menu');
  const mainNav = document.getElementById('main-nav');
  if (!burgerMenu || !mainNav) return;

  const burgerImg = burgerMenu.querySelector('img');
  if (burgerImg) burgerImg.src = getMenuIconSrc(false);

  function openNav() {
    mainNav.classList.add('open');
    if (burgerImg) burgerImg.src = getMenuIconSrc(true);
    burgerMenu.setAttribute('aria-label', 'Close menu');
  }

  function closeNav() {
    mainNav.classList.remove('open');
    if (burgerImg) burgerImg.src = getMenuIconSrc(false);
    burgerMenu.setAttribute('aria-label', 'Open menu');
  }

  burgerMenu.addEventListener('click', e => {
    e.stopPropagation();
    mainNav.classList.contains('open') ? closeNav() : openNav();
  });

  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

  document.addEventListener('click', e => {
    if (mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !burgerMenu.contains(e.target)) {
      closeNav();
    }
  });
}

function initScrollHide() {
  const header = document.querySelector('header');
  if (!header) return;
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav && nav.classList.contains('open')) return;
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
  });
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function initIndexHeader() {
  const joinBtn = document.getElementById('join-now-btn');
  if (!joinBtn) return;
  const user = getCurrentUser();
  if (!user) return;

  const initials = user.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';
  const avatarHTML = user.photoUrl
    ? `<img src="${user.photoUrl}" alt="${user.name || 'Profile'}" class="nav-profile-avatar nav-profile-photo">`
    : `<div class="nav-profile-avatar">${initials}</div>`;

  const chip = document.createElement('a');
  chip.href = PAGES.editProfile;
  chip.className = 'nav-profile-chip';
  chip.setAttribute('aria-label', 'Edit your profile');
  chip.innerHTML = `${avatarHTML}<span class="nav-profile-name">${user.name || 'Profile'}</span>`;
  joinBtn.replaceWith(chip);
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  if (getCurrentUser()) { window.location.href = PAGES.dashboard; return; }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errorEl = document.getElementById('signup-error');
    errorEl.textContent = '';

    const name     = document.getElementById('signup-name').value.trim();
    const email    = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    if (!name)                                    { errorEl.textContent = 'Please enter your name.'; return; }
    if (!validateEmail(email))                    { errorEl.textContent = 'Please enter a valid email address.'; return; }
    if (password.length < MIN_PASSWORD_LENGTH)    { errorEl.textContent = 'Password must be at least 8 characters.'; return; }

    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      errorEl.textContent = 'An account with this email already exists.';
      return;
    }

    const newUser = {
      id: generateId(), name, email, password,
      createdAt: new Date().toISOString(),
      school: '', degree: '',
      skillsToTeach: [], skillsToLearn: [],
      profileComplete: false,
    };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser.id);
    window.location.href = PAGES.createProfile;
  });
}

function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  if (getCurrentUser()) { window.location.href = PAGES.dashboard; return; }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = '';

    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) { errorEl.textContent = 'Please fill in all fields.'; return; }

    const user = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      errorEl.textContent = 'Invalid email or password.';
      return;
    }

    setCurrentUser(user.id);
    window.location.href = user.profileComplete ? PAGES.dashboard : PAGES.createProfile;
  });
}

function initCreateProfile() {
  const form = document.getElementById('profile-form');
  if (!form) return;

  if (!getCurrentUser()) { window.location.href = PAGES.login; return; }
  if (getCurrentUser().profileComplete) { window.location.href = PAGES.dashboard; return; }

  let pendingPhotoUrl = null;
  const photoInput   = document.getElementById('profile-photo-input');
  const chooseBtn    = document.getElementById('btn-choose-photo');
  const photoPreview = document.getElementById('photo-preview');

  if (chooseBtn && photoInput) {
    chooseBtn.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', e => {
      const file = e.target.files[0];
      handleImageUpload(file, url => {
        pendingPhotoUrl = url;
        photoPreview.innerHTML = `<img src="${url}" alt="Preview">`;
      });
      photoInput.value = '';
    });
  }

  const teachTags = [];
  const learnTags = [];
  initTagInput('teach-tags-wrapper', teachTags);
  initTagInput('learn-tags-wrapper', learnTags);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errorEl = document.getElementById('profile-error');
    errorEl.textContent = '';

    const school = document.getElementById('school-input').value.trim();
    const degree = document.getElementById('degree-input').value.trim();

    if (!school)                { errorEl.textContent = 'Please enter your school or university.'; return; }
    if (!degree)                { errorEl.textContent = 'Please enter your degree or program.'; return; }
    if (teachTags.length === 0) { errorEl.textContent = 'Add at least one skill you can teach.'; return; }

    const users  = getUsers();
    const userId = localStorage.getItem('ss_current_user');
    const idx    = users.findIndex(u => u.id === userId);
    if (idx === -1) { window.location.href = PAGES.login; return; }

    Object.assign(users[idx], {
      school, degree,
      skillsToTeach: teachTags.slice(),
      skillsToLearn: learnTags.slice(),
      profileComplete: true,
      photoUrl: pendingPhotoUrl || null,
    });
    saveUsers(users);
    window.location.href = PAGES.dashboard;
  });
}

function preloadTags(wrapperId, tagsArray, values) {
  if (!values || !values.length) return;
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const input = wrapper.querySelector('.tag-input');
  values.forEach(value => {
    tagsArray.push(value);
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${value} <span class="material-symbols-outlined" data-tag="${value}">close</span>`;
    wrapper.insertBefore(tag, input);
  });
}

function initTagInput(wrapperId, tagsArray) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const input = wrapper.querySelector('.tag-input');

  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();
    const value = input.value.replace(',', '').trim();
    if (!value || tagsArray.includes(value)) { input.value = ''; return; }

    tagsArray.push(value);
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${value} <span class="material-symbols-outlined" data-tag="${value}">close</span>`;
    wrapper.insertBefore(tag, input);
    input.value = '';
  });

  wrapper.addEventListener('click', e => {
    const closeBtn = e.target.closest('.material-symbols-outlined[data-tag]');
    if (!closeBtn) return;
    const idx = tagsArray.indexOf(closeBtn.dataset.tag);
    if (idx > -1) tagsArray.splice(idx, 1);
    closeBtn.closest('.tag').remove();
  });
}

function initEditProfile() {
  const form = document.getElementById('edit-profile-form');
  if (!form) return;

  if (!getCurrentUser()) { window.location.href = PAGES.login; return; }

  const user = getCurrentUser();

  // Pre-populate text fields
  document.getElementById('edit-name').value   = user.name   || '';
  document.getElementById('edit-school').value = user.school || '';
  document.getElementById('edit-degree').value = user.degree || '';

  // Photo preview — show existing photo if set
  let pendingPhotoUrl    = user.photoUrl || null;
  const photoInput       = document.getElementById('edit-photo-input');
  const chooseBtn        = document.getElementById('edit-btn-choose-photo');
  const photoPreview     = document.getElementById('edit-photo-preview');

  if (user.photoUrl) {
    photoPreview.innerHTML = `<img src="${user.photoUrl}" alt="Profile photo">`;
  }

  if (chooseBtn && photoInput) {
    chooseBtn.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', e => {
      handleImageUpload(e.target.files[0], url => {
        pendingPhotoUrl = url;
        photoPreview.innerHTML = `<img src="${url}" alt="Preview">`;
      });
      photoInput.value = '';
    });
  }

  // Tag inputs pre-loaded with saved skills
  const teachTags = [];
  const learnTags = [];
  initTagInput('edit-teach-wrapper', teachTags);
  initTagInput('edit-learn-wrapper', learnTags);
  preloadTags('edit-teach-wrapper', teachTags, user.skillsToTeach || []);
  preloadTags('edit-learn-wrapper', learnTags, user.skillsToLearn || []);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errorEl = document.getElementById('edit-profile-error');
    errorEl.textContent = '';

    const name   = document.getElementById('edit-name').value.trim();
    const school = document.getElementById('edit-school').value.trim();
    const degree = document.getElementById('edit-degree').value.trim();

    if (!name)                { errorEl.textContent = 'Please enter your name.';                     return; }
    if (!school)              { errorEl.textContent = 'Please enter your school or university.';     return; }
    if (!degree)              { errorEl.textContent = 'Please enter your degree or program.';        return; }
    if (!teachTags.length)    { errorEl.textContent = 'Add at least one skill you can teach.';       return; }

    const users  = getUsers();
    const userId = localStorage.getItem(SS_CURRENT_USER_KEY);
    const idx    = users.findIndex(u => u.id === userId);
    if (idx === -1) { window.location.href = PAGES.login; return; }

    Object.assign(users[idx], {
      name, school, degree,
      skillsToTeach: teachTags.slice(),
      skillsToLearn: learnTags.slice(),
      photoUrl: pendingPhotoUrl,
    });
    saveUsers(users);
    window.location.href = PAGES.dashboard;
  });
}

function initSearchToggle() {
  const toggleBtn   = document.getElementById('search-toggle-btn');
  const closeBtn    = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');
  const header      = document.querySelector('header');
  if (!toggleBtn || !closeBtn || !searchInput || !header) return;

  toggleBtn.addEventListener('click', () => {
    header.classList.add('search-expanded');
    searchInput.focus();
  });

  closeBtn.addEventListener('click', () => {
    header.classList.remove('search-expanded');
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
  });
}

function initDashboard() {
  if (!document.getElementById('sidebar-name')) return;

  if (!getCurrentUser()) { window.location.href = PAGES.login; return; }

  const user = getCurrentUser();

  document.getElementById('sidebar-name').textContent      = user.name || 'SkillSwap Member';
  document.getElementById('user-display-name').textContent = user.name || 'My Account';

  renderSkillTags('skills-teach-list', user.skillsToTeach);
  renderSkillTags('skills-learn-list', user.skillsToLearn);

  document.getElementById('sidebar-subtitle').textContent =
    user.school && user.degree ? `${user.school} · ${user.degree}`
    : user.school || user.degree || 'SkillSwap Member';

  renderAvatar(document.getElementById('sidebar-avatar'), user);
  renderAvatar(document.getElementById('nav-avatar'), user, 'profile-photo small');

  // Photo upload
  const uploadWrapper = document.getElementById('avatar-upload-wrapper');
  const fileInput     = document.getElementById('photo-upload-input');
  if (uploadWrapper && fileInput) {
    uploadWrapper.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => {
      handleImageUpload(e.target.files[0], photoUrl => {
        const users  = getUsers();
        const userId = localStorage.getItem(SS_CURRENT_USER_KEY);
        const idx    = users.findIndex(u => u.id === userId);
        if (idx === -1) return;
        users[idx].photoUrl = photoUrl;
        saveUsers(users);
        const sidebarEl = document.getElementById('sidebar-avatar');
        const navEl     = document.getElementById('nav-avatar');
        if (sidebarEl) renderAvatar(sidebarEl, users[idx]);
        if (navEl) renderAvatar(navEl, users[idx], 'profile-photo small');
      });
      fileInput.value = '';
    });
  }

  document.getElementById('logout-btn').addEventListener('click', e => {
    e.preventDefault();
    clearCurrentUser();
    window.location.href = PAGES.home;
  });
}

// ── Boot ───────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDarkModeToggle();
  initBurgerMenu();
  initScrollHide();
  initFAQ();
  initIndexHeader();
  initSignupForm();
  initLoginForm();
  initCreateProfile();
  initSearchToggle();
  initDashboard();
  initEditProfile();
  initPasswordToggle('login-password');
  initPasswordToggle('signup-password');
});
