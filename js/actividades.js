class Actividades {
    constructor(nombre, horario, dia) {
        this.nombre = nombre;
        this.horario = horario;
        this.id = generarId(20);
        this.dia = dia;
        this.anotados = [];

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
    let diaMin = moment().format('L');

    if (nombre != "" && horario != "" && (dia != "" && dia > diaMin)) {


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

function limitarReserva(cantidad) {
    // console.log(cantidad);
    return cantidad < 20
}

function listarActividades(clases = null) {

    if (clases == null) {
        clases = JSON.parse(localStorage.getItem('Clases')) || [];

    } else if (!clases) {
        clases = [];
    }

    let tabla = " ";
    const usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    // const usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado')).sancionado;


    for (let index = 0; index < clases.length; index++) {
        let clase = clases[index];
        let disponibilidad = limitarReserva(clase.anotados.length);
        let yaAnotado = clase.anotados.find(idusuario => idusuario == usuarioLogeado.id) || "";
        if ( (disponibilidad == true ) && ( usuarioLogeado.sancionado === false)) {
            tabla += `<tr><td>  ${clase.dia} </td><td> ${clase.horario} </td><td> 
            ${clase.nombre} </td><td ><button onclick="mostrarEnmodal('${clase.id}')"
             data-toggle="modal" data-target="#modalReserva" type="button" class="btn btn-danger" 
             id= "${clase.id}"> ${yaAnotado ? 'Cancelar' : 'Reservar'}</button></td ></tr >`;
        }else{
            
        }
    }
    if(usuarioLogeado.sancionado === true){

        mostraravisosancion();
    }

    document.getElementById("tablaReservas").innerHTML = tabla;
}
function mostraravisosancion(){
    const usuariosuspendido = JSON.parse(localStorage.getItem('usuarioLogeado')).sancionado;
console.log(usuariosuspendido);
    if(usuariosuspendido){
        $('#modalusuariosuspendido').modal('show');
    }

}

function mostrarEnmodal(id) {
    let clases = JSON.parse(localStorage.getItem('Clases')) || [];
    let encontrado = clases.find(actividad => actividad.id == id);
    let modal = "";
    if (encontrado) {
        modal = `<h3><strong> ${encontrado.nombre} </strong></h3><h4> ${encontrado.horario} </h4><h3>${encontrado.dia}</strong></h3>`;
    } else {
        
    }
    if (id != null) {
        
        
        document.getElementById("modalBody").dataset.id = id;
        document.getElementById("modalBody").innerHTML = modal;
        let botonConfirmar = document.getElementById('botonConfirmar');

        botonConfirmar.addEventListener("click", function () {
            btonreserva = document.getElementById(id)
            btonreserva.innerText = 'Cancelar';
            btonreserva.setAttribute('data-target', '');
            let posicion = clases.findIndex(actividad => actividad.id == id);
            let idusuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado')).id;
            let repetido = clases[posicion].anotados.findIndex(idusuario => idusuario == idusuarioLogeado);
            
            console.log(repetido);
            if (repetido>-1) {
                clases[posicion].anotados.splice(repetido,1);
                localStorage.setItem('Clases', JSON.stringify(clases))
            } else {
                clases[posicion].anotados.push(idusuarioLogeado);
                localStorage.setItem('Clases', JSON.stringify(clases));
            }
            
            btonreserva.addEventListener("click", function () {
                if (btonreserva.innerHTML == "Cancelar") {
                    btonreserva = document.getElementById(id);
                    
                    btonreserva.setAttribute('data-target', '#modalReserva');
                    botonConfirmar.addEventListener("click", function(){
                        btonreserva.innerHTML = "Reservar";
                    });
                    
                } else {
                    btonreserva.innerHTML = "Cancelar"
                }
            });
        });
        
    }
}


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







