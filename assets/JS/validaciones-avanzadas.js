export const allowedDomains = ["duoc.cl","profesor.duoc.cl","gmail.com"];
export function emailDomainOk(value){
  const m = String(value||"").trim().match(/^[^@]+@([^@]+\.[^@]+)$/i);
  if(!m) return false; const host = m[1].toLowerCase();
  return allowedDomains.some(d=>host.endsWith(d));
}
export function validarLogin(form){
  const email=form.email.value.trim(); const pass=form.password.value.trim();
  let ok=true, msgs=[];
  if(!email){ok=false;msgs.push("Correo requerido");}
  if(email && (email.length>100 || !emailDomainOk(email))){ok=false;msgs.push("Dominio permitido: duoc.cl, profesor.duoc.cl o gmail.com");}
  if(!pass){ok=false;msgs.push("Contraseña requerida");}
  if(pass && (pass.length<4 || pass.length>10)){ok=false;msgs.push("Contraseña entre 4 y 10 caracteres");}
  if(!ok) alert(msgs.join("\n")); return ok;
}
export function validarContacto(form){
  const nombre=form.nombre.value.trim(); const correo=form.correo.value.trim(); const comentario=form.comentario.value.trim();
  let ok=true,msgs=[];
  if(!nombre){ok=false;msgs.push("Nombre requerido");}
  if(nombre.length>100){ok=false;msgs.push("Nombre máx 100");}
  if(correo && (correo.length>100 || !emailDomainOk(correo))){ok=false;msgs.push("Correo inválido");}
  if(!comentario){ok=false;msgs.push("Comentario requerido");}
  if(comentario.length>500){ok=false;msgs.push("Comentario máx 500");}
  if(!ok) alert(msgs.join("\n")); return ok;
}
export function validarRUN(run){
  const val=(run||"").toUpperCase().replace(/[^0-9K]/g,"");
  if(val.length<7 || val.length>9) return false;
  const cuerpo=val.slice(0,-1); const dv=val.slice(-1);
  let suma=0,m=2; for(let i=cuerpo.length-1;i>=0;i--){suma+=parseInt(cuerpo[i],10)*m; m = m===7?2:m+1;}
  const dvCalc=11-(suma%11); const dvChar=dvCalc===11?"0":dvCalc===10?"K":String(dvCalc);
  return dvChar===dv;
}
export function validarUsuario(form){
  const run=form.run?.value?.trim()||""; const nombre=form.nombre?.value?.trim()||"";
  const apellidos=form.apellidos?.value?.trim()||""; const correo=form.correo?.value?.trim()||"";
  const direccion=form.direccion?.value?.trim()||"";
  let ok=true,msgs=[];
  if(!run || !validarRUN(run)){ok=false;msgs.push("RUN inválido (sin puntos ni guión)");}
  if(!nombre || nombre.length>50){ok=false;msgs.push("Nombre requerido, máx 50");}
  if(!apellidos || apellidos.length>100){ok=false;msgs.push("Apellidos requeridos, máx 100");}
  if(!correo || correo.length>100 || !emailDomainOk(correo)){ok=false;msgs.push("Correo inválido");}
  if(direccion.length>300){ok=false;msgs.push("Dirección máx 300");}
  if(!ok) alert(msgs.join("\n")); return ok;
}
export function validarProducto(form){
  const codigo=form.codigo.value.trim(); const nombre=form.nombre.value.trim();
  const descripcion=form.descripcion.value.trim(); const precio=parseFloat(form.precio.value);
  const stock=parseInt(form.stock.value,10); const stockCritico=form.stockCritico.value?parseInt(form.stockCritico.value,10):null;
  const categoria=form.categoria.value; let ok=true,msgs=[];
  if(!codigo || codigo.length<3){ok=false;msgs.push("Código: requerido, min 3");}
  if(!nombre || nombre.length>100){ok=false;msgs.push("Nombre: requerido, máx 100");}
  if(descripcion && descripcion.length>500){ok=false;msgs.push("Descripción: máx 500");}
  if(isNaN(precio) || precio<0){ok=false;msgs.push("Precio: número >= 0");}
  if(isNaN(stock) || stock<0){ok=false;msgs.push("Stock: entero >= 0");}
  if(stockCritico!==null && (isNaN(stockCritico) || stockCritico<0)){ok=false;msgs.push("Stock crítico: entero >= 0");}
  if(!categoria){ok=false;msgs.push("Selecciona una categoría");}
  if(!ok) alert(msgs.join("\n")); return ok;
}

document.addEventListener("DOMContentLoaded",()=>{
  // Login
  const loginForm = document.querySelector("form[action='#']");
  if(loginForm){
    loginForm.addEventListener("submit",e=>{
      if(!validarLogin(loginForm)) e.preventDefault();
    });
  }
  // Contacto
  const contactForm = document.getElementById("contact-form");
  if(contactForm){
    contactForm.addEventListener("submit",e=>{
      if(!validarContacto(contactForm)) e.preventDefault();
    });
  }
  // Registro/Usuario
  const registroForm = document.querySelector("form[action='/registro']");
  if(registroForm){
    registroForm.addEventListener("submit",e=>{
      if(!validarUsuario(registroForm)) e.preventDefault();
    });
  }
  // Producto
  const productoForm = document.getElementById("producto-form");
  if(productoForm){
    productoForm.addEventListener("submit",e=>{
      if(!validarProducto(productoForm)) e.preventDefault();
    });
  }
});
