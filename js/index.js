const carrito = document.getElementById('carrito');
const rutas = document.getElementById('lista-rutas');
const listaRutas = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

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
    const infoRuta ={
        imagen: ruta.querySelector('img').src,
        titulo: ruta.querySelector('h4').textContent,
        precio: ruta.querySelector('.precio span').textContent,
        id: ruta.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infoRuta);
}

function insertarCarrito(ruta) {
    const row = document.createElement('tr');
    row.innerHTML =`
        <td>
            <img src="${ruta.imagen}" width=100>
        </td>
        <td>${ruta.titulo}</td>
        <td>${ruta.precio}</td>
        <td>
           <a href="#" class="borrar-ruta" data-id="${ruta.id}">X</a>
        </td>
    `;

    listaRutas.appendChild(row);
    guardarRutaLocalSotorage(cafe);
}

function eliminarRuta(e) {
    e.preventDefault();

    let ruta,
    rutaId;
    if(e.target.classList.contains("borrar-ruta")){
        e.target.parentElement.parentElement.remove();
        ruta = e.target.parentElement.parentElement;
        rutaId = ruta.querySelector('a').getAtribute('data-id');
    }

    eliminarRutaLocalStorage(rutaId);
}

function vaciarCarrito() {
    while (listaRutas.firstChild){
        listaRutas.removeChild(listaRutas.firstChild);

    }

    vaciarLocalStorage();
    return false;

}

function guardarRutaLocalSotorage(ruta) {
    let rutas;
    rutas = obtenerRutasLocalStorage();
    rutas.push(ruta);
    localStorage.setItem('rutas', JSON.stringify(rutas))
}

function obtenerRutasLocalStorage() {
    let rutasLS;
    if(localStorage.getItem('rutas') === null) {
        rutasLS = [];
    } else {
        rutasLS = JSON.parse(localStorage.getItem('rutas'));
    }

    return rutasLS;
}

function leerLocalStorage() {
    let rutasLS

    rutasLS = obtenerRutasLocalStorage();

    rutasLS.forEach(function(rutas){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${rutas.imagen}" width=100>
        </td>
        <td>${rutas.titulo}</td>
        <td>${rutas.precio}</td>
        <td>
           <a href="#" class="borrar-ruta" data-id="${rutas.id}"> X</a>
        </td>
        `;
        listaRutas.appendChild(row);
    });
}

function eliminarRutaLocalStorage(ruta){
    let rutasLS;
    rutasLS = obtenerRutasLocalStorage();

    rutasLS.forEach(function(rutasLS, index){
        if(rutasLS.id === ruta) {
            rutasLS.splice(index, 1)
        }
    });
    localStorage.setItem('rutas', JSON.stringify(rutasLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}

