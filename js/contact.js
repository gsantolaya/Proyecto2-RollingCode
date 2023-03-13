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
let bookAppointmentButton = document.getElementById("book-appointment-button")
bookAppointmentButton.onclick = (e) => {
    e.preventDefault()
    window.location = './bookAnAppointment.html'
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
//-------------------------------------------------------------------------------------------------------------------------------------
let contactForm = document.getElementById('contact-form')
const storageConsults = localStorage.getItem('listConsults')

let listConsults = []


if (storageConsults) {
    listConsults = JASON.parse(storageConsults)
}


contactForm.onsubmit = (e) => {
    e.preventDefault()
    let userFullname = document.getElementById('user-fullname')
    let userEmail = document.getElementById('user-email')
    let userPhone = document.getElementById('user-phone')
    let userConsult = document.getElementById('user-consult')
    if (userFullname.value.trim() != "" && userFullname.value.trim() != "" && userEmail.value.trim() != "" && userConsult.value.trim() != "") {
        const newConsult = {
            fullname: userFullname.value,
            email: userEmail.value,
            phone: userPhone.value,
            consult: userConsult.value
        }
        listConsults.push(newConsult)
        localStorage.setItem('consult', JSON.stringify(listConsults))
        const successToastDOM = document.getElementById('success-toast')
        const toast = new bootstrap.Toast(successToastDOM)
        toast.show()
        setTimeout(function () {
            location.reload();
        }, 3000);
    } else {
        const errorToastDOM = document.getElementById('error-toast')
        const toast = new bootstrap.Toast(errorToastDOM)
        toast.show()
    }
}