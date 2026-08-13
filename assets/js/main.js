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
  var stickyCta = document.querySelector('.mobile-sticky-cta');
  if (stickyCta) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 320) {
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

  // Formulario de contacto — envío real vía FormSubmit (sin backend propio)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot anti-spam: si el campo oculto viene lleno, es un bot — no enviar.
      var honey = form.querySelector('[name="_honey"]');
      if (honey && honey.value) return;

      var success = document.getElementById('form-success');
      var errorBox = document.getElementById('form-error');
      var btn = form.querySelector('button[type="submit"]');
      var originalLabel = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = form.dataset.sending || 'Enviando…'; }
      if (errorBox) errorBox.classList.remove('show');

      var payload = {};
      new FormData(form).forEach(function (value, key) { payload[key] = value; });

      // El action del <form> apunta a formsubmit.co/<email>; usamos su variante /ajax/
      // para poder mostrar el mensaje de éxito sin salir del sitio.
      var ajaxUrl = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

      fetch(ajaxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('request-failed');
          return res.json();
        })
        .then(function () {
          form.style.display = 'none';
          if (success) success.classList.add('show');
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
          if (errorBox) errorBox.classList.add('show');
        });
    });
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

