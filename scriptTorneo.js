let guardarTorneo = document.getElementById('guardarTorneo');
let eliminarTorneo = document.getElementById('torneoEliminar');
let idTorneo = 0;

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
    let listaTorneos = document.getElementById('listaTorneos');
    let inputTorneo = document.getElementsByClassName("torneoInput");
    let divTorneo = document.createElement("div");
    let seleccionTipo = document.getElementById('opcionTipo');
    let seleccionProvincia = document.getElementById('opcionProvincia');
    divTorneo.classList.add("torneoCard");
    let nuevoTorneo = new Torneo(inputTorneo.torneoNombre.value, seleccionDeporte.options[seleccionDeporte.selectedIndex].text,
        seleccionDeporte.value, seleccionModalidad.options[seleccionModalidad.selectedIndex].text, seleccionModalidad.value, 
        seleccionTipo.options[seleccionTipo.selectedIndex].text, seleccionTipo.value, inputTorneo.torneoDesde.value, 
        inputTorneo.torneoHasta.value, seleccionProvincia.options[seleccionProvincia.selectedIndex].text, seleccionProvincia.value);
    torneosLista.push(nuevoTorneo);
    divTorneo.id = nuevoTorneo.id;
    divTorneo.innerHTML = "<input type='checkbox' /><label>" + nuevoTorneo.nombre + "</label> " + nuevoTorneo.deporte +
    " " + nuevoTorneo.modalidad + " " + nuevoTorneo.tipo + " (" + nuevoTorneo.desde + " - " + nuevoTorneo.hasta + ")";
    listaTorneos.appendChild(divTorneo);
    limpiarInputClase(inputTorneo);
})

eliminarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    let torneosLista = document.getElementsByClassName("torneoCard");
    let removeId = [];
    for (const eliminar of torneosLista) {
        if(eliminar.firstElementChild.checked){
            removeId.push(eliminar.id);
            eliminar.remove();
        }
    }
    eliminarItemsArreglo(torneosLista, removeId);
    let listaTorneos = document.getElementById('listaTorneos');
    //quitarHijosElemento(listaTorneos);
    //recargar con funcion y filtros
})

let buscarTorneo = document.getElementById('torneoBuscar');
let nuevoTorneo = document.getElementById('torneoNuevo');

buscarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(busquedaTorneo,'hideDiv');
})

nuevoTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    quitarClase(datosTorneo,'hideDiv');
})