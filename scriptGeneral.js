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
let divFixtures = document.getElementById('divFixtures');
let divSeleccionTorneo = document.getElementById('divSeleccionTorneo');

agregarClase(divMensaje,'hideDiv');
agregarClase(divTorneo,'hideDiv');
agregarClase(divEquipo,'hideDiv');
agregarClase(divFixtures,'hideDiv');
agregarClase(divSeleccionTorneo,'hideDiv');

let busquedaTorneo = document.getElementById('busquedaTorneo');
let datosTorneo = document.getElementById('datosTorneo');
agregarClase(busquedaTorneo,'hideDiv');
agregarClase(datosTorneo,'hideDiv');

let menuHome = document.getElementById('menuHome');
let menuTorneos = document.getElementById('menuTorneos');
let menuEquipos = document.getElementById('menuEquipos');
let menuFixture = document.getElementById('menuFixture');

menuHome.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(divHome,'hideDiv');
    agregarClase(divTorneo,'hideDiv');
    agregarClase(divEquipo,'hideDiv');
    agregarClase(divFixtures,'hideDiv');
    agregarClase(divSeleccionTorneo,'hideDiv');
})

menuTorneos.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(divTorneo,'hideDiv');
    agregarClase(divHome,'hideDiv');
    agregarClase(divEquipo,'hideDiv');
    agregarClase(divFixtures,'hideDiv');
    agregarClase(divSeleccionTorneo,'hideDiv');
})

menuEquipos.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(divEquipo,'hideDiv');
    quitarClase(divSeleccionTorneo,'hideDiv');
    agregarClase(divTorneo,'hideDiv');
    agregarClase(divHome,'hideDiv');
    agregarClase(divFixtures,'hideDiv');
})

menuFixture.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(divFixtures,'hideDiv');
    quitarClase(divSeleccionTorneo,'hideDiv');
    agregarClase(divTorneo,'hideDiv');
    agregarClase(divHome,'hideDiv');
    agregarClase(divEquipo,'hideDiv');
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
    for(let i = 0; i < elementos.length; i++){
        elementos[i].remove();
    }
}

const eliminarItemsArreglo = (arreglo, itemsEliminar) => { 
    return arreglo.filter((item) => {
        return !itemsEliminar.includes(item);
    });
}

const agregarItemsSeleccion = (arreglo, elementoSeleccion) => {
    let opcion = document.createElement("option")
    opcion.value = "";
    opcion.innerText = "Seleccionar";
    opcion.hidden = true;
    opcion.selected = true;
    elementoSeleccion.appendChild(opcion);
    //elementoSeleccion.appendChild(crearOption("", "Seleccionar", true, true));
    for(const item of arreglo){
        opcion = document.createElement("option");
        opcion.value = item.id;
        opcion.innerText = item.nombre;
        elementoSeleccion.appendChild(opcion);
        //elementoSeleccion.appendChild(crearOption(item.id, item.nombre, null, null));
    }
}

const textoVacio = (texto) => {
    return texto.trim().length == 0 ? true : false;
}

const chequearValoresIngresados = (listaElementos, texto) => {
    let mensaje = '';
    for(const elemento of listaElementos){
        if(textoVacio(elemento.value)){
            mensaje = texto + elemento.title;
            break;
        }
    }
    return mensaje;
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
