let cantidadItems = 0;
let totalAcumulado = 0;

const botones = document.querySelectorAll('.btn-agregar');
const lista = document.getElementById('lista-carrito');
const total = document.getElementById('total');
const badge = document.getElementById('badge');
const btnVaciar = document.getElementById('btn-vaciar');

// AGREGAR EVENTO A BOTONES
botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const nombre = boton.dataset.nombre;
    const precio = parseInt(boton.dataset.precio);

    agregarAlCarrito(nombre, precio);
  });
});

// FUNCION AGREGAR
function agregarAlCarrito(nombre, precio) {

  document.getElementById('msg-vacio').style.display = "none";

  const li = document.createElement('li');
  li.classList.add('list-group-item');

  li.innerHTML = `
    ${nombre} - $${precio.toLocaleString()}
    <button class="btn btn-sm btn-danger btn-eliminar">✕</button>
  `;

  lista.appendChild(li);

  cantidadItems++;
  totalAcumulado += precio;

  updateBadge();
  updateTotal();

  const btnEliminar = li.querySelector('.btn-eliminar');

  btnEliminar.addEventListener('click', () => {
    eliminarItem(li, precio);
  });
}

// ELIMINAR ITEM
function eliminarItem(li, precio) {
  li.remove();

  cantidadItems--;
  totalAcumulado -= precio;

  updateBadge();
  updateTotal();

  if (cantidadItems === 0) {
    document.getElementById('msg-vacio').style.display = "block";
  }
}

// BADGE
function updateBadge() {
  badge.textContent = cantidadItems;
}

// TOTAL
function updateTotal() {
  total.textContent = '$' + totalAcumulado.toLocaleString('es-CO');
}

// VACIAR
btnVaciar.addEventListener('click', () => {
  lista.querySelectorAll('li:not(#msg-vacio)').forEach(li => li.remove());

  cantidadItems = 0;
  totalAcumulado = 0;

  updateBadge();
  updateTotal();

  document.getElementById('msg-vacio').style.display = "block";
});