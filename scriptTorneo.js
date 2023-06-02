let Torneo = class {
    constructor(nombre, deporte, deporteId, modalidad, modalidadId, tipo, tipoId, desde, hasta, provincia, provinciaId){
        this.id = ++idTorneo;
        this.nombre = nombre;
        this.deporte = deporte;
        this.deporteId = deporteId;
        this.modalidad = modalidad;
        this.modalidadId = modalidadId;
        this.tipo = tipo;
        this.tipoId = tipoId;
        this.desde = desde;
        this.hasta = hasta;
        this.provincia = provincia;
        this.provinciaId = provinciaId;
    }
};
let torneosLista = [];

let guardarTorneo = document.getElementById('guardarTorneo');
let eliminarTorneo = document.getElementById('torneoEliminar');
let idTorneo = 0;

let listaTorneos = document.getElementById('listaTorneos');

let provincias = [{id:1, descripcion:"Córdoba"}, {id:2, descripcion:"Buenos Aires"}];
let seleccionProvincia = document.getElementById('opcionProvincia');
let seleccionBuscarProvincia = document.getElementById('opcionBuscarProvincia');
for(const provincia of provincias){
    let opcion = document.createElement("option");
    opcion.value = provincia.id;
    opcion.innerText = provincia.descripcion;
    seleccionProvincia.appendChild(opcion);
    opcion = document.createElement("option");
    opcion.value = provincia.id;
    opcion.innerText = provincia.descripcion;
    seleccionBuscarProvincia.appendChild(opcion);
}

let deportes = [{idNombre:"futbol", descripcion:"Fútbol"}, {idNombre:"padel", descripcion:"Padel"}];
let seleccionDeporte = document.getElementById('opcionDeporte');
let seleccionBusquedaDeporte = document.getElementById('opcionBuscarDeporte');
for(const deporte of deportes){
    let opcion = document.createElement("option");
    opcion.value = deporte.idNombre;
    opcion.innerText = deporte.descripcion;
    seleccionDeporte.appendChild(opcion);
    opcion = document.createElement("option");
    opcion.value = deporte.idNombre;
    opcion.innerText = deporte.descripcion;
    seleccionBusquedaDeporte.appendChild(opcion);
}

let tiposFutbol = [{idTipo:1, descripcion: "Fútbol 5"}, {idTipo:2, descripcion:"Fútbol 7"},
{idTipo:3, descripcion:"Fútbol 11"}];
let tiposPaddle = [{idTipo:1, descripcion:"Liga"}, {idTipo:2, descripcion:"Eliminatorio"}];
let seleccionModalidad = document.getElementById('opcionModalidad');

seleccionDeporte.addEventListener('input',(e)=>{
    let tipos = [];
    switch(seleccionDeporte.value){
        case "futbol":
            tipos = tiposFutbol;
            break;
        case "padel":
            tipos = tiposPaddle;
            break;
    };
    quitarHijosElemento(seleccionModalidad);
    let opcion = document.createElement("option")
    opcion.value = "";
    opcion.innerText = "Seleccionar";
    opcion.hidden = true;
    opcion.selected = true;
    opcion.required = true;
    seleccionModalidad.appendChild(opcion);
    for(const tipo of tipos){
        let opcion = document.createElement("option")
        opcion.value = tipo.idTipo;
        opcion.innerText = tipo.descripcion;
        seleccionModalidad.appendChild(opcion);
    }
})

guardarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    let inputTorneo = document.getElementsByClassName("torneoInput");
    let seleccionTipo = document.getElementById('opcionTipo');
    let mensajeValidacion = validarDatosIngresados(inputTorneo);
    if(mensajeValidacion.length == 0){
        let torneo = new Torneo(inputTorneo.torneoNombre.value, seleccionDeporte.options[seleccionDeporte.selectedIndex].text,
            seleccionDeporte.value, seleccionModalidad.options[seleccionModalidad.selectedIndex].text, seleccionModalidad.value, 
            seleccionTipo.options[seleccionTipo.selectedIndex].text, seleccionTipo.value, inputTorneo.torneoDesde.value, 
            inputTorneo.torneoHasta.value, seleccionProvincia.options[seleccionProvincia.selectedIndex].text, seleccionProvincia.value);
        torneosLista.push(torneo);
        agregarTorneo(torneo);
        limpiarInputClase(inputTorneo);
    }
    else{
        mostrarMesaje(mensajeValidacion);
    }
})

const validarDatosIngresados = (listaInputs) => {
    agregarClase(divMensaje,'hideDiv');
    let mensaje = chequearValoresIngresados(listaInputs,'Ingresar un valor en ');
    if(mensaje.length == 0){
        let seleccionTipo = document.getElementById('opcionTipo');
        let selecciones = [seleccionDeporte, seleccionModalidad, seleccionTipo, seleccionProvincia];
        mensaje = chequearValoresIngresados(selecciones, 'Seleccionar un item de ');
    }
    return mensaje;
}

const chequearValoresIngresados = (listaElementos, texto) => {
    let mensaje = '';
    for(elemento of listaElementos){
        if(textoVacio(elemento.value)){
            mensaje = texto + elemento.title;
            break;
        }
    }
    return mensaje;
}

const agregarTorneo = (torneo) => {
    let divTorneo = document.createElement("div");
    divTorneo.classList.add("torneoCard");
    divTorneo.id = torneo.id;
    divTorneo.innerHTML = "<input type='checkbox' /> " + torneo.nombre + " " + torneo.deporte +
    " " + torneo.modalidad + " " + torneo.tipo + " " + torneo.provincia + 
    " (" + torneo.desde + " - " + torneo.hasta + ")";
    listaTorneos.appendChild(divTorneo);
}

eliminarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    let torneosListados = document.getElementsByClassName("torneoCard");
    let removeId = [];
    for (const eliminar of torneosListados) {
        if(eliminar.firstElementChild.checked){
           removeId.push(Number(eliminar.id));
        }
    }
    torneosLista = eliminarItemsTorneo(torneosLista, removeId);
    realizarBusqueda();
})

const eliminarItemsTorneo = (arreglo, itemsEliminar) => {
    return arreglo.filter((item) => {
        return !itemsEliminar.includes(item.id);
    });
}

let buscarTorneo = document.getElementById('buscarTorneo');

buscarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    realizarBusqueda();
})

const realizarBusqueda = () => {
    quitarHijosElemento(listaTorneos);
    let nombre = document.getElementById('torneoBuscarNombre').value;
    let deporte = document.getElementById('opcionBuscarDeporte').value;
    let provincia = document.getElementById('opcionBuscarProvincia').value;
    let desde = document.getElementById('torneoBuscarDesde').value;
    let hasta = document.getElementById('torneoBuscarHasta').value;
    for(const torneo of torneosLista){
        if( (!nombre || (torneo.nombre.toLowerCase()).includes((nombre.trim()).toLowerCase())) &&
        (!deporte || (torneo.deporteId && torneo.deporteId == deporte)) && (!provincia || (torneo.provinciaId && torneo.provinciaId == provincia)) && 
        (!desde || (torneo.desde && torneo.desde >= desde)) && (!hasta || (torneo.hasta && torneo.hasta <= hasta)) ){
            agregarTorneo(torneo);
        }
    }
}

let botonBuscarTorneo = document.getElementById('torneoBuscar');
let botonNuevoTorneo = document.getElementById('torneoNuevo');

botonBuscarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(busquedaTorneo,'hideDiv');
})

botonNuevoTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(datosTorneo,'hideDiv');
})

const limpiarInputTorneo = (claseInput, opcionesId) => {
    limpiarInputClase(document.getElementsByClassName(claseInput));
    for(const opcion of opcionesId){
        limpiarInputId(document.getElementById(opcion));
    }
}

let limpiarDatosTorneo = document.getElementById('limpiarDatosTorneo');
let limpiarBuscarTorneo = document.getElementById('limpiarBuscarTorneo');

limpiarDatosTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    limpiarInputTorneo('torneoInput', ['opcionDeporte','opcionModalidad','opcionTipo','opcionProvincia']);
})
limpiarBuscarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    limpiarInputTorneo('torneoBuscarInput', ['opcionBuscarDeporte','opcionBuscarProvincia']);
})

let cerrarBuscarTorneo = document.getElementById('cerrarBuscarTorneo');
let cerrarDatosTorneo = document.getElementById('cerrarDatosTorneo');

cerrarBuscarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    cerrarElemento(busquedaTorneo,'torneoBuscarInput',['opcionBuscarDeporte','opcionBuscarProvincia']);
    realizarBusqueda();
})
cerrarDatosTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    cerrarElemento(datosTorneo, 'torneoInput',  ['opcionDeporte','opcionModalidad','opcionTipo','opcionProvincia']);
})

const cerrarElemento = (elemento, claseInput, opcionesId) => {
    agregarClase(elemento,'hideDiv');
    limpiarInputTorneo(claseInput, opcionesId);
}