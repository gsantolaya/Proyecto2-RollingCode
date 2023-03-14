//Navbar
profileNavDOM = document.getElementById("profile")
ulNavDOM = document.getElementById("ul-navbar")
scrollNavDOM = document.getElementById("navbarScroll")
turnButtonNavDOM = document.getElementById("turn-button")

const storageUserLogIn = localStorage.getItem('userLogIn')
const storageAdminLogIn = localStorage.getItem('adminLogIn')

if (storageUserLogIn) {
    let userLogin = JSON.parse(storageUserLogIn)
    const liDOM = document.createElement('li')
    liDOM.className += "nav-item dropdown"
    ulNavDOM.appendChild(liDOM)
    liDOM.innerHTML = `
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="./icons/user.svg" height="25px" weight="25px" alt="user-icon">
        <span>${userLogin.firstname} ${userLogin.lastname}</span>
        </a>
        <ul class="dropdown-menu">
        <li>
            <a class="dropdown-item" href="./error.html">Mi cuenta</a>
        </li>
    <li>
    <a class="dropdown-item" href="./bookAnAppointment.html">Solicitar turno</a>
    </li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li>
            <a class="dropdown-item" id="cerrar-sesion" href="./index.html">Cerrar Sesion</a>
        </li>
    </ul>`

    ulNavDOM.removeChild(profileNavDOM)
    cerrarSesion = document.getElementById("cerrar-sesion")

    cerrarSesion.onclick = () => {
        localStorage.removeItem("userLogIn");
    }

} else if (storageAdminLogIn) {
    let adminLogin = JSON.parse(storageAdminLogIn)
    const liDOM = document.createElement('li')
    liDOM.className += "nav-item dropdown"
    ulNavDOM.appendChild(liDOM)
    liDOM.innerHTML = `
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="./icons/user.svg" height="25px" weight="25px" alt="user-icon">
        <span>${adminLogin.firstname} ${adminLogin.lastname}</span>
        </a>
        <ul class="dropdown-menu">
        <li>
            <a class="dropdown-item" href="./error.html">Mi cuenta</a>
        </li>
        <li>
        <a class="dropdown-item" href="./adminRegisters.html">Registros</a>
        </li>
    <li>
    <a class="dropdown-item" href="./error.html">Historias clínicas</a>
    </li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li>
            <a class="dropdown-item" id="cerrar-sesion" href="./index.html">Cerrar Sesion</a>
        </li>
    </ul>`
    scrollNavDOM.removeChild(turnButtonNavDOM)
    ulNavDOM.removeChild(profileNavDOM)
    cerrarSesion = document.getElementById("cerrar-sesion")


    cerrarSesion.onclick = () => {
        localStorage.removeItem('adminLogIn');
    }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//Boton solicitar turno
if (storageUserLogIn) {
    let bookAppointmentButton = document.getElementById("book-appointment-button")

    bookAppointmentButton.onclick = (e) => {
        e.preventDefault()
        window.location = './bookAnAppointment.html'
    }
}
//-----------------------------------------------------------------------------------------------------------------------------------------
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()
//---------------------------------------------------------------------------------------------------------------------------------------------------------
let formLogin = document.getElementById('form-login')
let userEmail = document.getElementById('user-email')
let userPassword = document.getElementById('user-password')
let usersList = []
let adminsList = []


if (storageUserLogIn || storageAdminLogIn) {
    window.location = './index.html'
}
formLogin.onsubmit = (e) => {
    e.preventDefault()
    const storageUsersList = localStorage.getItem('users')
    const storageAdminsList = localStorage.getItem('admins')

    if (storageUsersList) {
        usersList = JSON.parse(storageUsersList)
        if (userEmail.value.trim() != "" && userPassword.value.trim() != "") {
            const userFind = usersList.find(user => user.email == userEmail.value.trim() && user.password == userPassword.value.trim())
            if (userFind) {
                const user = {
                    email: userFind.email,
                    firstname: userFind.firstName,
                    lastname: userFind.lastName,
                    type: userFind.type,
                    dni: userFind.dni
                }
                localStorage.setItem('userLogIn', JSON.stringify(user))
                window.location = 'index.html'
            } else {
                const errorToastDOM = document.getElementById('error-toast')
                const toastErrorBodyDOM = document.getElementById('toast-error-body')
                toastErrorBodyDOM.innerHTML = 'El usuario y la contraseña ingresados no coinciden'
                const toast = new bootstrap.Toast(errorToastDOM)
                toast.show()
            }
        } else {
            const errorToastDOM = document.getElementById('error-toast')
            const toastErrorBodyDOM = document.getElementById('toast-error-body')
            toastErrorBodyDOM.innerHTML = 'Ingrese su usuario y contraseña'
            const toast = new bootstrap.Toast(errorToastDOM)
            toast.show()
        }
    }


    if (storageAdminsList) {
        adminsList = JSON.parse(storageAdminsList)
        if (userEmail.value.trim() != "" && userPassword.value.trim() != "") {
            const adminFind = adminsList.find(user => user.email == userEmail.value.trim() && user.password == userPassword.value.trim())
            if (adminFind) {
                if (adminFind.status == "activado") {
                    const admin = {
                        email: adminFind.email,
                        firstname: adminFind.firstName,
                        lastname: adminFind.lastName,
                        type: adminFind.type,
                        dni: adminFind.dni
                    }
                    localStorage.setItem('adminLogIn', JSON.stringify(admin))
                    window.location = 'index.html'
                } else {
                    const invalidFeedbackEmailDOM = document.getElementById('invalid-feedback-email')
                    invalidFeedbackEmailDOM.innerHTML = ''
                    const invalidFeedbackPasswordDOM = document.getElementById('invalid-feedback-password')
                    invalidFeedbackPasswordDOM.innerHTML = ''
                    userEmail.setCustomValidity(":invalid")
                    userPassword.setCustomValidity(":invalid")
                    const errorToastDOM = document.getElementById('error-toast')
                    const toastErrorBodyDOM = document.getElementById('toast-error-body')
                    toastErrorBodyDOM.innerHTML = 'El usuario ingresado no se encuentra activado'
                    const toast = new bootstrap.Toast(errorToastDOM)
                    toast.show()
                }
            } else {
                const errorToastDOM = document.getElementById('error-toast')
                const toastErrorBodyDOM = document.getElementById('toast-error-body')
                toastErrorBodyDOM.innerHTML = 'El usuario y la contraseña ingresados no coinciden'
                const toast = new bootstrap.Toast(errorToastDOM)
                toast.show()
            }
        } else {
            const errorToastDOM = document.getElementById('error-toast')
            const toastErrorBodyDOM = document.getElementById('toast-error-body')
            toastErrorBodyDOM.innerHTML = 'Ingrese su usuario y contraseña'
            const toast = new bootstrap.Toast(errorToastDOM)
            toast.show()
        }
    }
}
