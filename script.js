(function() {
    // ===== PROJECTS DATA =====
    const projectsData = [
    {
      id: 1,
      title: "Crest Group Of Colleges",
      description: "A complete website suite for a local school group, featuring course listings, admission forms, and student portals.",
      longDescription: "This project involved creating 3 interconnected websites for a local school group. Features include dynamic course catalogs, online admission forms, student dashboards. The site serves hundreds of students daily.",
      category: "web",
      tech: ["HTML5", "CSS3", "JavaScript"],
      image: "crest.png",
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
      image: "algo2.png",
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
      image: "bigtime.png",
      liveLink: "https://mengez-emzet.github.io/Big-Time-Contractors/BigTimeContractors/",
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

    // ===== MODAL =====
    function openModal(id) {
      const p = projectsData.find(pr=>pr.id===id);
      if(!p) return;
      const modal=document.getElementById('projectModal');
      document.getElementById('modalImg').style.backgroundImage = `url('${p.image}')`;
      document.getElementById('modalTitle').textContent = p.title;
      document.getElementById('modalDesc').textContent = p.longDescription || p.description;
      document.getElementById('modalTech').innerHTML = p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join('');
      document.getElementById('modalLink').href = p.liveLink;
      modal.classList.add('active');
    }
    document.querySelector('.modal-close')?.addEventListener('click',()=>document.getElementById('projectModal').classList.remove('active'));
    window.addEventListener('click',e=>{ if(e.target===document.getElementById('projectModal')) document.getElementById('projectModal').classList.remove('active'); });

    // ===== REVEAL OBSERVER =====
    const revealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('active'); revealObserver.unobserve(e.target); } });
    },{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

    // ===== TYPING =====
    const phrases = ["Mengez Emzet", "A Full-Stack Dev", "A Problem Solver", "A Tech Enthusiast"];
    let phraseIdx=0, charIdx=0, isDeleting=false;
    const typingEl = document.getElementById('typingText');
    function typeEffect() {
      const cur = phrases[phraseIdx];
      if(isDeleting) { typingEl.textContent = cur.substring(0, charIdx-1); charIdx--; }
      else { typingEl.textContent = cur.substring(0, charIdx+1); charIdx++; }
      if(!isDeleting && charIdx===cur.length) { isDeleting=true; setTimeout(typeEffect,2000); return; }
      if(isDeleting && charIdx===0) { isDeleting=false; phraseIdx=(phraseIdx+1)%phrases.length; setTimeout(typeEffect,500); return; }
      setTimeout(typeEffect, isDeleting?50:100);
    }
    if(typingEl) setTimeout(typeEffect,500);

    // ===== THEME =====
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle?.querySelector('i');
    function setTheme(dark) {
      document.body.classList.toggle('dark-mode', dark);
      if(icon) { icon.className = dark ? 'fas fa-sun' : 'fas fa-moon'; }
      try { localStorage.setItem('theme', dark?'dark':'light'); } catch(e){}
    }
    try {
      const saved = localStorage.getItem('theme');
      const prefers = window.matchMedia('(prefers-color-scheme:dark)').matches;
      if(saved==='dark' || (!saved && prefers)) setTheme(true);
    } catch(e){}
    themeToggle?.addEventListener('click', ()=>{
      const dark = !document.body.classList.contains('dark-mode');
      setTheme(dark);
    });

    // ===== MOBILE NAV =====
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
    function toggleNav(open) {
      hamburger?.classList.toggle('open', open);
      navLinks?.classList.toggle('mobile-open', open);
      overlay?.classList.toggle('show', open);
      hamburger?.setAttribute('aria-expanded', open?'true':'false');
      document.body.classList.toggle('no-scroll', open);
    }
    hamburger?.addEventListener('click', ()=>{
      const isOpen = navLinks?.classList.contains('mobile-open');
      toggleNav(!isOpen);
    });
    overlay?.addEventListener('click', ()=>toggleNav(false));
    navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleNav(false)));

    // ===== FILTER =====
    document.querySelectorAll('.filter-btn').forEach(btn=>{
      btn.addEventListener('click', function(){
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        this.classList.add('active');
        renderProjects(this.dataset.category);
      });
    });

    // ===== SERVICES WHATSAPP =====
    document.querySelectorAll('.service-request-btn').forEach(btn=>{
      btn.addEventListener('click', function(){
        const service = this.dataset.service;
        const msg = encodeURIComponent(`Hello Mengez Emzet, I'm interested in your *${service}* service. Could you provide more information?`);
        window.open(`https://wa.me/263715222660?text=${msg}`, '_blank');
      });
    });

    // ===== FORM =====
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    form?.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
      const fd = new FormData(form);
      try {
        const res = await fetch(form.action, { method:'POST', body:fd, headers:{'Accept':'application/json'} });
        if(res.ok) { feedback.innerHTML='<div class="success-message"><i class="fas fa-check-circle"></i> Message sent! I\'ll get back soon.</div>'; form.reset(); }
        else throw new Error('Submission failed');
      } catch(err) { feedback.innerHTML=`<div class="error-message"><i class="fas fa-exclamation-circle"></i> ${err.message}. Please email emzetfx@gmail.com</div>`; }
      finally { btn.innerHTML=orig; btn.disabled=false; setTimeout(()=>feedback.innerHTML='',5000); }
    });

    // ===== RESUME MODAL =====
    const resumeBtn = document.getElementById('viewResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const resumeFrame = document.getElementById('resumeFrame');
    const resumeClose = document.querySelector('.resume-modal-close');
    const FILE_ID = '1lZUFS-4PLj4ecsyBttK0XGxUMQYvhUHD';
    resumeBtn?.addEventListener('click', ()=>{
      resumeFrame.src = `https://drive.google.com/file/d/${FILE_ID}/preview`;
      resumeModal.classList.add('active');
      document.getElementById('downloadResumeBtn').href = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;
    });
    resumeClose?.addEventListener('click', ()=>{ resumeModal.classList.remove('active'); resumeFrame.src=''; });
    window.addEventListener('click', e=>{ if(e.target===resumeModal){ resumeModal.classList.remove('active'); resumeFrame.src=''; } });

    // ===== SMOOTH SCROLL & ACTIVE LINK =====
    document.querySelectorAll('.nav-links a, .btn-primary, .btn-outline').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href && href.startsWith('#')){
          e.preventDefault();
          const target = document.querySelector(href);
          if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
    function updateActive() {
      const sections = document.querySelectorAll('section');
      const links = document.querySelectorAll('.nav-links a');
      let current = '';
      const scroll = window.scrollY + 150;
      sections.forEach(s=>{
        const top = s.offsetTop, bottom=top+s.offsetHeight;
        if(scroll>=top && scroll<bottom) current=s.id;
      });
      links.forEach(l=>{
        l.classList.toggle('active', l.getAttribute('href').substring(1)===current);
      });
    }
    window.addEventListener('scroll', updateActive);
    window.addEventListener('load', ()=>{ renderProjects('all'); updateActive(); });

  })();