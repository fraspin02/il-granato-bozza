// Shop solo dimostrativo: aggiorna il contatore del carrello, nessun ordine né pagamento.
(function () {
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
    if (!btn) return;
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
})();
