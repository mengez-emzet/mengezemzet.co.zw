/* ============================================ */
  /* 1. PROJECTS DATA (with categories for filtering) */
  /* ============================================ */
  const projectsData = [
    {
      id: 1,
      title: "Crest Group Of Colleges",
      description: "A complete website suite for a local school group, featuring course listings, admission forms, and student portals.",
      longDescription: "This project involved creating 3 interconnected websites for a local school group. Features include dynamic course catalogs, online admission forms, student dashboards. The site serves hundreds of students daily.",
      category: "web",
      tech: ["HTML5", "CSS3", "JavaScript"],
      image: "./images/crest.png",
      liveLink: "https://crestgroup.co.zw",
      githubLink: "#"
    },
    {
      id: 3,
      title: "AlgoLock",
      description: "A risk management bot for forex and synthetic traders using advanced algorithms.",
      longDescription: "AlgoLock is a sophisticated trading bot that helps forex traders manage risk. It analyzes market conditions in real-time and automatically adjusts position sizes.",
      category: "MQL5",
      tech: ["Python", "Pandas", "MQL5", "C++"],
      image: "images/algo2.png",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 4,
      title: "Big Time Contractors",
      description: "A professional website for a local plumbing company with service booking system.",
      longDescription: "This website for Big Time Contractors includes service listings, online booking forms, customer reviews, and a gallery of completed projects. Optimized for local SEO.",
      category: "web",
      tech: ["HTML5", "CSS3", "JavaScript", "Formspree"],
      image: "images/bigtime.png",
      liveLink: "https://bigtimecontractors.co.zw",
      githubLink: "#"
    }
  ];

  /* ============================================ */
  /* 2. FUNCTION TO RENDER PROJECTS (with filtering) */
  /* ============================================ */
  function renderProjects(category = "all") {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    const filteredProjects = category === "all" 
      ? projectsData 
      : projectsData.filter(project => project.category === category);
    
    grid.innerHTML = filteredProjects.map(project => `
      <div class="project-item reveal" data-category="${project.category}">
        <div class="project-img" style="background-image: url('${project.image}'); background-size: cover; background-position: center;">
          ${!project.image ? '<i class="fas fa-code"></i>' : ''}
        </div>
        <div class="project-info">
          <span class="project-category">${project.category.toUpperCase()}</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <a class="project-link view-more" data-id="${project.id}">View Details <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    `).join('');
    
    const newProjectItems = document.querySelectorAll('.projects-grid .project-item');
    newProjectItems.forEach(el => {
      revealObserver.observe(el);
    });
    
    document.querySelectorAll('.view-more').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const projectId = parseInt(btn.dataset.id);
        openModal(projectId);
      });
    });
  }
  
  /* ============================================ */
  /* 3. MODAL FUNCTIONALITY */
  /* ============================================ */
  function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTech = document.getElementById('modalTech');
    const modalLink = document.getElementById('modalLink');
    
    modalImg.style.backgroundImage = project.image ? `url('${project.image}')` : 'linear-gradient(145deg, #2a2a2a, #0a0a0a)';
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.longDescription || project.description;
    modalTech.innerHTML = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    modalLink.href = project.liveLink;
    
    modal.classList.add('active');
  }
  
  document.querySelector('.modal-close')?.addEventListener('click', () => {
    document.getElementById('projectModal').classList.remove('active');
  });
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  /* ============================================ */
  /* 4. SCROLL REVEAL ANIMATIONS */
  /* ============================================ */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  /* ============================================ */
  /* 5. TYPING EFFECT IN HERO */
  /* ============================================ */
  const phrases = ["Mengez Emzet", "A Full-Stack Dev", "A Problem Solver", "A Tech Enthusiast"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingTextElement = document.getElementById('typingText');
  
  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 500);
      return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }
  
  if (typingTextElement) {
    setTimeout(typeEffect, 500);
  }
  
  /* ============================================ */
  /* 6. DARK/LIGHT MODE TOGGLE */
  /* ============================================ */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('i');

  function readSavedTheme() {
    try { return localStorage.getItem('theme'); } catch (err) { return null; }
  }
  function writeSavedTheme(value) {
    try { localStorage.setItem('theme', value); } catch (err) { /* storage unavailable — theme just won't persist */ }
  }

  const savedTheme = readSavedTheme();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeIcon?.classList.remove('fa-moon');
    themeIcon?.classList.add('fa-sun');
  }

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
      themeIcon?.classList.remove('fa-moon');
      themeIcon?.classList.add('fa-sun');
      writeSavedTheme('dark');
    } else {
      themeIcon?.classList.remove('fa-sun');
      themeIcon?.classList.add('fa-moon');
      writeSavedTheme('light');
    }
  });
  
  /* ============================================ */
  /* 6b. MOBILE NAV (hamburger drawer) */
  /* ============================================ */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinksEl = document.querySelector('.nav-links');
  const navOverlay = document.getElementById('navOverlay');

  function closeMobileNav() {
    hamburgerBtn?.classList.remove('open');
    navLinksEl?.classList.remove('mobile-open');
    navOverlay?.classList.remove('show');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }
  function openMobileNav() {
    hamburgerBtn?.classList.add('open');
    navLinksEl?.classList.add('mobile-open');
    navOverlay?.classList.add('show');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }
  hamburgerBtn?.addEventListener('click', () => {
    const isOpen = navLinksEl?.classList.contains('mobile-open');
    isOpen ? closeMobileNav() : openMobileNav();
  });
  navOverlay?.addEventListener('click', closeMobileNav);
  navLinksEl?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ============================================ */
  /* 7. PROJECT FILTERING */
  /* ============================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const category = btn.dataset.category;
      renderProjects(category);
      
      setTimeout(() => {
        document.querySelectorAll('.projects-grid .project-item').forEach(el => {
          revealObserver.observe(el);
        });
      }, 100);
    });
  });
  
  /* ============================================ */
  /* 8. FORMSPREE FORM HANDLING (WORKING - NO DUPLICATES) */
  /* ============================================ */
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const message = document.getElementById('msgInput').value.trim();
      
      // Validation
      if (!name || !email || !message) {
        formFeedback.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Please fill all fields.</div>';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        setTimeout(() => {
          formFeedback.innerHTML = '';
        }, 5000);
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        formFeedback.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Please enter a valid email address.</div>';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        setTimeout(() => {
          formFeedback.innerHTML = '';
        }, 5000);
        return;
      }
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      formData.append('_subject', `Portfolio message from ${name}`);
      
      try {
        const response = await fetch('https://formspree.io/f/xbdbvzow', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          formFeedback.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.</div>';
          contactForm.reset();
        } else {
          const data = await response.json();
          if (data.errors) {
            throw new Error(data.errors.map(error => error.message).join(', '));
          } else {
            throw new Error('Form submission failed');
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        formFeedback.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i> ${error.message}. Please email me directly at emzetfx@gmail.com</div>`;
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        setTimeout(() => {
          if (formFeedback.innerHTML) formFeedback.innerHTML = '';
        }, 5000);
      }
    });
  }
  
  /* ============================================ */
  /* 9. RESUME MODAL FUNCTIONALITY */
  /* ============================================ */
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const resumeFrame = document.getElementById('resumeFrame');
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');
  const resumeCloseBtn = document.querySelector('.resume-modal-close');
  const FILE_ID = '1lZUFS-4PLj4ecsyBttK0XGxUMQYvhUHD';
  
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', () => {
      resumeFrame.src = `https://drive.google.com/file/d/${FILE_ID}/preview`;
      resumeModal.classList.add('active');
      downloadResumeBtn.href = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;
    });
  }
  
  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      resumeFrame.src = '';
    });
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
      resumeFrame.src = '';
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      resumeModal.classList.remove('active');
      resumeFrame.src = '';
    }
  });
  
  /* ============================================ */
  /* 10. SMOOTH SCROLL FOR NAVIGATION */
  /* ============================================ */
  document.querySelectorAll('.nav-links a, .btn-primary, .btn-outline').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
  
  /* ============================================ */
  /* 11. INITIAL RENDER */
  /* ============================================ */
  renderProjects('all');

  setTimeout(() => {
    const initialProjects = document.querySelectorAll('.projects-grid .project-item');
    initialProjects.forEach(el => {
      revealObserver.observe(el);
    });
  }, 100);

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      
      if (href === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  window.addEventListener('load', updateActiveNavLink);
  
  console.log("Portfolio loaded...");

  /* ============================================ */
/* 12. SERVICES SECTION - WHATSAPP REQUEST */
/* ============================================ */
const whatsappNumber = '263715222660'; // Your WhatsApp number without '+'

function setupServiceButtons() {
  const serviceButtons = document.querySelectorAll('.service-request-btn');
  
  serviceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const serviceName = button.getAttribute('data-service');
      const preMessage = `Hello Mengez Emzet, I'm interested in your *${serviceName}* service. Could you please provide more information about pricing and availability?`;
      const encodedMessage = encodeURIComponent(preMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    });
  });
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupServiceButtons();
});