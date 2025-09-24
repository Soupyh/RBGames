// assets/JS/shared-header-footer.js
document.addEventListener("DOMContentLoaded", () => {
  // --- Cálculo de base para rutas relativas ---
  function computeBase() {
    // Normaliza slashes para file:// y http://
    const p = location.pathname.replace(/\\/g, "/");
    const dirs = p.split("/").filter(Boolean);
    // Quitamos el archivo (último segmento)
    dirs.pop();

    // Si estás dentro de /admin/... sube un nivel
    if (dirs.includes("admin")) return "../";

    // Para tus páginas en raíz (index.html, producto.html, etc.) no hace falta subir
    return "";
  }
  const base = computeBase();

  // Helpers
  const H = (p) => `${base}${p}`;  // construye hrefs relativos
  const getCart = () => {
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
    catch { return []; }
  };
  const cartCountEl = () => document.getElementById("cart-count");
  const updateBadge = () => {
    const el = cartCountEl();
    if (!el) return;
    const total = getCart().reduce((s, i) => s + (i.qty || 0), 0);
    el.textContent = String(total);
  };

  // --- Inyección de Header / Footer ---
  const header = document.querySelector("header[data-shared]");
  const footer = document.querySelector("footer[data-shared]");

  if (header) {
    header.innerHTML = `
      <div class="container nav">
        <a class="logo" href="${H("index.html")}">RBGames</a>
        <nav>
          <ul>
            <li><a data-link="index.html"    href="${H("index.html")}">Inicio</a></li>
            <li><a data-link="producto.html" href="${H("producto.html")}">Productos</a></li>
            <li><a data-link="blog.html"     href="${H("blog.html")}">Blog</a></li>
            <li><a data-link="nosotros.html" href="${H("nosotros.html")}">Nosotros</a></li>
            <li><a data-link="contacto.html" href="${H("contacto.html")}">Contacto</a></li>
            <li><a data-link="login.html"    href="${H("login.html")}">Login</a></li>
            <li><a data-link="registro.html" href="${H("registro.html")}">Registro</a></li>
          </ul>
        </nav>
        <a class="cart-link" href="${H("producto.html")}#carrito">🛒 <span id="cart-count">0</span></a>
      </div>`;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="container footer">
        <p>&copy; ${new Date().getFullYear()} RBGames — Todos los derechos reservados.</p>
      </div>`;
  }

  // --- Marcar link activo ---
  (function markActive() {
    const path = location.pathname.replace(/\\/g, "/");
    const current = (path.split("/").pop() || "index.html") || "index.html";

    document.querySelectorAll('nav a[data-link]').forEach(a => {
      const target = a.getAttribute("data-link");
      if (target === current) a.classList.add("active");
      else a.classList.remove("active");
    });
  })();

  // --- Badge inicial ---
  updateBadge();

  // --- Refrescar badge cuando cambia el carrito (misma o distinta pestaña) ---
  try {
    window.addEventListener("rb:cart", updateBadge);
    window.addEventListener("storage", (e) => {
      if (e.key === "cart") updateBadge();
    });
  } catch {}
});
