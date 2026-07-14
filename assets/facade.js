/* vitrine facade: store closed, all items sold out */
(function () {
  // Cart is always empty on the facade. Intercept the theme's Shopify AJAX cart
  // calls so they resolve locally (no 404s) at any host path.
  var EMPTY_CART = '{"token":"facade","note":null,"attributes":{},"original_total_price":0,"total_price":0,"total_discount":0,"total_weight":0,"item_count":0,"items":[],"requires_shipping":false,"currency":"GBP","items_subtotal_price":0,"cart_level_discount_applications":[]}';
  if (window.fetch) {
    var _fetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      var url = (typeof input === 'string') ? input : (input && input.url) || '';
      if (/cart\.js(\?|$)/.test(url) || /\/cart\/(add|change|update|clear)(\.js)?(\?|$)/.test(url)) {
        return Promise.resolve(new Response(EMPTY_CART, { status: 200, headers: { 'Content-Type': 'application/json' } }));
      }
      return _fetch(input, init);
    };
  }
  function neutralize(e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;
    var a = (f.getAttribute('action') || '').toLowerCase();
    var neutral = /\/cart|\/contact|\/localization|\/account|\/checkout/.test(a) ||
                  f.matches('[data-type="add-to-cart-form"], .newsletter-form, .localization-form, form[action*="cart"]');
    if (neutral) { e.preventDefault(); e.stopPropagation(); }
  }
  document.addEventListener('submit', neutralize, true);
  function lock() {
    document.querySelectorAll(
      'button[name="add"], .shopify-payment-button, [name="checkout"], ' +
      '.cart__checkout-button, .cart__checkout, #checkout'
    ).forEach(function (b) {
      b.setAttribute('disabled', 'disabled');
      b.setAttribute('aria-disabled', 'true');
    });
  }
  if (document.readyState !== 'loading') lock();
  document.addEventListener('DOMContentLoaded', lock);
})();
