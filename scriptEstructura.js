const crearElemento = (tipo, atributos) => {
    let elemento = document.createElement(tipo);
    for(const atributo of atributos){
        elemento.setAttribute(atributo.key, atributo.value);
    }
    return elemento;
}

const crearOption = (valor, texto, escondido, seleccionado) => {
    let atributos = [];
    if(valor){atributos.push({key: "value", value: valor});}
    if(escondido){atributos.push({key: "hidden", value: escondido});}
    if(seleccionado){atributos.push({key: "selected", value: seleccionado});}
    let opcion = crearElemento('option', atributos);
    if(texto){opcion.innerText = texto;}
    return opcion;
}

const imagenCerrar = (id, source) => {
    let imagen = crearElemento('img', id, null);
    return imagen;
}