function validarIngreso() {

    const nameAdmin = document.getElementById('adminName').value;
    const passAdmin = document.getElementById('adminPass').value;

    if (passAdmin == "" || passAdmin != "admin" || nameAdmin == "" || passAdmin != "admin") {

       
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userName = users.filter(usuarios => usuarios.name == nameAdmin);
        if(userName!=""){
            alert("El usuario se encuentra registrado como cliente regular");
        }else if(userName==""){
            alert("El usuario ingresado no esta registrado en el sistema");
        }


    } else {
        event.preventDefault();
       // location.href = "formularioAdmin.html";
        window.location.href= "formularioAdmin.html";
    }
}




