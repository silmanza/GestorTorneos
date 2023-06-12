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
let datosTorneoEditar = null;

let guardarTorneo = document.getElementById('guardarTorneo');
let editarTorneo = document.getElementById('editarTorneo');
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
    cargarModalidad();
})

const cargarModalidad = () => {
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
}

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
        limpiarInputTorneo('torneoInput', ['opcionDeporte','opcionModalidad','opcionTipo','opcionProvincia']);
    }
    else{
        mostrarMesaje(mensajeValidacion);
    }
})

editarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    let inputTorneo = document.getElementsByClassName("torneoInput");
    let seleccionTipo = document.getElementById('opcionTipo');
    let mensajeValidacion = validarDatosIngresados(inputTorneo);
    if(mensajeValidacion.length == 0 && datosTorneoEditar){
        datosTorneoEditar.nombre = inputTorneo.torneoNombre.value;
        datosTorneoEditar.deporte = seleccionDeporte.options[seleccionDeporte.selectedIndex].text;
        datosTorneoEditar.deporteId = seleccionDeporte.value;
        datosTorneoEditar.modalidad = seleccionModalidad.options[seleccionModalidad.selectedIndex].text;
        datosTorneoEditar.modalidadId = seleccionModalidad.value;
        datosTorneoEditar.tipo = seleccionTipo.options[seleccionTipo.selectedIndex].text;
        datosTorneoEditar.tipoId = seleccionTipo.value;
        datosTorneoEditar.desde = inputTorneo.torneoDesde.value;
        datosTorneoEditar.hasta = inputTorneo.torneoHasta.value;
        datosTorneoEditar.provincia = seleccionProvincia.options[seleccionProvincia.selectedIndex].text;
        datosTorneoEditar.provinciaId = seleccionProvincia.value;
        for(let torneo of torneosLista){
            if(torneo.id == datosTorneoEditar.id){
                torneo = datosTorneoEditar;
                break;
            }
        }
        limpiarInputTorneo('torneoInput', ['opcionDeporte','opcionModalidad','opcionTipo','opcionProvincia']);
        agregarClase(datosTorneo,'hideDiv');
        realizarBusqueda();
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
    if(listaInputs.torneoDesde.value > listaInputs.torneoHasta.value){
        mensaje = 'La fecha Desde debe ser menor a la fecha Hasta';
    }
    return mensaje;
}

const agregarTorneo = (torneo) => {
    let divTorneo = document.createElement("div");
    divTorneo.classList.add("torneoCard");
    divTorneo.id = torneo.id;
    divTorneo.innerHTML = "<input type='checkbox' /> <label class='titulo'>" + torneo.nombre + "</label> (" +
    torneo.desde + " - " + torneo.hasta + ") " + torneo.deporte +
    " (" + torneo.modalidad + ") " + torneo.tipo + " " + torneo.provincia;
    divTorneo.addEventListener('dblclick',(e)=>{
        mostrarDatosTorneo(torneo.id);
    })
    listaTorneos.appendChild(divTorneo);
}

const mostrarDatosTorneo = (id) => {
    limpiarInputTorneo('torneoInput', ['opcionDeporte','opcionModalidad','opcionTipo','opcionProvincia']);
    let torneo = torneosLista.filter((item) => {
        return item.id == id;
    });
    datosTorneoEditar = torneo[0];
    if(datosTorneoEditar){
        inputTorneo = document.getElementsByClassName("torneoInput");
        let seleccionTipo = document.getElementById('opcionTipo');
        inputTorneo.torneoNombre.value = datosTorneoEditar.nombre;
        seleccionDeporte.value = datosTorneoEditar.deporteId;
        cargarModalidad();
        seleccionModalidad.value = datosTorneoEditar.modalidadId;
        seleccionTipo.value = datosTorneoEditar.tipoId;
        inputTorneo.torneoDesde.value = datosTorneoEditar.desde;
        inputTorneo.torneoHasta.value = datosTorneoEditar.hasta;
        seleccionProvincia.value = datosTorneoEditar.provinciaId;
    }
    quitarClase(datosTorneo,'hideDiv');
    quitarClase(editarTorneo,'hideDiv');
    agregarClase(guardarTorneo,'hideDiv');
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
    limpiarInputTorneo('torneoInput', ['opcionDeporte','opcionModalidad','opcionTipo','opcionProvincia']);
    quitarClase(datosTorneo,'hideDiv');
    quitarClase(guardarTorneo,'hideDiv');
    agregarClase(editarTorneo,'hideDiv');
})

const limpiarInputTorneo = (claseInput, opcionesId) => {
    datosTorneoEditar = null;
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
    agregarClase(editarTorneo,'hideDiv');
    quitarClase(guardarTorneo,'hideDiv')
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