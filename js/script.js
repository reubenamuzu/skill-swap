// ── Constants ──────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const MIN_PASSWORD_LENGTH = 8;
const DARK_MODE_CLASS = 'dark-mode';

const ASSET_BASE = window.location.pathname.includes('/pages/') ? '../assets/' : 'assets/';
const ASSETS = {
  burgerLight: ASSET_BASE + 'menu-burger.png',
  burgerDark:  ASSET_BASE + 'menu-burger-white.png',
  crossLight:  ASSET_BASE + 'cross.png',
  crossDark:   ASSET_BASE + 'cross-white.png',
};

const PAGES = {
  home:            '../index.html',
  dashboard:       'dashboard.html',
  login:           'login.html',
  createProfile:   'create-profile.html',
  editProfile:     'edit-profile.html',
  explore:         'explore.html',
  exchangeHistory:   'exchange-history.html',
  settings:          'settings.html',
  forgotPassword:    'forgot-password.html',
  suggestedMatches:  'suggested-matches.html',
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
  const btn = input.closest('.input-group, .settings-input-group').querySelector('.password-toggle');
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

  // Inject auth items based on login state
  const inPages = window.location.pathname.includes('/pages/');
  const user = getCurrentUser();
  if (user) {
    const editHref = inPages ? PAGES.editProfile : 'pages/edit-profile.html';
    mainNav.insertAdjacentHTML('beforeend', `
      <div class="mobile-nav-divider" aria-hidden="true"></div>
      <a href="${editHref}" class="mobile-nav-auth-link">Edit Profile</a>
      <a href="#" class="mobile-nav-auth-link mobile-nav-logout" id="mobile-logout-btn">Logout</a>
    `);
    document.getElementById('mobile-logout-btn').addEventListener('click', e => {
      e.preventDefault();
      clearCurrentUser();
      window.location.href = inPages ? PAGES.home : 'index.html';
    });
  } else {
    const signupHref = inPages ? PAGES.login : 'pages/login.html';
    mainNav.insertAdjacentHTML('beforeend', `
      <div class="mobile-nav-divider" aria-hidden="true"></div>
      <a href="${signupHref}" class="mobile-nav-auth-link mobile-nav-join">Join Now</a>
    `);
  }

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

  const editHref = window.location.pathname.includes('/pages/') ? PAGES.editProfile : 'pages/edit-profile.html';

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-profile-dropdown';

  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'nav-profile-chip';
  chip.setAttribute('aria-label', 'Profile menu');
  chip.setAttribute('aria-haspopup', 'true');
  chip.setAttribute('aria-expanded', 'false');
  chip.innerHTML = `${avatarHTML}<span class="nav-profile-name">${user.name || 'Profile'}</span>`;

  const menu = document.createElement('div');
  menu.className = 'nav-dropdown-menu';
  menu.innerHTML = `
    <a href="${editHref}">
      <span class="material-symbols-outlined">manage_accounts</span>
      Edit Profile
    </a>
    <div class="nav-dropdown-divider"></div>
    <button type="button" id="index-logout-btn">
      <span class="material-symbols-outlined">logout</span>
      Logout
    </button>
  `;

  wrapper.appendChild(chip);
  wrapper.appendChild(menu);
  joinBtn.replaceWith(wrapper);

  chip.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = wrapper.classList.toggle('open');
    chip.setAttribute('aria-expanded', isOpen);
  });

  menu.querySelector('#index-logout-btn').addEventListener('click', () => {
    clearCurrentUser();
    window.location.href = window.location.pathname.includes('/pages/') ? PAGES.home : 'index.html';
  });

  document.addEventListener('click', () => {
    wrapper.classList.remove('open');
    chip.setAttribute('aria-expanded', 'false');
  });
}

function initDashboardNavDropdown() {
  const profileLink = document.querySelector('.user-nav-profile');
  if (!profileLink) return;
  const user = getCurrentUser();
  if (!user) return;

  // Wrap the existing link in a dropdown wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'user-nav-profile-wrapper';
  profileLink.parentNode.insertBefore(wrapper, profileLink);
  wrapper.appendChild(profileLink);

  // Convert link to button-like element (prevent default navigation)
  profileLink.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = wrapper.classList.toggle('open');
    profileLink.setAttribute('aria-expanded', isOpen);
  });
  profileLink.setAttribute('aria-haspopup', 'true');
  profileLink.setAttribute('aria-expanded', 'false');

  const menu = document.createElement('div');
  menu.className = 'nav-dropdown-menu';
  menu.innerHTML = `
    <a href="${PAGES.editProfile}">
      <span class="material-symbols-outlined">manage_accounts</span>
      Edit Profile
    </a>
    <div class="nav-dropdown-divider"></div>
    <button type="button" id="dash-logout-btn">
      <span class="material-symbols-outlined">logout</span>
      Logout
    </button>
  `;
  wrapper.appendChild(menu);

  menu.querySelector('#dash-logout-btn').addEventListener('click', () => {
    clearCurrentUser();
    window.location.href = PAGES.home;
  });

  document.addEventListener('click', () => {
    wrapper.classList.remove('open');
    profileLink.setAttribute('aria-expanded', 'false');
  });
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  if (getCurrentUser() && getCurrentUser().profileComplete) { window.location.href = PAGES.dashboard; return; }

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
  if (getCurrentUser()) {
    const u = getCurrentUser();
    window.location.href = u.profileComplete ? PAGES.dashboard : PAGES.createProfile;
    return;
  }

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

// ── Find a Match ───────────────────────────────────────────────────────────────

const DEMO_POOL = [
  {
    id: 'demo_usr_1', name: 'Sarah Kim',
    school: 'UCLA', degree: 'Computer Science',
    skillsToTeach: ['JavaScript', 'React', 'Node.js', 'Vue.js'],
    skillsToLearn: ['UI/UX Design', 'Figma', 'Spanish', 'Photography'],
    photoUrl: null, isDemo: true,
  },
  {
    id: 'demo_usr_2', name: 'Marcus Johnson',
    school: 'NYU', degree: 'Design',
    skillsToTeach: ['UI/UX Design', 'Figma', 'Graphic Design', 'Illustrator'],
    skillsToLearn: ['Python', 'Data Science', 'Machine Learning', 'React'],
    photoUrl: null, isDemo: true,
  },
  {
    id: 'demo_usr_3', name: 'Priya Patel',
    school: 'Stanford', degree: 'Linguistics',
    skillsToTeach: ['Spanish', 'French', 'Photography', 'Video Editing'],
    skillsToLearn: ['React', 'JavaScript', 'Web Development', 'Figma'],
    photoUrl: null, isDemo: true,
  },
  {
    id: 'demo_usr_4', name: 'James Okonkwo',
    school: 'MIT', degree: 'Data Science',
    skillsToTeach: ['Data Science', 'Python', 'Machine Learning', 'R'],
    skillsToLearn: ['Photography', 'Spanish', 'UI/UX Design', 'Music'],
    photoUrl: null, isDemo: true,
  },
  {
    id: 'demo_usr_5', name: 'Amara Nwosu',
    school: 'Howard University', degree: 'Music Technology',
    skillsToTeach: ['Music Production', 'Piano', 'Music Theory', 'Ableton'],
    skillsToLearn: ['Python', 'JavaScript', 'Data Science', 'Marketing'],
    photoUrl: null, isDemo: true,
  },
];

function findMatches(currentUser) {
  const myTeach = (currentUser.skillsToTeach || []).map(s => s.toLowerCase());
  const myLearn = (currentUser.skillsToLearn || []).map(s => s.toLowerCase());
  if (!myTeach.length && !myLearn.length) return [];

  const allOthers = [
    ...getUsers().filter(u => u.id !== currentUser.id),
    ...DEMO_POOL,
  ];

  const matches = [];
  for (const user of allOthers) {
    const theirLearn = (user.skillsToLearn || []).map(s => s.toLowerCase());

    const theyCanTeachMe = (user.skillsToTeach || []).filter(s =>
      myLearn.includes(s.toLowerCase())
    );
    const iCanTeachThem = (currentUser.skillsToTeach || []).filter(s =>
      theirLearn.includes(s.toLowerCase())
    );

    const score = theyCanTeachMe.length * 2 + iCanTeachThem.length;
    if (score === 0) continue;

    matches.push({
      user, theyCanTeachMe, iCanTeachThem, score,
      isMutual: theyCanTeachMe.length > 0 && iCanTeachThem.length > 0,
    });
  }

  return matches.sort((a, b) => b.score - a.score).slice(0, 6);
}

function renderMatchCard(match) {
  const { user, theyCanTeachMe, iCanTeachThem, isMutual } = match;
  const avatarHtml = user.photoUrl
    ? `<img src="${user.photoUrl}" alt="${user.name}" class="match-avatar" />`
    : `<div class="match-avatar user-avatar-initials">${getInitials(user.name)}</div>`;

  const subtitle = user.school && user.degree
    ? `${user.school} · ${user.degree}`
    : user.school || user.degree || 'SkillSwap Member';

  const teachTags = theyCanTeachMe.map(s => `<span class="skill-tag primary">${s}</span>`).join('');
  const learnTags = iCanTeachThem.map(s => `<span class="skill-tag">${s}</span>`).join('');

  return `
    <div class="match-card">
      <div class="match-card-top">
        ${avatarHtml}
        <div class="match-user-info">
          <h4>${user.name}</h4>
          <span>${subtitle}</span>
        </div>
        <span class="match-badge ${isMutual ? 'mutual' : 'partial'}">${isMutual ? 'Mutual Match' : 'Partial Match'}</span>
      </div>
      ${theyCanTeachMe.length ? `
        <div class="match-skills-row">
          <span class="match-skills-label">
            <span class="material-symbols-outlined" aria-hidden="true">school</span>Can teach you
          </span>
          <div class="match-skills-tags">${teachTags}</div>
        </div>` : ''}
      ${iCanTeachThem.length ? `
        <div class="match-skills-row">
          <span class="match-skills-label">
            <span class="material-symbols-outlined" aria-hidden="true">lightbulb</span>You can teach
          </span>
          <div class="match-skills-tags">${learnTags}</div>
        </div>` : ''}
      <a href="request-skill.html" class="btn-request-swap">
        Request Swap
        <span class="material-symbols-outlined" aria-hidden="true">handshake</span>
      </a>
    </div>`;
}

function renderMatches(currentUser) {
  const grid = document.getElementById('matches-grid');
  if (!grid) return;
  const matches = findMatches(currentUser);
  if (matches.length === 0) {
    grid.innerHTML = '<p class="skills-empty" style="padding:1rem 0">Add skills to your profile to see suggested matches.</p>';
    return;
  }
  grid.innerHTML = matches.map(renderMatchCard).join('');
}

// ── Request Helpers ────────────────────────────────────────────────────────────

const DEMO_REQUESTS = [
  {
    id: 'req_demo_1',
    ownerId: null, // filled in at seed time
    direction: 'incoming',
    fromName: 'David Chen',
    fromAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZQr8NeDcj0vzMrW4JKPUvQzuNO3d5-aPPM4nrkTeMmPrEMxy8js4f5pfUZZ_VFJunUQfr2YafzMWMXTNdjSCXj0OqxilF74GUlLxCFClkyA8jFHrdUZ-sdIBF4oVW0L-U8Dpm0AXX0AfDKo-Kn4r5HZL_BMTRe5S9DIxf0UogZKDn9hitS0MbEhWYO1VK-AMKTGTVi14Y0uidIikjpGXURb07YRVjHFyTkOP9cq1TTWOikj5KlZzi7DJsCA1DzpzH2fhMJyFLzk',
    theirSkill: 'Python',
    mySkill: 'UI/UX Design',
    message: 'Hi! I would love to swap my Python skills for UI/UX Design lessons.',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'req_demo_2',
    ownerId: null,
    direction: 'incoming',
    fromName: 'Elena Rodriguez',
    fromAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV25Ys-syTomckdeXfKHPavW_Mk7w7c6OJwhx-UtZ09zzrKEtTtyGStfylkiv_kKEkHlRLnUDWF_TkdCY5piWwq_kXeG-R5ubYAxR8yEx1N1EGyjFnllOL9_UTAR39Uo9iQssdRkvnILs_vkIF-o5iCJyj8sxqORhYddS6CoBa7nZC5fnTAofTPLBSfHeRDhoqr3dk7CgmIgkLDzyC66yN72f1Zu6L6ZSHPPsr5tT0PnZMRly-JBBacNf35e5iqnA1ym1hnAksCLY',
    theirSkill: 'Spanish',
    mySkill: 'Figma Prototyping',
    message: 'Looking to swap Spanish conversation for Figma Prototyping help!',
    status: 'pending',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

function seedDemoRequests(userId) {
  const all = getRequests();
  const hasOwn = all.some(r => r.ownerId === userId);
  if (hasOwn) return;
  const seeded = DEMO_REQUESTS.map(r => ({ ...r, ownerId: userId }));
  saveRequests([...all, ...seeded]);
}

function updateRequestBadge(userId) {
  const badge = document.getElementById('requests-badge');
  if (!badge) return;
  const count = getRequests().filter(r => r.ownerId === userId && r.status === 'pending').length;
  badge.textContent = count;
  badge.style.display = count > 0 ? '' : 'none';
}

function renderRequestCard(req) {
  const avatarHtml = req.fromAvatar
    ? `<img src="${req.fromAvatar}" alt="${req.fromName}" class="request-avatar" />`
    : `<div class="request-avatar user-avatar-initials">${getInitials(req.fromName)}</div>`;

  const date = new Date(req.createdAt);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `
    <div class="request-card" data-req-id="${req.id}">
      <div class="request-info">
        ${avatarHtml}
        <div class="request-details">
          <h4>${req.fromName}</h4>
          <p>Wants to swap ${req.theirSkill} for ${req.mySkill} &middot; <span class="req-date">${dateStr}</span></p>
          <div class="request-skills">
            <span class="skill-tag">${req.theirSkill}</span>
            <span class="material-symbols-outlined exchange-direction" aria-hidden="true">sync_alt</span>
            <span class="skill-tag primary">${req.mySkill}</span>
          </div>
        </div>
      </div>
      <div class="request-actions">
        <button class="btn-decline" data-req-id="${req.id}">Decline</button>
        <button class="btn-accept" data-req-id="${req.id}">Accept Swap</button>
      </div>
    </div>`;
}

function renderRequestList(userId) {
  const list = document.getElementById('request-list');
  if (!list) return;
  const pending = getRequests().filter(r => r.ownerId === userId && r.status === 'pending');
  if (pending.length === 0) {
    list.innerHTML = '<p class="skills-empty" style="padding:1rem 0">No pending requests.</p>';
    return;
  }
  list.innerHTML = pending.map(renderRequestCard).join('');

  list.querySelectorAll('.btn-accept').forEach(btn => {
    btn.addEventListener('click', () => {
      const all = getRequests();
      const idx = all.findIndex(r => r.id === btn.dataset.reqId);
      if (idx === -1) return;
      all[idx].status = 'accepted';
      all[idx].acceptedAt = new Date().toISOString();
      saveRequests(all);
      renderRequestList(userId);
      updateRequestBadge(userId);
    });
  });

  list.querySelectorAll('.btn-decline').forEach(btn => {
    btn.addEventListener('click', () => {
      const all = getRequests();
      const idx = all.findIndex(r => r.id === btn.dataset.reqId);
      if (idx === -1) return;
      all[idx].status = 'declined';
      saveRequests(all);
      renderRequestList(userId);
      updateRequestBadge(userId);
    });
  });
}

// ── Request Skill Page ─────────────────────────────────────────────────────────

function initRequestSkillPage() {
  const sendBtn = document.getElementById('send-request-btn');
  if (!sendBtn) return;

  if (!getCurrentUser()) { window.location.href = PAGES.login; return; }
  const user = getCurrentUser();

  // Populate skills dropdown from user's teachable skills
  const select = document.getElementById('offer-select');
  if (select && user.skillsToTeach && user.skillsToTeach.length) {
    select.innerHTML = '<option value="" disabled selected>Select from your teaching list</option>';
    user.skillsToTeach.forEach(skill => {
      const opt = document.createElement('option');
      opt.value = skill;
      opt.textContent = skill;
      select.appendChild(opt);
    });
  }

  // Chip management
  const chipsContainer = document.getElementById('selected-chips');
  const selectedSkills = [];

  if (select && chipsContainer) {
    // Clear demo chip
    chipsContainer.innerHTML = '';

    select.addEventListener('change', () => {
      const val = select.value;
      if (!val || selectedSkills.includes(val)) return;
      selectedSkills.push(val);
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.dataset.skill = val;
      chip.innerHTML = `${val} <span class="material-symbols-outlined" aria-hidden="true">close</span>`;
      chip.querySelector('span').addEventListener('click', () => {
        selectedSkills.splice(selectedSkills.indexOf(val), 1);
        chip.remove();
      });
      chipsContainer.appendChild(chip);
      select.value = '';
    });
  }

  sendBtn.addEventListener('click', () => {
    const textarea = document.getElementById('request-message');
    const message = textarea ? textarea.value.trim() : '';
    const skillTitle = document.getElementById('request-skill-title');
    const recipientName = document.getElementById('request-recipient-name');

    if (selectedSkills.length === 0) {
      alert('Please select at least one skill to offer.');
      return;
    }
    if (!message) {
      alert('Please write a message to your potential partner.');
      return;
    }

    const newReq = {
      id: generateRequestId(),
      ownerId: user.id,
      direction: 'outgoing',
      fromName: user.name,
      fromAvatar: user.photoUrl || null,
      toName: recipientName ? recipientName.textContent : 'Alex Rivera',
      theirSkill: skillTitle ? skillTitle.textContent : 'Advanced Python Programming',
      mySkill: selectedSkills.join(', '),
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const all = getRequests();
    all.push(newReq);
    saveRequests(all);

    sendBtn.textContent = 'Request Sent!';
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.7';
    setTimeout(() => { window.location.href = PAGES.dashboard; }, 1200);
  });
}

// ── Dashboard ──────────────────────────────────────────────────────────────────

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
  initDashboardNavDropdown();

  // Seed demo requests on first visit, then render
  seedDemoRequests(user.id);
  renderRequestList(user.id);
  updateRequestBadge(user.id);

  // Swap count from accepted requests
  const swapCount = document.getElementById('swap-count');
  if (swapCount) {
    const count = getRequests().filter(r => r.ownerId === user.id && r.status === 'accepted').length;
    swapCount.textContent = count;
  }

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

// ── Settings Page ──────────────────────────────────────────────────────────────

function initSettingsPage() {
  const form = document.getElementById('settings-password-form');
  if (!form) return;

  if (!getCurrentUser()) { window.location.href = PAGES.login; return; }
  const user = getCurrentUser();

  // Populate nav header
  const navDisplayName = document.getElementById('user-display-name');
  if (navDisplayName) navDisplayName.textContent = user.name || 'My Account';
  renderAvatar(document.getElementById('nav-avatar'), user, 'profile-photo small');
  initDashboardNavDropdown();

  // Populate sidebar user info
  const nameEl = document.getElementById('settings-name');
  const emailEl = document.getElementById('settings-email');
  if (nameEl) nameEl.textContent = user.name || '';
  if (emailEl) emailEl.textContent = user.email || '';

  renderAvatar(document.getElementById('settings-avatar'), user);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errorEl  = document.getElementById('settings-error');
    const successEl = document.getElementById('settings-success');
    errorEl.textContent = '';
    successEl.textContent = '';

    const current = document.getElementById('current-password').value;
    const newPw   = document.getElementById('new-password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (current !== user.password) { errorEl.textContent = 'Current password is incorrect.'; return; }
    if (newPw.length < MIN_PASSWORD_LENGTH) { errorEl.textContent = 'New password must be at least 8 characters.'; return; }
    if (newPw !== confirm) { errorEl.textContent = 'Passwords do not match.'; return; }

    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return;
    users[idx].password = newPw;
    saveUsers(users);
    successEl.textContent = 'Password updated successfully!';
    form.reset();
  });

  // Sidebar logout
  const logoutBtn = document.getElementById('settings-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      clearCurrentUser();
      window.location.href = PAGES.home;
    });
  }

  // Delete account
  const deleteBtn = document.getElementById('delete-account-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
      const users = getUsers().filter(u => u.id !== user.id);
      saveUsers(users);
      const allReqs = getRequests().filter(r => r.ownerId !== user.id);
      saveRequests(allReqs);
      clearCurrentUser();
      window.location.href = PAGES.home;
    });
  }
}

// ── Exchange History Page ──────────────────────────────────────────────────────

function initExchangeHistory() {
  const container = document.getElementById('history-list');
  if (!container) return;

  if (!getCurrentUser()) { window.location.href = PAGES.login; return; }
  const user = getCurrentUser();

  // Populate nav header
  const navDisplayName = document.getElementById('user-display-name');
  if (navDisplayName) navDisplayName.textContent = user.name || 'My Account';
  renderAvatar(document.getElementById('nav-avatar'), user, 'profile-photo small');
  initDashboardNavDropdown();

  // Populate sidebar
  const nameEl = document.getElementById('history-sidebar-name');
  const subtitleEl = document.getElementById('history-sidebar-subtitle');
  if (nameEl) nameEl.textContent = user.name || 'SkillSwap Member';
  if (subtitleEl) subtitleEl.textContent = user.school && user.degree
    ? `${user.school} · ${user.degree}` : user.school || user.degree || 'SkillSwap Member';
  renderAvatar(document.getElementById('history-sidebar-avatar'), user);

  const logoutBtn = document.getElementById('history-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      clearCurrentUser();
      window.location.href = PAGES.home;
    });
  }

  const accepted = getRequests().filter(r => r.ownerId === user.id && r.status === 'accepted');

  if (accepted.length === 0) {
    container.innerHTML = '<p class="skills-empty" style="padding:2rem 0;text-align:center">No completed exchanges yet. Accept a request to get started!</p>';
    return;
  }

  container.innerHTML = accepted.map(req => {
    const avatarHtml = req.fromAvatar
      ? `<img src="${req.fromAvatar}" alt="${req.fromName}" class="request-avatar" />`
      : `<div class="request-avatar user-avatar-initials">${getInitials(req.fromName)}</div>`;
    const date = new Date(req.acceptedAt || req.createdAt);
    const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return `
      <div class="request-card history-card">
        <div class="request-info">
          ${avatarHtml}
          <div class="request-details">
            <h4>${req.fromName}</h4>
            <p>Swapped <strong>${req.theirSkill}</strong> for <strong>${req.mySkill}</strong></p>
            <div class="request-skills">
              <span class="skill-tag">${req.theirSkill}</span>
              <span class="material-symbols-outlined exchange-direction" aria-hidden="true">sync_alt</span>
              <span class="skill-tag primary">${req.mySkill}</span>
            </div>
          </div>
        </div>
        <div class="history-date">
          <span class="material-symbols-outlined" aria-hidden="true">check_circle</span>
          ${dateStr}
        </div>
      </div>`;
  }).join('');
}

// ── Forgot Password Page ───────────────────────────────────────────────────────

function initForgotPassword() {
  const form = document.getElementById('forgot-password-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const errorEl   = document.getElementById('forgot-error');
    const successEl = document.getElementById('forgot-success');
    errorEl.textContent = '';
    successEl.textContent = '';

    const email  = document.getElementById('forgot-email').value.trim();
    const newPw  = document.getElementById('forgot-new-password').value;
    const confirm = document.getElementById('forgot-confirm-password').value;

    if (!validateEmail(email)) { errorEl.textContent = 'Please enter a valid email address.'; return; }
    if (newPw.length < MIN_PASSWORD_LENGTH) { errorEl.textContent = 'Password must be at least 8 characters.'; return; }
    if (newPw !== confirm) { errorEl.textContent = 'Passwords do not match.'; return; }

    const users = getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) { errorEl.textContent = 'No account found with that email.'; return; }

    users[idx].password = newPw;
    saveUsers(users);
    successEl.textContent = 'Password reset! You can now log in with your new password.';
    form.reset();
    setTimeout(() => { window.location.href = PAGES.login; }, 2000);
  });
}

// ── Suggested Matches Page ────────────────────────────────────────────────────

function initSuggestedMatches() {
  if (!document.getElementById('matches-sidebar-name')) return;

  if (!getCurrentUser()) { window.location.href = PAGES.login; return; }
  const user = getCurrentUser();

  // Populate nav header
  const navDisplayName = document.getElementById('user-display-name');
  if (navDisplayName) navDisplayName.textContent = user.name || 'My Account';
  renderAvatar(document.getElementById('nav-avatar'), user, 'profile-photo small');
  initDashboardNavDropdown();

  // Populate sidebar
  const nameEl = document.getElementById('matches-sidebar-name');
  const subtitleEl = document.getElementById('matches-sidebar-subtitle');
  if (nameEl) nameEl.textContent = user.name || 'SkillSwap Member';
  if (subtitleEl) subtitleEl.textContent = user.school && user.degree
    ? `${user.school} · ${user.degree}` : user.school || user.degree || 'SkillSwap Member';
  renderAvatar(document.getElementById('matches-sidebar-avatar'), user);

  // Render matches
  renderMatches(user);

  const logoutBtn = document.getElementById('matches-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      clearCurrentUser();
      window.location.href = PAGES.home;
    });
  }
}

function initExplorePage() {
  const profileLink = document.querySelector('.user-nav-profile');
  if (!profileLink || !document.getElementById('search-input')) return;

  const user = getCurrentUser();
  if (!user) {
    profileLink.style.display = 'none';
    return;
  }

  const nameEl = document.getElementById('user-display-name');
  if (nameEl) nameEl.textContent = user.name || 'My Account';
  renderAvatar(document.getElementById('nav-avatar'), user, 'profile-photo small');
  initDashboardNavDropdown();
}

function showAccountRequiredModal(onConfirm) {
  // Remove any existing modal
  const existing = document.getElementById('account-required-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'account-required-modal';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <p class="modal-icon" aria-hidden="true">🔒</p>
      <h2 class="modal-title" id="modal-title">Account required</h2>
      <p class="modal-body">You need an account to access the Dashboard. Would you like to create one?</p>
      <div class="modal-actions">
        <button class="modal-btn modal-btn-secondary" id="modal-no-btn">No, stay here</button>
        <button class="modal-btn modal-btn-primary" id="modal-ok-btn">Create account</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  // Animate in
  requestAnimationFrame(() => overlay.classList.add('open'));

  function close() {
    overlay.classList.remove('open');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  }

  document.getElementById('modal-ok-btn').addEventListener('click', () => {
    close();
    onConfirm();
  });
  document.getElementById('modal-no-btn').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
}

function initNavGuards() {
  if (getCurrentUser()) return;

  const mainNav = document.getElementById('main-nav');
  if (!mainNav) return;

  const inPages = window.location.pathname.includes('/pages/');
  const signupHref = inPages ? PAGES.login : 'pages/login.html';

  mainNav.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes('dashboard.html')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        showAccountRequiredModal(() => { window.location.href = signupHref; });
      });
    }
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
  initNavGuards();
  initSearchToggle();
  initExplorePage();
  initDashboard();
  initEditProfile();
  initRequestSkillPage();
  initSettingsPage();
  initExchangeHistory();
  initSuggestedMatches();
  initForgotPassword();
  initPasswordToggle('login-password');
  initPasswordToggle('signup-password');
  initPasswordToggle('forgot-new-password');
  initPasswordToggle('forgot-confirm-password');
  initPasswordToggle('new-password');
  initPasswordToggle('confirm-password');
  initPasswordToggle('current-password');
});
