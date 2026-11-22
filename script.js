(() => {
  'use strict';

  const projectsData = [
    { id: 1, title: 'Crest Group Of Colleges', description: 'A complete website suite for a local school group, featuring course listings, admission forms, and student portals.', longDescription: 'Created three interconnected websites for a local school group, including dynamic course catalogs, online admission forms, and student dashboards.', category: 'web', tech: ['HTML5', 'CSS3', 'JavaScript'], image: 'crest.png', liveLink: 'https://crestgroup.co.zw' },
    { id: 2, title: 'AutoHub', description: 'A multi page website for an automotive customization and car care business in Harare, with a product catalogue, quote requests and a secure admin dashboard for managing products.', longDescription: 'AutoHub is a company website for "Everything Automotive", a business in Borrowdale, Harare offering car customization, body kits, repairs, detailing and restoration. The goal was a professional, fast loading site that shows the services clearly and turns visitors into quote requests', category: 'web', tech: ['HTML5', 'CSS3', 'JavaScript', 'Firebase'], image: 'autohub.jpeg', liveLink: 'https://mengez-emzet.github.io/autoo/' },
    { id: 3, title: 'Tayvisualss', description: 'A website for a Bulawayo-based photography and videography brand offering weddings, events, corporate film, drone cinematography, and product photography. This is a cinematic site that showcases their work, handles client bookings, and includes a full admin-ready structure across 10 pages.', longDescription: 'This one is a full studio website for a Bulawayo-based photography and videography brand.Built entirely from scratch using HTML, CSS, and vanilla JavaScript with no frameworks, the site spans 10 pages covering the full client journey, from discovering the brand on the homepage, browsing the portfolio and case studies, checking pricing packages, reading the FAQ, all the way through to submitting a booking or quote request.', category: 'web', tech: ['HTML5', 'CSS3', 'JavaScript', 'Firebase'], image: 'tayvisualss.jpeg', liveLink: 'https://mengez-emzet.github.io/Tayvisualss/' },
    { id: 4, title: 'AlgoLock', description: 'A risk management bot for forex and synthetic traders using advanced algorithms.', longDescription: 'AlgoLock helps traders manage risk by analyzing market conditions and automatically adjusting position sizes in real time.', category: 'MQL5', tech: ['Python', 'Pandas', 'MQL5', 'C++'], image: 'algo2.png', liveLink: '#' },
    { id: 5, title: 'Big Time Contractors', description: 'A professional website for a local plumbing company with a service booking system.', longDescription: 'A locally focused business website with service listings, booking forms, customer reviews, a completed-project gallery, and SEO-friendly structure.', category: 'web', tech: ['HTML5', 'CSS3', 'JavaScript', 'Formspree'], image: 'bigtime.png', liveLink: 'https://mengez-emzet.github.io/Big-Time-Contractors/BigTimeContractors/' }
  ];

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const body = document.body;
  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

  function observeReveals(scope = document) {
    $$('.reveal', scope).forEach(element => {
      if (revealObserver) revealObserver.observe(element); else element.classList.add('active');
    });
  }

  function projectFallback(index) {
    const palettes = [
      'linear-gradient(135deg,#d9ccff 0%,#f4f1eb 45%,#c9f26d 100%)',
      'linear-gradient(135deg,#1d1d1b 0%,#565650 55%,#d9ccff 100%)',
      'linear-gradient(135deg,#c9f26d 0%,#f4f1eb 50%,#d9ccff 100%)'
    ];
    return palettes[index % palettes.length];
  }

  function renderProjects(category = 'all') {
    const grid = $('#projectsGrid');
    if (!grid) return;
    const projects = category === 'all' ? projectsData : projectsData.filter(project => project.category === category);
    grid.innerHTML = projects.map((project, index) => `
      <article class="project-item reveal" data-category="${project.category}">
        <div class="project-img" style="background-image:url('${project.image}'), ${projectFallback(index)}" role="img" aria-label="${project.title} preview"></div>
        <div class="project-info">
          <span class="project-category">${project.category === 'MQL5' ? 'Automation' : 'Web development'}</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div>
          <a href="#" class="project-link view-more" data-id="${project.id}">View project details <i class="fas fa-arrow-right"></i></a>
        </div>
      </article>`).join('');
    observeReveals(grid);
    $$('.view-more', grid).forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      openProjectModal(Number(link.dataset.id));
    }));
  }

  const projectModal = $('#projectModal');
  function openProjectModal(id) {
    const project = projectsData.find(item => item.id === id);
    if (!project || !projectModal) return;
    $('#modalImg').style.backgroundImage = `url('${project.image}'), ${projectFallback(id)}`;
    $('#modalTitle').textContent = project.title;
    $('#modalDesc').textContent = project.longDescription;
    $('#modalTech').innerHTML = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    const link = $('#modalLink');
    link.href = project.liveLink;
    link.style.display = project.liveLink === '#' ? 'none' : 'inline-flex';
    projectModal.classList.add('active');
    $('.modal-close', projectModal)?.focus();
  }

  function closeModal(modal) { modal?.classList.remove('active'); }
  $('.modal-close')?.addEventListener('click', () => closeModal(projectModal));
  window.addEventListener('click', event => {
    if (event.target === projectModal) closeModal(projectModal);
    if (event.target === resumeModal) closeResume();
  });

  // Theme
  const themeToggle = $('#themeToggle');
  function setTheme(isDark) {
    body.classList.toggle('dark-mode', isDark);
    const icon = $('i', themeToggle);
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (_) {}
  }
  try {
    const saved = localStorage.getItem('theme');
    setTheme(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
  } catch (_) { setTheme(false); }
  themeToggle?.addEventListener('click', () => setTheme(!body.classList.contains('dark-mode')));

  // Mobile navigation
  const hamburger = $('#hamburgerBtn');
  const navLinks = $('#navLinks');
  const overlay = $('#navOverlay');
  function toggleNav(open) {
    hamburger?.classList.toggle('open', open);
    navLinks?.classList.toggle('mobile-open', open);
    hamburger?.setAttribute('aria-expanded', String(open));
    hamburger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    body.classList.toggle('no-scroll', open);
  }
  hamburger?.addEventListener('click', () => toggleNav(!navLinks?.classList.contains('mobile-open')));
  overlay?.addEventListener('click', () => toggleNav(false));
  $$('#navLinks a').forEach(link => link.addEventListener('click', () => toggleNav(false)));

  // Project filtering
  $$('.filter-btn').forEach(button => button.addEventListener('click', () => {
    $$('.filter-btn').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderProjects(button.dataset.category);
  }));

  // WhatsApp service requests
  $$('.service-request-btn').forEach(button => button.addEventListener('click', () => {
    const message = encodeURIComponent(`Hello Mengez Emzet, I'm interested in your *${button.dataset.service}* service. Could you provide more information?`);
    window.open(`https://wa.me/263715222660?text=${message}`, '_blank', 'noopener');
  }));

  // Contact form
  const form = $('#contactForm');
  const feedback = $('#formFeedback');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const submitButton = $('#submitBtn', form);
    const original = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Something went wrong');
      feedback.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Message sent. I’ll be in touch soon.</div>';
      form.reset();
    } catch (error) {
      feedback.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i> ${error.message}. Please email emzetfx@gmail.com.</div>`;
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = original;
      window.setTimeout(() => { feedback.innerHTML = ''; }, 6000);
    }
  });

  // Resume modal
  const resumeModal = $('#resumeModal');
  const resumeFrame = $('#resumeFrame');
  function closeResume() { closeModal(resumeModal); if (resumeFrame) resumeFrame.src = ''; }
  $('#viewResumeBtn')?.addEventListener('click', () => {
    const fileId = '1lZUFS-4PLj4ecsyBttK0XGxUMQYvhUHD';
    resumeFrame.src = `https://drive.google.com/file/d/${fileId}/preview`;
    $('#downloadResumeBtn').href = `https://drive.google.com/uc?export=download&id=${fileId}`;
    resumeModal.classList.add('active');
  });
  $('.resume-modal-close')?.addEventListener('click', closeResume);

  // Smooth anchors and active section
  $$('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', event => {
    const target = $(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  const sections = $$('main section[id]');
  const navAnchors = $$('.nav-links a');
  const navbar = $('.navbar');
  const updateNavbar = () => navbar?.classList.toggle('scrolled', window.scrollY > 18);
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) navAnchors.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Typing-style title is intentionally replaced with stable, readable copy in the new design.
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeModal(projectModal); closeResume(); toggleNav(false); }
  });
  window.addEventListener('load', () => { renderProjects(); observeReveals(); });
})();
