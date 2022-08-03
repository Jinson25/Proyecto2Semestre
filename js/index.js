const carrito = document.getElementById('carrito');
const rutas = document.getElementById('lista-carrito');
const listaRutas = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    rutas.addEventListener('click', comprarRuta);
    carrito.addEventListener('click', eliminarRuta);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)

}

function comprarRuta(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const ruta = e.target.parentElement.parentElement;
        leerDatosRuta(ruta);
    }
}

function leerDatosRuta(ruta) {
    const inforuta ={
        imagen: ruta.querySelector('img').src,
        titulo: ruta.querySelector('h4').textContent,
        precio: ruta.querySelector('.precio span').textContent,
        id: ruta.querySelector('a').getAtribute('date-id')
    }
    insertarCarrito(inforuta);
}

function insertarCarrito(ruta) {
    const row = document.createElement('tr');
    row.innerHTML =`
        <td>
            <img src='$'{ruta.imagen}' width=100>
        </td>
        <td>${ruta.titulo}</td>
        <td>${ruta.precio}</td>
        <td>
           <a href="#" class="borrar-ruta" data-id="${ruta.id}"> X</a>
        </td>
    `;
}