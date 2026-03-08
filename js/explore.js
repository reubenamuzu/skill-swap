const SKILLS_DATA = [
  {
    id: 1,
    title: 'UI/UX Design',
    description: 'Master Figma and learn user-centric design principles for modern applications.',
    category: 'Design',
    rating: 4.9,
    reviews: 87,
    instructor: 'Sarah Jenkins',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMQEraWLyTowWwGLsAPSQYRDVZ3zNkd3uHLVMswaNTE-Tw6hzatUkNjl06qoA9spxRx5pLOgwHB9rmjhq0dU3yUVVt_k4t7o_epLcqaijq8AGi13pEQPoKzvsLJlBXDWxB4LTDvJ4U-lsnSMJvsWGRvbg2No9-sg9n_GwdEwgBR89mHXNtS6BkIXrMvlipsTsOfYIaml2wqxss5z8tk6iWIhhX9kv8agMT9UCasWG-cl5q1k5nopu4FOWhGa8IVwMDfZ6WrmMyDOM',
    image: 'assets/ui_ux_design.png',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Python Programming',
    description: 'Go from zero to hero in Python. Focus on data science and automation basics.',
    category: 'Development',
    rating: 4.8,
    reviews: 124,
    instructor: 'David Chen',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZQr8NeDcj0vzMrW4JKPUvQzuNO3d5-aPPM4nrkTeMmPrEMxy8js4f5pfUZZ_VFJunUQfr2YafzMWMXTNdjSCXj0OqxilF74GUlLxCFClkyA8jFHrdUZ-sdIBF4oVW0L-U8Dpm0AXX0AfDKo-Kn4r5HZL_BMTRe5S9DIxf0UogZKDn9hitS0MbEhWYO1VK-AMKTGTVi14Y0uidIikjpGXURb07YRVjHFyTkOP9cq1TTWOikj5KlZzi7DJsCA1DzpzH2fhMJyFLzk',
    image: 'assets/python_programming.png',
    createdAt: '2024-01-20'
  },
  {
    id: 3,
    title: 'Spanish Conversation',
    description: 'Improve your fluency through casual dialogue with native speakers.',
    category: 'Language',
    rating: 5.0,
    reviews: 63,
    instructor: 'Elena Rodriguez',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV25Ys-syTomckdeXfKHPavW_Mk7w7c6OJwhx-UtZ09zzrKEtTtyGStfylkiv_kKEkHlRLnUDWF_TkdCY5piWwq_kXeG-R5ubYAxR8yEx1N1EGyjFnllOL9_UTAR39Uo9iQssdRkvnILs_vkIF-o5iCJyj8sxqORhYddS6CoBa7nZC5fnTAofTPLBSfHeRDhoqr3dk7CgmIgkLDzyC66yN72f1Zu6L6ZSHPPsr5tT0PnZMRly-JBBacNf35e5iqnA1ym1hnAksCLY',
    image: 'assets/spanish_conversation.png',
    createdAt: '2024-02-03'
  },
  {
    id: 4,
    title: 'Digital Marketing',
    description: 'Learn SEO, SEM and social media strategies to grow your online presence.',
    category: 'Marketing',
    rating: 4.5,
    reviews: 52,
    instructor: 'Marcus Sterling',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMQEraWLyTowWwGLsAPSQYRDVZ3zNkd3uHLVMswaNTE-Tw6hzatUkNjl06qoA9spxRx5pLOgwHB9rmjhq0dU3yUVVt_k4t7o_epLcqaijq8AGi13pEQPoKzvsLJlBXDWxB4LTDvJ4U-lsnSMJvsWGRvbg2No9-sg9n_GwdEwgBR89mHXNtS6BkIXrMvlipsTsOfYIaml2wqxss5z8tk6iWIhhX9kv8agMT9UCasWG-cl5q1k5nopu4FOWhGa8IVwMDfZ6WrmMyDOM',
    image: 'assets/digital_marketing.png',
    createdAt: '2024-02-10'
  },
  {
    id: 5,
    title: 'Data Science with R',
    description: 'Analyze complex datasets and create beautiful visualizations with R.',
    category: 'Data Science',
    rating: 4.7,
    reviews: 98,
    instructor: 'Julianna Moss',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZQr8NeDcj0vzMrW4JKPUvQzuNO3d5-aPPM4nrkTeMmPrEMxy8js4f5pfUZZ_VFJunUQfr2YafzMWMXTNdjSCXj0OqxilF74GUlLxCFClkyA8jFHrdUZ-sdIBF4oVW0L-U8Dpm0AXX0AfDKo-Kn4r5HZL_BMTRe5S9DIxf0UogZKDn9hitS0MbEhWYO1VK-AMKTGTVi14Y0uidIikjpGXURb07YRVjHFyTkOP9cq1TTWOikj5KlZzi7DJsCA1DzpzH2fhMJyFLzk',
    image: 'assets/data_science.png',
    createdAt: '2024-02-18'
  },
  {
    id: 6,
    title: 'Portrait Photography',
    description: 'Capture stunning portraits using natural light, composition and posing techniques.',
    category: 'Photography',
    rating: 4.9,
    reviews: 71,
    instructor: 'Oliver Twist',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV25Ys-syTomckdeXfKHPavW_Mk7w7c6OJwhx-UtZ09zzrKEtTtyGStfylkiv_kKEkHlRLnUDWF_TkdCY5piWwq_kXeG-R5ubYAxR8yEx1N1EGyjFnllOL9_UTAR39Uo9iQssdRkvnILs_vkIF-o5iCJyj8sxqORhYddS6CoBa7nZC5fnTAofTPLBSfHeRDhoqr3dk7CgmIgkLDzyC66yN72f1Zu6L6ZSHPPsr5tT0PnZMRly-JBBacNf35e5iqnA1ym1hnAksCLY',
    image: 'assets/photography_lens.png',
    createdAt: '2024-03-01'
  },
  {
    id: 7,
    title: 'Guitar for Beginners',
    description: 'Learn chords, strumming patterns and your first songs on acoustic guitar.',
    category: 'Music',
    rating: 4.6,
    reviews: 45,
    instructor: 'Leo Navarro',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMQEraWLyTowWwGLsAPSQYRDVZ3zNkd3uHLVMswaNTE-Tw6hzatUkNjl06qoA9spxRx5pLOgwHB9rmjhq0dU3yUVVt_k4t7o_epLcqaijq8AGi13pEQPoKzvsLJlBXDWxB4LTDvJ4U-lsnSMJvsWGRvbg2No9-sg9n_GwdEwgBR89mHXNtS6BkIXrMvlipsTsOfYIaml2wqxss5z8tk6iWIhhX9kv8agMT9UCasWG-cl5q1k5nopu4FOWhGa8IVwMDfZ6WrmMyDOM',
    image: 'assets/ui_ux_design.png',
    createdAt: '2024-03-08'
  },
  {
    id: 8,
    title: 'Italian Cooking',
    description: 'Master pasta, risotto and classic Italian dishes with authentic recipes.',
    category: 'Cooking',
    rating: 4.8,
    reviews: 39,
    instructor: 'Gianna Moretti',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV25Ys-syTomckdeXfKHPavW_Mk7w7c6OJwhx-UtZ09zzrKEtTtyGStfylkiv_kKEkHlRLnUDWF_TkdCY5piWwq_kXeG-R5ubYAxR8yEx1N1EGyjFnllOL9_UTAR39Uo9iQssdRkvnILs_vkIF-o5iCJyj8sxqORhYddS6CoBa7nZC5fnTAofTPLBSfHeRDhoqr3dk7CgmIgkLDzyC66yN72f1Zu6L6ZSHPPsr5tT0PnZMRly-JBBacNf35e5iqnA1ym1hnAksCLY',
    image: 'assets/spanish_conversation.png',
    createdAt: '2024-03-15'
  },
  {
    id: 9,
    title: 'Figma Prototyping',
    description: 'Build interactive prototypes and design systems with Figma components.',
    category: 'Design',
    rating: 4.7,
    reviews: 56,
    instructor: 'Sarah Jenkins',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMQEraWLyTowWwGLsAPSQYRDVZ3zNkd3uHLVMswaNTE-Tw6hzatUkNjl06qoA9spxRx5pLOgwHB9rmjhq0dU3yUVVt_k4t7o_epLcqaijq8AGi13pEQPoKzvsLJlBXDWxB4LTDvJ4U-lsnSMJvsWGRvbg2No9-sg9n_GwdEwgBR89mHXNtS6BkIXrMvlipsTsOfYIaml2wqxss5z8tk6iWIhhX9kv8agMT9UCasWG-cl5q1k5nopu4FOWhGa8IVwMDfZ6WrmMyDOM',
    image: 'assets/ui_ux_design.png',
    createdAt: '2024-03-22'
  },
  {
    id: 10,
    title: 'React Development',
    description: 'Build modern web apps with React hooks, state management and REST APIs.',
    category: 'Development',
    rating: 4.9,
    reviews: 103,
    instructor: 'David Chen',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZQr8NeDcj0vzMrW4JKPUvQzuNO3d5-aPPM4nrkTeMmPrEMxy8js4f5pfUZZ_VFJunUQfr2YafzMWMXTNdjSCXj0OqxilF74GUlLxCFClkyA8jFHrdUZ-sdIBF4oVW0L-U8Dpm0AXX0AfDKo-Kn4r5HZL_BMTRe5S9DIxf0UogZKDn9hitS0MbEhWYO1VK-AMKTGTVi14Y0uidIikjpGXURb07YRVjHFyTkOP9cq1TTWOikj5KlZzi7DJsCA1DzpzH2fhMJyFLzk',
    image: 'assets/python_programming.png',
    createdAt: '2024-04-01'
  },
  {
    id: 11,
    title: 'French Conversation',
    description: 'Develop conversational French skills through structured dialogue practice.',
    category: 'Language',
    rating: 4.8,
    reviews: 44,
    instructor: 'Elena Rodriguez',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV25Ys-syTomckdeXfKHPavW_Mk7w7c6OJwhx-UtZ09zzrKEtTtyGStfylkiv_kKEkHlRLnUDWF_TkdCY5piWwq_kXeG-R5ubYAxR8yEx1N1EGyjFnllOL9_UTAR39Uo9iQssdRkvnILs_vkIF-o5iCJyj8sxqORhYddS6CoBa7nZC5fnTAofTPLBSfHeRDhoqr3dk7CgmIgkLDzyC66yN72f1Zu6L6ZSHPPsr5tT0PnZMRly-JBBacNf35e5iqnA1ym1hnAksCLY',
    image: 'assets/spanish_conversation.png',
    createdAt: '2024-04-08'
  },
  {
    id: 12,
    title: 'SEO Fundamentals',
    description: 'Rank higher on Google with on-page, off-page and technical SEO strategies.',
    category: 'Marketing',
    rating: 4.4,
    reviews: 67,
    instructor: 'Marcus Sterling',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMQEraWLyTowWwGLsAPSQYRDVZ3zNkd3uHLVMswaNTE-Tw6hzatUkNjl06qoA9spxRx5pLOgwHB9rmjhq0dU3yUVVt_k4t7o_epLcqaijq8AGi13pEQPoKzvsLJlBXDWxB4LTDvJ4U-lsnSMJvsWGRvbg2No9-sg9n_GwdEwgBR89mHXNtS6BkIXrMvlipsTsOfYIaml2wqxss5z8tk6iWIhhX9kv8agMT9UCasWG-cl5q1k5nopu4FOWhGa8IVwMDfZ6WrmMyDOM',
    image: 'assets/digital_marketing.png',
    createdAt: '2024-04-15'
  },
  {
    id: 13,
    title: 'Data Analysis with Python',
    description: 'Use pandas, numpy and matplotlib to extract insights from real-world datasets.',
    category: 'Data Science',
    rating: 4.6,
    reviews: 88,
    instructor: 'Julianna Moss',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZQr8NeDcj0vzMrW4JKPUvQzuNO3d5-aPPM4nrkTeMmPrEMxy8js4f5pfUZZ_VFJunUQfr2YafzMWMXTNdjSCXj0OqxilF74GUlLxCFClkyA8jFHrdUZ-sdIBF4oVW0L-U8Dpm0AXX0AfDKo-Kn4r5HZL_BMTRe5S9DIxf0UogZKDn9hitS0MbEhWYO1VK-AMKTGTVi14Y0uidIikjpGXURb07YRVjHFyTkOP9cq1TTWOikj5KlZzi7DJsCA1DzpzH2fhMJyFLzk',
    image: 'assets/data_science.png',
    createdAt: '2024-04-22'
  },
  {
    id: 14,
    title: 'Street Photography',
    description: 'Tell compelling visual stories by capturing candid moments in urban environments.',
    category: 'Photography',
    rating: 4.7,
    reviews: 33,
    instructor: 'Oliver Twist',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV25Ys-syTomckdeXfKHPavW_Mk7w7c6OJwhx-UtZ09zzrKEtTtyGStfylkiv_kKEkHlRLnUDWF_TkdCY5piWwq_kXeG-R5ubYAxR8yEx1N1EGyjFnllOL9_UTAR39Uo9iQssdRkvnILs_vkIF-o5iCJyj8sxqORhYddS6CoBa7nZC5fnTAofTPLBSfHeRDhoqr3dk7CgmIgkLDzyC66yN72f1Zu6L6ZSHPPsr5tT0PnZMRly-JBBacNf35e5iqnA1ym1hnAksCLY',
    image: 'assets/photography_lens.png',
    createdAt: '2024-05-01'
  },
  {
    id: 15,
    title: 'Music Theory',
    description: 'Understand scales, chords and harmony to write and play music confidently.',
    category: 'Music',
    rating: 4.5,
    reviews: 29,
    instructor: 'Leo Navarro',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMQEraWLyTowWwGLsAPSQYRDVZ3zNkd3uHLVMswaNTE-Tw6hzatUkNjl06qoA9spxRx5pLOgwHB9rmjhq0dU3yUVVt_k4t7o_epLcqaijq8AGi13pEQPoKzvsLJlBXDWxB4LTDvJ4U-lsnSMJvsWGRvbg2No9-sg9n_GwdEwgBR89mHXNtS6BkIXrMvlipsTsOfYIaml2wqxss5z8tk6iWIhhX9kv8agMT9UCasWG-cl5q1k5nopu4FOWhGa8IVwMDfZ6WrmMyDOM',
    image: 'assets/python_programming.png',
    createdAt: '2024-05-08'
  },
  {
    id: 16,
    title: 'Baking & Pastry',
    description: 'Learn bread baking, croissants, and desserts from scratch with professional tips.',
    category: 'Cooking',
    rating: 4.9,
    reviews: 51,
    instructor: 'Gianna Moretti',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV25Ys-syTomckdeXfKHPavW_Mk7w7c6OJwhx-UtZ09zzrKEtTtyGStfylkiv_kKEkHlRLnUDWF_TkdCY5piWwq_kXeG-R5ubYAxR8yEx1N1EGyjFnllOL9_UTAR39Uo9iQssdRkvnILs_vkIF-o5iCJyj8sxqORhYddS6CoBa7nZC5fnTAofTPLBSfHeRDhoqr3dk7CgmIgkLDzyC66yN72f1Zu6L6ZSHPPsr5tT0PnZMRly-JBBacNf35e5iqnA1ym1hnAksCLY',
    image: 'assets/digital_marketing.png',
    createdAt: '2024-05-15'
  }
];

// ─── State ───────────────────────────────────────────────────────────────────
let currentCategory = 'All';
let currentSort = 'best-rated';
let currentSearch = '';
let currentPage = 1;
function getPageSize() {
  return window.innerWidth <= 640 ? 6 : 8;
}
let searchDebounceTimer = null;

// ─── Filtering & Sorting ─────────────────────────────────────────────────────
function getFilteredSkills() {
  let skills = SKILLS_DATA.slice();

  if (currentCategory !== 'All') {
    skills = skills.filter(s => s.category === currentCategory);
  }

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    skills = skills.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.instructor.toLowerCase().includes(q)
    );
  }

  if (currentSort === 'best-rated') {
    skills.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'most-reviews') {
    skills.sort((a, b) => b.reviews - a.reviews);
  } else if (currentSort === 'newest') {
    skills.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return skills;
}

// ─── Card HTML ────────────────────────────────────────────────────────────────
function buildCardHTML(skill) {
  return `
    <div class="explore-card">
      <img src="${skill.image}" alt="${skill.title}" class="explore-card-img">
      <div class="explore-card-body">
        <div class="explore-card-header">
          <h3 class="explore-card-title">${skill.title}</h3>
          <div class="explore-card-rating">
            <span class="material-symbols-outlined">star</span>
            ${skill.rating.toFixed(1)}
          </div>
        </div>
        <p class="explore-card-desc">${skill.description}</p>
        <div class="explore-card-instructor">
          <img src="${skill.instructorAvatar}" alt="${skill.instructor}">
          <span>${skill.instructor}</span>
          <span class="explore-card-reviews">${skill.reviews} reviews</span>
        </div>
        <div class="explore-card-actions">
          <button class="btn-details" onclick="openModal(${skill.id})">More Details</button>
          <button class="btn-request" onclick="window.location.href='request-skill.html'">Request Skill</button>
        </div>
      </div>
    </div>
  `;
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function renderPagination(totalPages) {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;

  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let html = '';

  // Prev
  html += `<div class="page-item${currentPage === 1 ? ' disabled' : ''}" data-page="prev">
    <span class="material-symbols-outlined">chevron_left</span>
  </div>`;

  // Page numbers with ellipsis logic
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  pages.forEach(p => {
    if (p === '...') {
      html += `<div class="page-item dots">...</div>`;
    } else {
      html += `<div class="page-item${p === currentPage ? ' active' : ''}" data-page="${p}">${p}</div>`;
    }
  });

  // Next
  html += `<div class="page-item${currentPage === totalPages ? ' disabled' : ''}" data-page="next">
    <span class="material-symbols-outlined">chevron_right</span>
  </div>`;

  pagination.innerHTML = html;

  // Attach click handlers
  pagination.querySelectorAll('.page-item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      const p = item.dataset.page;
      if (p === 'prev' && currentPage > 1) {
        currentPage--;
      } else if (p === 'next' && currentPage < totalPages) {
        currentPage++;
      } else if (p !== 'prev' && p !== 'next') {
        currentPage = parseInt(p);
      }
      renderGrid();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// ─── Grid Render ──────────────────────────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const filtered = getFilteredSkills();
  const pageSize = getPageSize();
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * pageSize;
  const pageSlice = filtered.slice(start, start + pageSize);

  if (pageSlice.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">
          <span class="material-symbols-outlined">search_off</span>
        </div>
        <h3>No skills found</h3>
        <p>Try a different search term or category.</p>
      </div>
    `;
  } else {
    grid.innerHTML = pageSlice.map(buildCardHTML).join('');
  }

  renderPagination(filtered.length === 0 ? 1 : totalPages);
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function openModal(id) {
  const skill = SKILLS_DATA.find(s => s.id === id);
  if (!skill) return;

  document.getElementById('modal-img').src = skill.image;
  document.getElementById('modal-img').alt = skill.title;
  document.getElementById('modal-category').textContent = skill.category;
  document.getElementById('modal-rating').textContent = skill.rating.toFixed(1);
  document.getElementById('modal-title').textContent = skill.title;
  document.getElementById('modal-desc').textContent = skill.description;
  document.getElementById('modal-instructor-avatar').src = skill.instructorAvatar;
  document.getElementById('modal-instructor-avatar').alt = skill.instructor;
  document.getElementById('modal-instructor-name').textContent = skill.instructor;
  document.getElementById('modal-reviews').textContent = skill.reviews + ' reviews';

  document.getElementById('skill-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('skill-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Filter Toggle (mobile) ───────────────────────────────────────────────────
function initFilterToggle() {
  const moreBtn = document.getElementById('filter-tab-more');
  if (!moreBtn) return;

  const filterBar = document.getElementById('filter-bar');
  const tabs = [...filterBar.querySelectorAll('.filter-tab:not(#filter-tab-more)')];
  const VISIBLE_COUNT = 4;

  function applyToggle() {
    if (window.innerWidth > 767) {
      tabs.forEach(t => t.classList.remove('filter-tab-hidden'));
      moreBtn.style.display = 'none';
      return;
    }
    const expanded = moreBtn.dataset.expanded === 'true';
    tabs.forEach((t, i) => {
      if (i < VISIBLE_COUNT || expanded) {
        t.classList.remove('filter-tab-hidden');
      } else {
        t.classList.add('filter-tab-hidden');
      }
    });
    moreBtn.style.display = '';
    moreBtn.textContent = expanded ? 'Show less' : 'Show more';
  }

  moreBtn.addEventListener('click', () => {
    moreBtn.dataset.expanded = moreBtn.dataset.expanded === 'true' ? 'false' : 'true';
    applyToggle();
  });

  applyToggle();
  window.addEventListener('resize', applyToggle);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('skills-grid')) return;

  // Category filter tabs
  document.querySelectorAll('.filter-tab:not(#filter-tab-more)').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      currentPage = 1;
      renderGrid();
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      currentSort = e.target.value;
      currentPage = 1;
      renderGrid();
    });
  }

  // Search input (debounced)
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        currentSearch = e.target.value.trim();
        currentPage = 1;
        renderGrid();
      }, 300);
    });
  }

  // Filter show more toggle
  initFilterToggle();

  // Modal close triggers
  const modal = document.getElementById('skill-modal');
  if (modal) {
    document.getElementById('modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Initial render
  renderGrid();
});
