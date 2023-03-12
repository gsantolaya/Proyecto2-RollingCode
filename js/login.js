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
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//Boton solicitar turno
let bookAppointmentButton = document.getElementById("book-appointment-button")
bookAppointmentButton.onclick = (e) => {
    e.preventDefault()
    window.location = './bookAnAppointment.html'
}
//-----------------------------------------------------------------------------------------------------------------------------------------

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
            // adminsList = JSON.parse(storageAdminsList)
            const userFind = usersList.find(user => user.email == userEmail.value.trim() && user.password == userPassword.value.trim())
            if (userFind) {
            const user = {
                email: userFind.email,
                firstname: userFind.firstName,
                lastname: userFind.lastName,
                type: userFind.type
            }
            localStorage.setItem('userLogIn', JSON.stringify(user))
            window.location = 'index.html'
        }
    }
    if (storageAdminsList){
        adminsList = JSON.parse(storageAdminsList)
        const adminFind = adminsList.find(user => user.email == userEmail.value.trim() && user.password == userPassword.value.trim())
        if (adminFind){
            if(adminFind.activation == "activado"){
            const admin = {
                email: adminFind.email,
                firstname: adminFind.firstName,
                lastname: adminFind.lastName,
                type: adminFind.type
            }
            localStorage.setItem('adminLogIn', JSON.stringify(admin))
            window.location = 'index.html'
        }else{
            alert("usuario no activado")
        }
        }
    }
    // const adminFind = adminsList.find(user => user.email == userEmail.value.trim() && user.password == userPassword.value.trim())
    // if (adminFind){
    //     if(adminFind.activation == "activado"){
    //     const admin = {
    //         email: adminFind.email,
    //         firstname: adminFind.firstName,
    //         lastname: adminFind.lastName,
    //         type: adminFind.type
    //     }
    //     localStorage.setItem('adminLogIn', JSON.stringify(admin))
    //     window.location = 'index.html'
    //     }else{
    //         alert("usuario no activado")
    //     }
    // }
    // const userFind = usersList.find(user => user.email == userEmail.value.trim() && user.password == userPassword.value.trim())
    // if (userFind) {
    //     const user = {
    //         email: userFind.email,
    //         firstname: userFind.firstName,
    //         lastname: userFind.lastName,
    //         type: userFind.type
    //     }
    //     localStorage.setItem('userLogIn', JSON.stringify(user))
    //     window.location = 'index.html'
    // }
}
