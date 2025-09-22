document.addEventListener("DOMContentLoaded", () => {
  const isAdmin = location.pathname.includes("/admin/");
  const base = isAdmin ? "../" : "";

  const header = document.querySelector("header[data-shared]");
  const footer = document.querySelector("footer[data-shared]");

  if (header) header.innerHTML = `
    <div class="container nav">
      <a class="logo" href="${base}index.html">RBGames</a>
      <nav>
        <ul>
          <li><a href="${base}index.html">Inicio</a></li>
          <li><a href="${base}producto.html">Productos</a></li>
          <li><a href="${base}blog.html">Blog</a></li>
          <li><a href="${base}nosotros.html">Nosotros</a></li>
          <li><a href="${base}contacto.html">Contacto</a></li>
          <li><a href="${base}login.html">Login</a></li>
          <li><a href="${base}registro.html">Registro</a></li>
        </ul>
      </nav>
      <a class="cart-link" href="${base}producto.html#carrito">🛒 <span id="cart-count">0</span></a>
    </div>`;

  if (footer) footer.innerHTML = `
    <div class="container footer">
      <p>&copy; ${new Date().getFullYear()} RBGames — Todos los derechos reservados.</p>
    </div>`;

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cartCount.textContent = cart.reduce((a,i)=>a + (i.qty||0), 0);
    } catch { cartCount.textContent = "0"; }
  }
});
