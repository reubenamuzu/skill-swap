
// ── Dark Mode ──
// Apply saved theme immediately (before DOMContentLoaded) to prevent flash
(function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
})();

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const mainNav = document.getElementById('main-nav');

  if (burgerMenu && mainNav) {
    const burgerImg = burgerMenu.querySelector('img');

    function getBurgerSrc() {
      return document.body.classList.contains('dark-mode')
        ? 'assets/menu-burger-white.png'
        : 'assets/menu-burger.png';
    }

    function getCrossSrc() {
      return document.body.classList.contains('dark-mode')
        ? 'assets/cross-white.png'
        : 'assets/cross.png';
    }

    // Set correct burger icon on load
    if (burgerImg) burgerImg.src = getBurgerSrc();

    function openNav() {
      mainNav.classList.add('open');
      if (burgerImg) burgerImg.src = getCrossSrc();
      burgerMenu.setAttribute('aria-label', 'Close menu');
    }

    function closeNav() {
      mainNav.classList.remove('open');
      if (burgerImg) burgerImg.src = getBurgerSrc();
      burgerMenu.setAttribute('aria-label', 'Open menu');
    }

    burgerMenu.addEventListener('click', e => {
      e.stopPropagation();
      mainNav.classList.contains('open') ? closeNav() : openNav();
    });

    // Close when clicking any link inside the nav
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close when clicking outside the nav/burger
    document.addEventListener('click', e => {
      if (mainNav.classList.contains('open') &&
          !mainNav.contains(e.target) &&
          !burgerMenu.contains(e.target)) {
        closeNav();
      }
    });
  }

  // Hide Navbar on Scroll Down, Show on Scroll Up
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener('scroll', () => {
      // If mobile menu is open, don't hide the header
      if (mainNav && mainNav.classList.contains('open')) return;
      
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scrolling down & past 80px
        header.classList.add('nav-hidden');
      } else {
        // Scrolling up
        header.classList.remove('nav-hidden');
      }
      lastScrollY = window.scrollY;
    });
  }

  // Dark Mode Toggle
  document.querySelectorAll('.theme-toggle, .auth-theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      // Update burger icon to match new theme (only when nav is closed)
      const burgerImg = document.querySelector('#burger-menu img');
      const mainNavEl = document.getElementById('main-nav');
      if (burgerImg && mainNavEl && !mainNavEl.classList.contains('open')) {
        burgerImg.src = isDark ? 'assets/menu-burger-white.png' : 'assets/menu-burger.png';
      }
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Toggle current FAQ
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ── Index page: auth-aware header ──
  if (document.getElementById('join-now-btn')) {
    const user = getCurrentUser();
    if (user) {
      const btn = document.getElementById('join-now-btn');
      const chip = document.createElement('div');
      chip.className = 'nav-profile-chip';
      let avatarHTML;
      if (user.photoUrl) {
        avatarHTML = `<img src="${user.photoUrl}" alt="${user.name || 'Profile'}" class="nav-profile-avatar nav-profile-photo">`;
      } else {
        const initials = user.name
          ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
          : '?';
        avatarHTML = `<div class="nav-profile-avatar">${initials}</div>`;
      }
      chip.innerHTML = `${avatarHTML}<span class="nav-profile-name">${user.name || 'Profile'}</span>`;
      btn.replaceWith(chip);
    }
  }

  // ── Signup ──
  if (document.getElementById('signup-form')) {
    // Redirect already-logged-in users
    if (getCurrentUser()) {
      window.location.href = 'dashboard.html';
    }

    document.getElementById('signup-form').addEventListener('submit', e => {
      e.preventDefault();
      const errorEl = document.getElementById('signup-error');
      errorEl.textContent = '';

      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;

      if (!name) { errorEl.textContent = 'Please enter your name.'; return; }
      if (!validateEmail(email)) { errorEl.textContent = 'Please enter a valid email address.'; return; }
      if (password.length < 8) { errorEl.textContent = 'Password must be at least 8 characters.'; return; }

      const users = getUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        errorEl.textContent = 'An account with this email already exists.';
        return;
      }

      const newUser = {
        id: generateId(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
        school: '',
        degree: '',
        skillsToTeach: [],
        skillsToLearn: [],
        profileComplete: false
      };

      users.push(newUser);
      saveUsers(users);
      setCurrentUser(newUser.id);
      window.location.href = 'create-profile.html';
    });
  }

  // ── Login ──
  if (document.getElementById('login-form')) {
    // Redirect already-logged-in users
    if (getCurrentUser()) {
      window.location.href = 'dashboard.html';
    }

    document.getElementById('login-form').addEventListener('submit', e => {
      e.preventDefault();
      const errorEl = document.getElementById('login-error');
      errorEl.textContent = '';

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      if (!email || !password) {
        errorEl.textContent = 'Please fill in all fields.';
        return;
      }

      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user || user.password !== password) {
        errorEl.textContent = 'Invalid email or password.';
        return;
      }

      setCurrentUser(user.id);
      window.location.href = user.profileComplete ? 'dashboard.html' : 'create-profile.html';
    });
  }

  // ── Create Profile ──
  if (document.getElementById('profile-form')) {
    // Auth guard
    if (!getCurrentUser()) {
      window.location.href = 'login.html';
    } else {
      const user = getCurrentUser();
      if (user.profileComplete) {
        window.location.href = 'dashboard.html';
      }
    }

    let pendingPhotoUrl = null;

    const profilePhotoInput = document.getElementById('profile-photo-input');
    const btnChoosePhoto = document.getElementById('btn-choose-photo');
    const photoPreview = document.getElementById('photo-preview');

    if (btnChoosePhoto && profilePhotoInput) {
      btnChoosePhoto.addEventListener('click', () => profilePhotoInput.click());

      profilePhotoInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) return;
        if (file.size > 2 * 1024 * 1024) {
          alert('Image must be smaller than 2MB.');
          return;
        }
        const reader = new FileReader();
        reader.onload = evt => {
          pendingPhotoUrl = evt.target.result;
          photoPreview.innerHTML = `<img src="${pendingPhotoUrl}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
        profilePhotoInput.value = '';
      });
    }

    const teachTags = [];
    const learnTags = [];

    function initTagInput(wrapperId, tagsArray) {
      const wrapper = document.getElementById(wrapperId);
      if (!wrapper) return;
      const input = wrapper.querySelector('.tag-input');

      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const value = input.value.replace(',', '').trim();
          if (!value || tagsArray.includes(value)) { input.value = ''; return; }

          tagsArray.push(value);

          const tag = document.createElement('div');
          tag.className = 'tag';
          tag.innerHTML = `${value} <span class="material-symbols-outlined" data-tag="${value}">close</span>`;
          wrapper.insertBefore(tag, input);
          input.value = '';
        }
      });

      wrapper.addEventListener('click', e => {
        const closeBtn = e.target.closest('.material-symbols-outlined[data-tag]');
        if (closeBtn) {
          const tagValue = closeBtn.dataset.tag;
          const idx = tagsArray.indexOf(tagValue);
          if (idx > -1) tagsArray.splice(idx, 1);
          closeBtn.closest('.tag').remove();
        }
      });
    }

    initTagInput('teach-tags-wrapper', teachTags);
    initTagInput('learn-tags-wrapper', learnTags);

    document.getElementById('profile-form').addEventListener('submit', e => {
      e.preventDefault();
      const errorEl = document.getElementById('profile-error');
      errorEl.textContent = '';

      const school = document.getElementById('school-input').value.trim();
      const degree = document.getElementById('degree-input').value.trim();

      if (!school) { errorEl.textContent = 'Please enter your school or university.'; return; }
      if (!degree) { errorEl.textContent = 'Please enter your degree or program.'; return; }
      if (teachTags.length === 0) { errorEl.textContent = 'Add at least one skill you can teach.'; return; }

      const users = getUsers();
      const userId = localStorage.getItem('ss_current_user');
      const idx = users.findIndex(u => u.id === userId);
      if (idx === -1) { window.location.href = 'login.html'; return; }

      users[idx].school = school;
      users[idx].degree = degree;
      users[idx].skillsToTeach = teachTags.slice();
      users[idx].skillsToLearn = learnTags.slice();
      users[idx].profileComplete = true;
      users[idx].photoUrl = pendingPhotoUrl || null;
      saveUsers(users);

      window.location.href = 'dashboard.html';
    });
  }

  // ── Dashboard ──
  if (document.getElementById('sidebar-name')) {
    // Auth guard
    if (!getCurrentUser()) {
      window.location.href = 'login.html';
    } else {
      const user = getCurrentUser();

      document.getElementById('sidebar-name').textContent = user.name || 'SkillSwap Member';
      document.getElementById('user-display-name').textContent = user.name || 'My Account';

      // Render skills
      function renderSkillTags(containerId, skills) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (!skills || skills.length === 0) {
          container.innerHTML = '<span class="skills-empty">No skills added yet.</span>';
          return;
        }
        container.innerHTML = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
      }
      renderSkillTags('skills-teach-list', user.skillsToTeach);
      renderSkillTags('skills-learn-list', user.skillsToLearn);

      const subtitle = user.school && user.degree
        ? `${user.school} · ${user.degree}`
        : user.school || user.degree || 'SkillSwap Member';
      document.getElementById('sidebar-subtitle').textContent = subtitle;

      // Render avatars (photo or initials)
      function renderAvatars(u) {
        const initials = getInitials(u.name);

        const sidebarEl = document.getElementById('sidebar-avatar');
        if (u.photoUrl) {
          const img = document.createElement('img');
          img.src = u.photoUrl;
          img.className = 'profile-photo';
          img.alt = u.name;
          img.id = 'sidebar-avatar';
          sidebarEl.replaceWith(img);
        } else {
          sidebarEl.textContent = initials;
        }

        const navEl = document.getElementById('nav-avatar');
        if (u.photoUrl) {
          const img = document.createElement('img');
          img.src = u.photoUrl;
          img.className = 'profile-photo small';
          img.alt = u.name;
          img.id = 'nav-avatar';
          navEl.replaceWith(img);
        } else {
          navEl.textContent = initials;
        }
      }

      renderAvatars(user);

      // Photo upload handler
      const uploadWrapper = document.getElementById('avatar-upload-wrapper');
      const fileInput = document.getElementById('photo-upload-input');

      if (uploadWrapper && fileInput) {
        uploadWrapper.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', e => {
          const file = e.target.files[0];
          if (!file) return;

          if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
          }

          if (file.size > 2 * 1024 * 1024) {
            alert('Image must be smaller than 2MB.');
            return;
          }

          const reader = new FileReader();
          reader.onload = evt => {
            const photoUrl = evt.target.result;
            const users = getUsers();
            const userId = localStorage.getItem(SS_CURRENT_USER_KEY);
            const idx = users.findIndex(u => u.id === userId);
            if (idx === -1) return;
            users[idx].photoUrl = photoUrl;
            saveUsers(users);
            renderAvatars(users[idx]);
          };
          reader.readAsDataURL(file);
          fileInput.value = '';
        });
      }

      document.getElementById('logout-btn').addEventListener('click', e => {
        e.preventDefault();
        clearCurrentUser();
        window.location.href = 'index.html';
      });
    }
  }

});
