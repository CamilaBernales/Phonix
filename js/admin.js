function validarIngreso() {

    const nameAdmin = document.getElementById('adminName').value;
    const passAdmin = document.getElementById('adminPass').value;

    if (passAdmin == "" || passAdmin != "admin" || nameAdmin == "" || nameAdmin != "admin@gmail.com") {


        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userName = users.filter(usuarios => usuarios.email == nameAdmin);
        if (userName.length) {
            alert("El usuario se encuentra registrado como cliente regular");
            location.reload();
        } else {
            alert("El usuario ingresado no esta registrado en el sistema");
            location.reload();
        }


    } else if (nameAdmin === "admin@gmail.com" && passAdmin === "admin") {
        event.preventDefault();
        // location.href = "formularioAdmin.html";
       
        window.location.href = "formularioAdmin.html";
    }

}




