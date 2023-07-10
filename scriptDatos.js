let idTorneo = 0;
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

let idJugador = 0;
let Jugador = class {
    constructor(nombre, apellido, equipoId){
        this.id = ++idJugador;
        this.nombre = nombre;
        this.apellido = apellido;
        this.equipoId = equipoId;
    }
};

let idEquipo = 0;
let Equipo = class {
    constructor(nombre, torneoId){
        this.id = ++idEquipo;
        this.nombre = nombre;
        this.torneoId = torneoId;
        this.titulares = [];
        this.suplentes = [];
    }
};

let deportes = [{id:"futbol", nombre:"Fútbol"}, {id:"padel", nombre:"Padel"}];
let provincias = [{id:1, nombre:"Córdoba"}, {id:2, nombre:"Buenos Aires"}];
let tiposFutbol = [{id:1, nombre: "Fútbol 5"}, {id:2, nombre:"Fútbol 7"},{id:3, nombre:"Fútbol 11"}];
let tiposPaddle = [{id:1, nombre:"Liga"}, {id:2, nombre:"Eliminatorio"}];
let tipoTorneo = [{id:1, nombre: "Femenino"},{id:2, nombre: "Masculino"},{id:3, nombre: "Mixto"}];

torneosLista = [
    {
      id: 1,
      nombre: "Torneo fútbol 2023",
      deporte: "Fútbol",
      deporteId: "futbol",
      modalidad: "Fútbol 11",
      modalidadId: "3",
      tipo: "Masculino",
      tipoId: "2",
      desde: "2023-06-07",
      hasta: "2023-06-30",
      provincia: "Córdoba",
      provinciaId: "1"
    },
    {
      id: 2,
      nombre: "1° Torneo mixto 2023",
      deporte: "Fútbol",
      deporteId: "futbol",
      modalidad: "Fútbol 7",
      modalidadId: "2",
      tipo: "Mixto",
      tipoId: "3",
      desde: "2023-06-20",
      hasta: "2023-07-20",
      provincia: "Córdoba",
      provinciaId: "1"
    },
    {
      id: 3,
      nombre: "Padel Mix Bs As",
      deporte: "Padel",
      deporteId: "padel",
      modalidad: "Eliminatorio",
      modalidadId: "2",
      tipo: "Mixto",
      tipoId: "3",
      desde: "2023-06-20",
      hasta: "2023-07-11",
      provincia: "Buenos Aires",
      provinciaId: "2"
    },
    {
      id: 4,
      nombre: "Padel F Cba",
      deporte: "Padel",
      deporteId: "padel",
      modalidad: "Eliminatorio",
      modalidadId: "2",
      tipo: "Femenino",
      tipoId: "1",
      desde: "2023-06-13",
      hasta: "2023-06-22",
      provincia: "Córdoba",
      provinciaId: "1"
    }
  ];

idTorneo = torneosLista[torneosLista.length-1].id ? torneosLista[torneosLista.length-1].id : 0;