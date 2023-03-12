//Navbar
profile = document.getElementById("profile")
ulNavbar = document.getElementById("ulNavbar")
navbarScroll = document.getElementById("navbarScroll")
turnButton = document.getElementById("turn-button")

const storageUserLogIn = localStorage.getItem('userLogIn')
const storageAdminLogIn = localStorage.getItem('adminLogIn')

if (storageUserLogIn) {
    let userLogin = JSON.parse(storageUserLogIn)
    const liDOM = document.createElement('li')
    liDOM.className += "nav-item dropdown"
    ulNavbar.appendChild(liDOM)
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
        <a class="dropdown-item" href="./error.html">Mis Turnos</a>
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

    ulNavbar.removeChild(profile)
    cerrarSesion = document.getElementById("cerrar-sesion")

    cerrarSesion.onclick = () => {
        localStorage.removeItem("userLogIn");
    }

} else if (storageAdminLogIn) {
    let adminLogin = JSON.parse(storageAdminLogIn)
    const liDOM = document.createElement('li')
    liDOM.className += "nav-item dropdown"
    ulNavbar.appendChild(liDOM)
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
        <a class="dropdown-item" href="./error.html">Turnos</a>
        </li>
    <li>
    <a class="dropdown-item" href="./error.html">Datos pacientes</a>
    </li>
        <li>
            <hr class="dropdown-divider">
        </li>
        <li>
            <a class="dropdown-item" id="cerrar-sesion" href="./index.html">Cerrar Sesion</a>
        </li>
    </ul>`
    navbarScroll.removeChild(turnButton)
    ulNavbar.removeChild(profile)
    cerrarSesion = document.getElementById("cerrar-sesion")


    cerrarSesion.onclick = () => {
        localStorage.removeItem('adminLogIn');
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------
//Boton solicitar turno
let bookAppointmentButton = document.getElementById("book-appointment-button")
bookAppointmentButton.onclick = (e) => {
    e.preventDefault()
    window.location = './bookAnAppointment.html'
}
//-----------------------------------------------------------------------------------------------------------------------------------------

//Si no hay una sesion iniciada, redirecciona a login

const myModal = document.getElementById('login-modal')
const myInput = document.getElementById('formLogIn')

if (storageUserLogIn == null) {
    window.location = './login.html'
    alert("Debe iniciar sesion")
}

function loadEditProductModal(product) {
    productToEdit = product;
    const nameDOM = document.getElementById('nameProductForm')
    nameDOM.value = product.nombre
    const detailDOM = document.getElementById('detailProducForm')
    detailDOM.textContent = product.detalle
    const priceDOM = document.getElementById('priceProductForm')
    priceDOM.value = product.precio
}


//------------------------------------------------------------------------------------------------------------------------------------------
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
//Agregando turnos
let bookAnAppointmentForm = document.getElementById('bookAnAppointment-form')
let selectDr = document.getElementById('select-dr')
let fecha = document.getElementById('fecha')
let validationTextarea = document.getElementById('validationTextarea')
let fileInput = document.getElementById('file-input')
let listTurns = []

bookAnAppointmentForm.onsubmit = (e) => {
    e.preventDefault()
    const storageTurns = localStorage.getItem('turns')

    if (selectDr.value.trim() != "" && fecha.value.trim() != "" && validationTextarea.value.trim() != "") {
        if (storageTurns) {
            usersList = JSON.parse(storageTurns)
        }
        const newTurn = {
            Dr: selectDr.value,
            date: fecha.value,
            consulta: validationTextarea.value,
            input: fileInput
        }
        listTurns.push(newTurn)
        localStorage.setItem('turns', JSON.stringify(listTurns))
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------
//Agregando profesionales
let selectingDr = document.getElementById('select-dr')
const storageProfesionals = localStorage.getItem('admins')
profesionals = []
if (storageProfesionals) {
    profesionals = JSON.parse(storageProfesionals)
}
for (let i = 0; i < profesionals.length; i++) {

    selectingDr.innerHTML += `<option>Dr. ${profesionals[i].firstName} ${profesionals[i].lastName}</option>`

}
