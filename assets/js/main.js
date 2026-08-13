// Gaming Expert Labs — interacciones base (sin dependencias externas)
document.addEventListener('DOMContentLoaded', function () {

  // Menú móvil con backdrop
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.primary');
  var backdrop = document.querySelector('.nav-backdrop');

  if (!backdrop && nav) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  function closeNav() {
    if (nav) nav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('open');
      if (isOpen) {
        closeNav();
      } else {
        nav.classList.add('open');
        if (backdrop) backdrop.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    if (backdrop) backdrop.addEventListener('click', closeNav);

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // Bar flotante fija en móviles (Sticky Bottom CTA)
  // Se oculta al llegar al footer para no superponerse con su contenido (logo/nombre duplicado)
  var stickyCta = document.querySelector('.mobile-sticky-cta');
  var siteFooter = document.querySelector('footer.site');
  if (stickyCta) {
    window.addEventListener('scroll', function () {
      var nearFooter = siteFooter && siteFooter.getBoundingClientRect().top < window.innerHeight;
      if (window.scrollY > 320 && !nearFooter) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    });
  }

  // FAQ acordeón
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Formulario de contacto — mensaje de éxito si la URL vuelve con ?enviado=1
  var form = document.getElementById('contact-form');
  var successBox = document.getElementById('form-success');

  if (window.location.search.indexOf('enviado=1') !== -1 || window.location.search.indexOf('sent=1') !== -1) {
    if (form) form.style.display = 'none';
    if (successBox) successBox.classList.add('show');
  }

  // Revelado suave al hacer scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Filtrado de Pestañas en la Sección de Servicios
  var tabBtns = document.querySelectorAll('.tab-btn');
  var pillarGroups = document.querySelectorAll('.pillar-group');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      pillarGroups.forEach(function (group) {
        if (filter === 'all' || group.dataset.category === filter) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

});

