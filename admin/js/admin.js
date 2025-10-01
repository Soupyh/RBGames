
const KS = { juegos: "rb_admin_juegos", usuarios: "rb_admin_usuarios" };
const getArr = (k) => JSON.parse(localStorage.getItem(k) || "[]");
const setArr = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let usuarios = getArr(KS.usuarios);
if (usuarios.length === 0){
  usuarios = [
    { run:"19011022K", nombre:"Beatriz", apellidos:"Leal", correo:"be.leall@duocuc.cl", password:"123456789", rol:"Administrador", region:"Metropolitana", comuna:"Santiago", direccion:"Av. Ejemplo 123" }
  ];
  setArr(KS.usuarios, usuarios);
}
