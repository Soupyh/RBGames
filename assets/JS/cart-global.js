// assets/JS/cart-global.js
(function () {
  const KEY = "cart";
  function getCart() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  }
  function setCart(cart) {
    localStorage.setItem(KEY, JSON.stringify(cart));
    updateCartBadge();
    try { window.dispatchEvent(new CustomEvent("rb:cart")); } catch {}
  }
  function addToCart(id, qty = 1, meta = {}) {
    const cart = getCart();
    const i = cart.findIndex(x => x.id === id);
    if (i >= 0) cart[i].qty += qty;
    else cart.push({ id, qty, ...meta });
    setCart(cart);
  }
  function removeFromCart(id) {
    const cart = getCart().filter(i => i.id !== id);
    setCart(cart);
  }
  function clearCart(){ setCart([]); }
  function formatCLP(n){
    return Number(n||0).toLocaleString("es-CL",{style:"currency",currency:"CLP"});
  }
  function renderCart(selector="#carrito-lista") {
    const cont = document.querySelector(selector);
    if (!cont) return;
    const cart = getCart();
    if (cart.length === 0) {
      cont.innerHTML = `<p>Tu carrito está vacío.</p>`;
      return;
    }
    const rows = cart.map(i => `
      <tr>
        <td>${i.name ?? "Producto "+i.id}</td>
        <td>${i.qty}</td>
        <td>${formatCLP(i.price ?? 0)}</td>
        <td>${formatCLP((i.price ?? 0) * (i.qty ?? 0))}</td>
        <td><button data-remove="${i.id}">Eliminar</button></td>
      </tr>`).join("");
    const total = cart.reduce((a,i)=> a + (i.price??0) * (i.qty??0), 0);
    cont.innerHTML = `
      <table class="tabla-carrito">
        <thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td colspan="3">Total</td><td>${formatCLP(total)}</td><td></td></tr></tfoot>
      </table>`;
    cont.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => removeFromCart(btn.dataset.remove));
    });
  }
  function updateCartBadge() {
    const el = document.getElementById("cart-count");
    if (!el) return;
    const count = getCart().reduce((s, x) => s + (x.qty || 0), 0);
    el.textContent = String(count);
  }
  window.addEventListener("storage", (e)=>{ if (e.key===KEY) updateCartBadge(); });
  window.RB = { addToCart, removeFromCart, clearCart, renderCart, updateCartBadge, getCart };
})();