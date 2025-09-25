// assets/JS/cart.js
const KEY = "cart";

export function getCart() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function setCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  updateCartBadge();
}

export function updateCartBadge() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const cart = getCart();
  el.textContent = cart.reduce((a,i)=>a + (i.qty||0), 0);
}

export function addToCart(id, qty=1, extraData={}) {
  if (!id) return;
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx >= 0) {
    cart[idx].qty = (cart[idx].qty || 0) + qty;
  } else {
    cart.push({ id, qty, ...extraData });
  }
  setCart(cart);
}

export function removeFromCart(id, containerSelector="#carrito-lista") {
  setCart(getCart().filter(i => i.id !== id));
  renderCart(containerSelector);
  updateCartBadge();
}


export function clearCart() {
  setCart([]);
}

export function renderCart(containerSelector="#carrito-lista") {
  const cont = document.querySelector(containerSelector);
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
    btn.addEventListener("click", () => removeFromCart(btn.dataset.remove, containerSelector));
  });
}

function formatCLP(n){
  return n.toLocaleString("es-CL", { style:"currency", currency:"CLP" });
}
