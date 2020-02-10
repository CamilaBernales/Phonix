class Actividades {
    constructor(nombre, horario, dia) {
        this.nombre = nombre;
        this.horario = horario;
        this.id = generarId(20);
        this.dia = dia;
        this.ReservaActividades = mostrarEnmodal();


    }



}

function generarId(length) {
    var id = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var caracteresLength = caracteres.length;
    for (var i = 0; i < length; i++) {
        id += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    return id;
}


function addAct() {

    const nombre = document.getElementById('actName').value;
    const horario = document.querySelector('#actTime').value;
    const dia = document.getElementById('actDay').value;

    const clases = JSON.parse(localStorage.getItem('Clases')) || [];

    if (nombre != "" && horario != "") {


        var clase = new Actividades(
            nombre,
            horario,
            dia


        );
        clases.push(clase);

        localStorage.setItem('Clases', JSON.stringify(clases));

    }

    listarActividades();
    listarTipoActividades();
}


function listarActividades(clases = null) {

    if (clases == null) {
        clases = JSON.parse(localStorage.getItem('Clases')) || [];

    } else if (!clases) {
        clases = [];
    }


    let tabla = " ";

    for (let index = 0; index < clases.length; index++) {
        let clase = clases[index];
        tabla += "<tr><td> " + clase.dia + " </td><td>" + clase.horario + "</td><td>" + clase.nombre + '</td><td><button onclick="mostrarEnmodal(\'' + clase.id + '\')" data-toggle="modal" data-target="#modalReserva" type="button" class="btn btn-danger" id="' + clase.id + '" >Reservar</button></td ></tr > ';

    }

    document.getElementById("tablaReservas").innerHTML = tabla;

}

function mostrarEnmodal(id) {

    clases = JSON.parse(localStorage.getItem('Clases')) || [];


    let modal = " ";

    let encontrado = clases.find(actividad => actividad.id == id);
    // console.log("encontrado" + encontrado);
    if (encontrado) {
        modal = '<h3> <strong>' + encontrado.nombre + '</strong></h3> <h4>' + encontrado.horario + '</h4><h3> <strong> ' + encontrado.dia + '</strong></h3>';
    } else {

    }
    if (id != null) {




        document.getElementById("modalBody").dataset.id = id;
        document.getElementById("modalBody").innerHTML = modal;

        let botonConfirmar = document.getElementById('botonConfirmar');

        botonConfirmar.addEventListener("click", function () {
            btonreserva = document.getElementById(id)
            // console.log(id);
            btonreserva.innerText = 'cancelar'
            btonreserva.setAttribute('data-target', '');

            botonConfirmar.addEventListener("click", listarAsistencia(id));





            btonreserva.addEventListener("click", function () {
                if (btonreserva.innerHTML = "cancelar") {
                    btonreserva = document.getElementById(id);
                    btonreserva.innerHTML = "Reservar";

                    btonreserva.setAttribute('data-target', '#modalReserva');


                } else {
                    btonreserva.innerHTML = "cancelar"
                }
            });

           
        });

    }

}



// function listarAsistencia(id){

//     let usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado')) || [];

//     let tabla = document.getElementById('listadoAsistencia') ;;
//     tabla.innerHTML ;

//     for (let i = 0; i < usuarioLogeado.length; i++) {
//         let asistencia = usuarioLogeado[i];
//         tabla += "<tr><td> " + asistencia.name + " </td><td>" +asistencia.id + '</td ></tr > ';


//     }

// }

function listarTipoActividades() {
    let clases = JSON.parse(localStorage.getItem('Clases')) || [];
    let opcion = "";

    for (let i = 0; i < clases.length; i++) {
        let clase = clases[i];
        opcion += '<a class="dropdown-item"  onclick="filtrarTipoActividad(\'' + clase.nombre + '\')">' + clase.nombre + '</a>'

    }
    document.getElementById('listadoAct').innerHTML = opcion;
}

function filtrarTipoActividad(ClaseBuscada) {

    // console.log("go")
    let clases = JSON.parse(localStorage.getItem('Clases')) || [];
    let clase = clases.filter(classes => classes.nombre == ClaseBuscada);
    if (clase) {

        listarActividades(clase);

    } else {
        listarActividades();
    }


}


