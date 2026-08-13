// Gaming Expert Labs — interacciones base (sin dependencias externas)
document.addEventListener('DOMContentLoaded', function () {

  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
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

  // Modal de Verificación de Certificados
  var modal = document.getElementById('verify-modal');
  var openBtns = document.querySelectorAll('.open-verify-modal');
  var closeBtns = document.querySelectorAll('.verify-close, .verify-backdrop');
  var verifyForm = document.getElementById('verify-form');
  var verifyResult = document.getElementById('verify-result');

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (modal) modal.classList.remove('active');
    });
  });

  if (verifyForm) {
    verifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (verifyResult) {
        verifyResult.classList.add('show');
      }
    });
  }

});
