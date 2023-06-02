const agregarClase = (elemento, nombre) => {
    if (!elemento.classList.contains(nombre)) {
        elemento.classList.add(nombre);
    }
}

const quitarClase = (elemento, nombre) => {
    if (elemento.classList.contains(nombre)) {
        elemento.classList.remove(nombre);
    }
}

let divMensaje = document.getElementById('divMensaje');
let divHome = document.getElementById('divHome');
let divTorneo = document.getElementById('divTorneos');
let divEquipo = document.getElementById('divEquipos');

agregarClase(divMensaje,'hideDiv');
agregarClase(divTorneo,'hideDiv');
agregarClase(divEquipo,'hideDiv');

let busquedaTorneo = document.getElementById('busquedaTorneo');
let datosTorneo = document.getElementById('datosTorneo');
agregarClase(busquedaTorneo,'hideDiv');
agregarClase(datosTorneo,'hideDiv');

let menuHome = document.getElementById('menuHome');
let menuTorneos = document.getElementById('menuTorneos');
let menuEquipos = document.getElementById('menuEquipos');

menuHome.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(divHome,'hideDiv');
    agregarClase(divTorneo,'hideDiv');
    agregarClase(divEquipo,'hideDiv');
})

menuTorneos.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(divTorneo,'hideDiv');
    agregarClase(divHome,'hideDiv');
    agregarClase(divEquipo,'hideDiv');
})

menuEquipos.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(divEquipo,'hideDiv');
    agregarClase(divTorneo,'hideDiv');
    agregarClase(divHome,'hideDiv');
})


const limpiarInputClase = (inputClase) => {
    for (const itemInput of inputClase) {
        itemInput.value = "";
    }
}

const limpiarInputId = (inputId) => {
    inputId.value = "";
}

const quitarHijosElemento = (elemento) => {
    while(elemento.firstChild){
        elemento.removeChild(elemento.firstChild);
    }
}

const quitarHijosClase = (elementos) => {
    /*for (const elemento of elementos) {
        elemento.remove();
    }*/
    for(let i = 0; i < elementos.length; i++){
        elementos[i].remove();
    }
}

const eliminarItemsArreglo = (arreglo, itemsEliminar) => { 
    return arreglo.filter((item) => {
        return !itemsEliminar.includes(item);
    });
}

const textoVacio = (texto) => {
    return texto.trim().length == 0 ? true : false;
}

let textoMensaje = document.getElementById('textoMensaje');
const mostrarMesaje = (texto) => {
    quitarClase(divMensaje,'hideDiv');
    textoMensaje.innerText = texto;
}

let cerrarMensaje = document.getElementById('cerrarMensaje');

cerrarMensaje.addEventListener('click',(e)=>{
    agregarClase(divMensaje,'hideDiv');
    textoMensaje.innerText = "";
})
