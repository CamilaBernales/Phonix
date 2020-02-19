class User {

    constructor(name, lastname, dni, email, address, sancionado, contraseña) {
        this.name = name;
        this.lastname = lastname;
        this.dni = dni;
        this.email = email;
        this.address = address;
        this.id = generarId(20);
        this.sancionado = sancionado;
        this.contraseña = contraseña;


    }



    set setName(name) {
        this.name = name;
    }

    get getName() {
        return this.name;
    }

    set setDNI(dni) {
        this.dni = dni;
    }

    get getDNI() {
        return this.dni;
    }

    set setEmail(email) {
        this.email = email;
    }

    get getEmail() {
        return this.email;
    }
    set setAddress(address) {
        this.address = address;
    }

    get getAddress() {
        return this.address;
    }

}


function addUser() {

    const name = document.getElementById('userName').value;
    const lastname = document.getElementById('lastnameuser').value
    const dni = document.querySelector('#userDNI').value;
    const email = document.querySelector('#userEmail').value;
    const address = document.querySelector('#userAddress').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const usuarioregistrado = users.find(usuario=> usuario.dni == dni);

    if(usuarioregistrado==undefined){
    if (name != "" && lastname != "" && email!="" && dni != "" & address != "") {


        var user = new User(
            name,
            lastname,
            dni,
            email,
            address,
            sancionado = false,
            contraseña = dni

        );
        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));

    } else {
        alert("Complete los campos vacios")
    }
} else if(usuarioregistrado!=undefined){
    alert("Este usuario ya se encuentra en el sistema");
}

    UsersList();

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

function UsersList() {
    //    console.log("hello");
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let tabla = '';
    for (let index = 0; index < users.length; index++) {
        // console.log("hi");
        let a = users[index];

        if (a.sancionado) {

            tabla += `<tr><td> ${a.name} </td><td>${a.lastname}</td><td> ${a.dni} </td><td> <button onclick="suspenderusuario('${a.id}')" id"suspenderUsuario"type="button" class="btn btn-dark">Activar</button> </td></tr>`
        } else {
            tabla += `<tr><td> ${a.name} </td><td>${a.lastname}</td><td>${a.dni}</td><td> <button onclick="suspenderusuario('${a.id}')" id"suspenderUsuario"type="button" class="btn btn-dark">Suspender</button> </td></tr>`

        }
        // tabla += '<tr><td>' + a.name + '</td><td>' + a.dni + '</td></tr>';
    }
    document.getElementById('usersTable').innerHTML = tabla;
}

function suspenderusuario(id) {
    let btnsuspender = document.getElementById('suspenderUsuario');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let usuariosancionado = users.findIndex(usuario => usuario.id == id);
    let iddeusuariosancionado = users[usuariosancionado]

    if (iddeusuariosancionado.sancionado) {
        iddeusuariosancionado.sancionado = false;
        localStorage.setItem('users', JSON.stringify(users));
        UsersList()
    } else {
        iddeusuariosancionado.sancionado = true;
        localStorage.setItem('users', JSON.stringify(users));
        UsersList()

    }


}
function clasesList() {
    let clases = JSON.parse(localStorage.getItem('Clases')) || [];
    idUsuario = JSON.parse(localStorage.getItem('usuarioLogeado')) || [];
    let tablaClases = '';
    for (let index = 0; index < clases.length; index++) {
        let item = clases[index];
        tablaClases += `<tr>
        <td>${item.nombre} </td>
        <td> ${item.horario} </td>
        <td> ${item.dia} </td>
        <td><a data-toggle="collapse" onclick="listadoInscriptos('${item.id}')" href="#${item.id}" role="button" aria-expanded="false" aria-controls="collapseExample"> ${item.anotados.length}</a></td>
        </tr>
       <tr class="listadoinscriptos collapse" id="${item.id}">
        </tr> `;
    }
    document.getElementById('clasesTable').innerHTML = tablaClases;

}

function listadoInscriptos(id) {
    let clases = JSON.parse(localStorage.getItem('Clases')) || [];
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let claseEncontrado = clases.find(clase => clase.id == id);
    // console.log(claseEncontrado);
    //    console.log(claseEncontrado.anotados.length);

    let tabla = "";

    for (let index = 0; index < claseEncontrado.anotados.length; index++) {

        let idUsuarioAnotado = claseEncontrado.anotados[index];
        let usuarios = users.find(user => user.id == idUsuarioAnotado);
        // console.log(usuarios);
        tabla += `<td>${usuarios.name} ${usuarios.lastname}</td>`;
        console.log(tabla);

    }
    document.getElementById(id).innerHTML = tabla;
}



function iniciarSesion() {


    let users = JSON.parse(localStorage.getItem('users')) || [];
    let email = document.getElementById('nombreLoginUsuario').value;
    let contraseña = document.getElementById('contraseñaLoginUsuario').value;

    let usuarioIngreado = users.find(usuario => usuario.email == email && usuario.contraseña == contraseña);

    // console.log(usuarioIngreado)
    if (usuarioIngreado) {

        localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioIngreado));
        console.log(users)

        window.location.href = "reservarClase.html";

    }else if(usuarioIngreado == undefined){
        alert("Correo invalido o contraseña incorrecta");
    }
}

function cambiarcontraseña() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));
    let posicion = users.findIndex(usuario => usuario.contraseña == usuario.dni)
    let usuario = users[posicion];
    let btnguardarnuevacontraseña = document.getElementById('guardarcontraseñanueva');

    if (usuario) {
        $('#modalcambiocontraseña').modal('show');
        let nuevacontraseña = document.getElementById('nuevacontaseña');
        btnguardarnuevacontraseña.addEventListener("click", function () {
            usuario.contraseña = nuevacontraseña.value;
            localStorage.setItem('users', JSON.stringify(users));
            // localStorage.setItem('usuarioLogeado', JSON.stringify(users));

        })
    }
}



// function loginLogOut() {

//     // const usuarioLogeado = JSON.parse(localStorage.get}Item('usuarioLogeado')) || [];

//     let btnIniciarSesion = document.getElementById('btnlogin');
//     let usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'));

//     // btnIniciarSesion.addEventListener("click", function () {

//     //     for (let index = 0; index < usuarioLogeado.length; index++) {


//     //         let nombre = usuarioLogeado[index];
//     //         if (btnIniciarSesion.innerHTML == "Log In") {
//     //             btnIniciarSesion.innerHTML = nombre.name + " " + nombre.dni;

//     //         }

//     //     }

//     //     btnIniciarSesion.addEventListener("click", function () {

//     //         if (btnIniciarSesion.innerHTML != "Log in") {
//     //             btnIniciarSesion.innerHTML = 'Log In';
//     //         } else {
//     //             btnIniciarSesion.innerHTML = nombre.name;
//     //         }
//     //     })
//     // });
// }

function cerrarsesion(){

    
    localStorage.removeItem('usuarioLogeado');

}