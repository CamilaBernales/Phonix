class User {

    constructor(name, dni, email, address) {
        this.name = name;
        this.dni = dni;
        this.email = email;
        this.address = address;
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

    const name = document.getElementById('nameUser').value;
    const dni = document.querySelector('#dniUser').value;
    const email = document.querySelector('#emailUser').value;
    const address = document.querySelector('#addressUser').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (name != "") {


        var user = new User(
            name,
            dni,
            email,
            address

        );
        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));

    }

    UsersList();

}

function UsersList() {

    //    console.log("hello");
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let tabla = '';

    for (let index = 0; index < users.length; index++) {

        // console.log("hi");
        let a = users[index];
        tabla += '<tr><td>' + a.name + '</td><td>' + a.dni + '</td></tr>'
    }

    document.getElementById('usersTable').innerHTML = tabla;

}

