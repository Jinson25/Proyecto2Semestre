document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

//FUNCIONES

function anchoPage() {

    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

anchoPage();


function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }
}
// validacion y captura de datos del login mediante el formulario
const nombre = document.getElementById("name")
const email = document.getElementById("email")
const usuario = document.getElementById("usuario")
const password = document.getElementById("password")
const div = document.getElementById("form")
const parrafo = document.getElementById("warnings")


formulario_register.addEventListener("submit", e => {
    e.preventDefault()
    let warnings = ""
    let registrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    parrafo.innerHTML = ""

    if (nombre.value.length < 10) {
        warnings += `El nombre ingresado no es válido <br/>`
        registrar = true
    }
    if (!regexEmail.test(email.value)) {
        warnings += `El email no es valido <br/>`
        registrar = true
    }

    if (usuario.value.length < 6) {
        warnings += `El nombre d usuario no es valido <br/>`
        registrar = true
    }

    if (password.value.length < 8) {
        warnings += `La contraseña no es valida <br/>`
        registrar = true
    }
    if (registrar) {
        parrafo.innerHTML = warnings
    } else {
        parrafo.innerHTML = "Registrado correctamente"
        formulario_register.reset()
    }
})

// INGRESO MEDIANTE EL LOGIN Y CORREO
/*Roles:
1:admin,
2:cliente
*/

function obtenerListaUsuarios() {
    var listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLs'));

    if (listaUsuarios == null) {
        listaUsuarios =
            [
                //id, nombre,apellido,correo                contraseña, fecha nacido, rol
                ['1','Jinson','Medina','jinson@gmail.com','jinson2003medina18','2005-10-15','1'],
                ['2','Leonel','Sangolquiza','leonel28@hotmail.com','123456789','2008-10-15','2']
            ]
    }
    return listaUsuarios;
}

function verificarCredenciales(Puser, Ppass) {
    var listaUsuarios = obtenerListaUsuarios();
    var bAcceso = false;

    for (var i = 0; i < listaUsuarios.length; i++) {
        if (Puser == listaUsuarios[i][3] && Ppass == listaUsuarios[i][4]) {
            bAcceso = true
            sessionStorage.setItem('usuarioActivo',listaUsuarios[i][1] + ' ' + listaUsuarios[i][2]);
            sessionStorage.setItem('rolUsuarioActivo',listaUsuarios[i][6]);
        }
    }
    return bAcceso;
}