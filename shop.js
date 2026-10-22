// Menu a tutto schermo, shop dimostrativo (solo contatore, nessun ordine) e modulo contatti che apre WhatsApp.
(function () {
  // Menu
  var menu = document.getElementById('menu');
  var opener = document.querySelector('[data-menu-open]');
  if (menu && opener) {
    opener.addEventListener('click', function () {
      if (menu.showModal) menu.showModal(); else menu.setAttribute('open', '');
      opener.setAttribute('aria-expanded', 'true');
    });
    menu.addEventListener('close', function () { opener.setAttribute('aria-expanded', 'false'); opener.focus(); });
    menu.addEventListener('click', function (e) {
      if (e.target === menu || e.target.closest('[data-menu-close]')) menu.close ? menu.close() : menu.removeAttribute('open');
    });
  }

  // Carrello finto
  var count = 0;
  var badge = document.querySelector('[data-cart-count]');
  var cart = badge && badge.closest('.cart');
  var toast = document.querySelector('.toast');
  var timer;

  function show(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(function () { toast.hidden = true; }, 2600);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add]');
    if (!btn || !badge) return;
    var qty = document.querySelector('[data-qty]');
    count += qty ? parseInt(qty.value, 10) || 1 : 1;
    badge.textContent = count;
    cart.classList.remove('bump'); void cart.offsetWidth; cart.classList.add('bump');
    show('Aggiunto al carrello · anteprima, ordini non ancora attivi');
  });

  // Scheda prodotto: quantità, formato e galleria
  document.querySelectorAll('[data-step]').forEach(function (b) {
    b.addEventListener('click', function () {
      var input = document.querySelector('[data-qty]');
      input.value = Math.max(1, Math.min(20, (parseInt(input.value, 10) || 1) + parseInt(b.dataset.step, 10)));
    });
  });
  document.querySelectorAll('[name="formato"]').forEach(function (r) {
    r.addEventListener('change', function () {
      document.querySelectorAll('[data-formato]').forEach(function (el) { el.textContent = r.value; });
    });
  });
  var main = document.querySelector('[data-main]');
  document.querySelectorAll('[data-thumb]').forEach(function (t) {
    t.addEventListener('click', function () {
      main.src = t.dataset.thumb;
      main.alt = t.querySelector('img').alt;
      main.removeAttribute('srcset');
      document.querySelectorAll('[data-thumb]').forEach(function (x) { x.setAttribute('aria-pressed', x === t); });
    });
  });

  // Newsletter: solo anteprima, l'iscrizione verrà collegata a un servizio email
  document.querySelectorAll('[data-news]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      show("Grazie! Anteprima: l'iscrizione non è ancora attiva");
      f.reset();
    });
  });

  // Contatti: il modulo prepara il messaggio e apre WhatsApp
  var form = document.querySelector('[data-wa-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var text = 'Buongiorno, sono ' + d.get('nome') + ' (' + d.get('chi') + '). ' + d.get('messaggio');
      window.open('https://wa.me/393397919437?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }
})();
