let seleccionTorneoProvincia = document.getElementById('opcionTorneoProvincia');
let seleccionTorneoTipo = document.getElementById('opcionTorneoTipo');
let seleccionTorneoDeporte = document.getElementById('opcionTorneoDeporte');
let seleccionTorneoNombre = document.getElementById('opcionTorneoNombre');

agregarItemsSeleccion(provincias, seleccionTorneoProvincia);
agregarItemsSeleccion(tipoTorneo, seleccionTorneoTipo);
agregarItemsSeleccion(deportes, seleccionTorneoDeporte);

let seleccionTorneoModalidad = document.getElementById('opcionTorneoModalidad');

seleccionTorneoProvincia.addEventListener('input',(e)=>{
    cargarSeleccionNombres();
})
seleccionTorneoTipo.addEventListener('input',(e)=>{
    cargarSeleccionNombres();
})
seleccionTorneoModalidad.addEventListener('input',(e)=>{
    cargarSeleccionNombres();
})
seleccionTorneoDeporte.addEventListener('input',(e)=>{
    cargarSeleccionModalidad(seleccionTorneoDeporte, seleccionTorneoModalidad);
    cargarSeleccionNombres();
})

const cargarSeleccionNombres = () => {
    let selecciones = [seleccionTorneoProvincia, seleccionTorneoTipo, seleccionTorneoDeporte, seleccionTorneoModalidad];
    mensaje = chequearValoresIngresados(selecciones, 'Seleccionar un item de ');
    if(mensaje.length == 0){
        quitarHijosElemento(seleccionTorneoNombre);
        agregarItemsSeleccion(mostrarTorneosFiltrados(seleccionTorneoProvincia.value, seleccionTorneoTipo.value,
            seleccionTorneoDeporte.value, seleccionTorneoModalidad.value) ,
            seleccionTorneoNombre);
    }
}

seleccionTorneoNombre.addEventListener('input',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    mostrarEquipos();
})
