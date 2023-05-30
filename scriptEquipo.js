let opcionAltaEquipo = document.getElementById('opcionAltaEquipo');

guardarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    let inputTorneo = document.getElementsByClassName("torneoInput");
    let divTorneo = document.createElement("div");
    divTorneo.innerHTML = "<div class='torneoCard'><input type='checkbox'>" + inputTorneo.torneoNombre.value + "<div>" + 
    inputTorneo.torneoDesde.value + " - " + inputTorneo.torneoHasta.value + " - Titulares: " +
    inputTorneo.torneoTitulares.value + " Suplentes: " + inputTorneo.torneoSuplentes.value +"</div></div>";
    listaTorneos.appendChild(divTorneo);
    inputTorneo.torneoNombre.value = "";
    inputTorneo.torneoDesde.value = "";
    inputTorneo.torneoHasta.value = "";
    inputTorneo.torneoTitulares.value = "";
    inputTorneo.torneoSuplentes.value = "";
})

opcionAltaEquipo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    let torneos = document.getElementsByClassName('torneoCard');
    let selectTorneo = document.getElementById("torneoAltaEquipo");
    for (const agregar of torneos) {
        console.log(agregar);
        if(agregar.firstElementChild.checked){
            
        }
    }
})

/*eliminarTorneo.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    let torneos = document.getElementsByClassName("torneoCard");
    for (const eliminar of torneos) {
        if(eliminar.firstElementChild.checked){
            eliminar.remove();
        }
    }
})*/