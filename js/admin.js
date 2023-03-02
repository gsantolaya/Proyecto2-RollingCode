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

const storageAdmins = localStorage.getItem('admins')
const storageUsers = localStorage.getItem('users')
let btnDeleteDOM = document.getElementById('btnDeleteItem')
let btnActivationDOM = document.getElementById('btnActivation')
let tbodyUserDOM = document.getElementById('adminsRegisterTableDetails')
let tbodyAdminsDOM = document.getElementById('adminsTableDetails')
let tbodyUsersDOM = document.getElementById('usersTableDetails')
let titleSuccessDOM = document.getElementById('title-success')
let formUserAMBDOM = document.getElementById('formEditUser')
let formAdminAMBDOM = document.getElementById('formEditAdmin')
let userToEdit = null;

let listAdmins = []
let listUsers = []

if (storageAdmins) {
    listAdmins = JSON.parse(storageAdmins)
}
if (storageUsers) {
    listUsers = JSON.parse(storageUsers)
}


function deleteUser(email) {
    deleteConfig = {
        for: 'user',
        email: email
    }
}

function loadEditUser(user) {
    userToEdit = user;
    const typeUserDOM = document.getElementById('typeUserForm')
    typeUserDOM.value = user.activation
}

function loadEditAdmin(user) {
    userToEdit = user;
    const firstNameAdminDOM = document.getElementById('firstNameAdminForm')
    firstNameAdminDOM.value = user.firstName
    const lastNameAdminDOM = document.getElementById('lastNameAdminForm')
    lastNameAdminDOM.value = user.lastName
    const dniAdminDOM = document.getElementById('dniAdminForm')
    dniAdminDOM.value = user.dni
    const mpAdminDOM = document.getElementById('mpAdminForm')
    mpAdminDOM.value = user.pr
    const typeAdminDOM = document.getElementById('typeAdminForm')
    typeAdminDOM.value = user.activation
}


function generateTableRegisterAdmins(listAdmins) {
    tbodyUserDOM.innerHTML = ''
    listAdmins.forEach((user, i) => {
        if (user.activation != "activado") {

            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1

            const trDOM = document.createElement('tr')

            const tdFirstNameDOM = document.createElement('td')
            tdFirstNameDOM.textContent = user.firstName

            const tdLastNameDOM = document.createElement('td')
            tdLastNameDOM.textContent = user.lastName


            const tdDNIDOM = document.createElement('td')
            tdDNIDOM.textContent = user.dni

            const tdMPDOM = document.createElement('td')
            tdMPDOM.textContent = user.pr

            const tdSpecialtyDOM = document.createElement('td')
            tdSpecialtyDOM.textContent = user.specialty

            const tdActionsDOM = document.createElement('td')
            const btnEditDOM = document.createElement('button')
            btnEditDOM.innerHTML = `<span class="fa fa-solid fa-check"></span>`
            btnEditDOM.classList = 'btn btn-outline-dark me-1'
            btnEditDOM.setAttribute("data-bs-toggle", "modal");
            btnEditDOM.setAttribute("data-bs-target", "#editUserModal");
            btnEditDOM.onclick = () => { loadEditUser(user) }

            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmDelete");
            btnDeleteDOM.onclick = () => { deleteUser(user.email) }

            tdActionsDOM.appendChild(btnEditDOM)
            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdFirstNameDOM)
            trDOM.appendChild(tdLastNameDOM)
            trDOM.appendChild(tdDNIDOM)
            trDOM.appendChild(tdMPDOM)
            trDOM.appendChild(tdSpecialtyDOM)

            trDOM.appendChild(tdActionsDOM)
            tbodyUserDOM.append(trDOM)
        }
    });
}

function generateTableAdmins(listAdmins) {
    tbodyAdminsDOM.innerHTML = ''
    listAdmins.forEach((user, i) => {
        if (user.activation == "activado") {

            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1

            const trDOM = document.createElement('tr')

            const tdFirstNameDOM = document.createElement('td')
            tdFirstNameDOM.textContent = user.firstName

            const tdLastNameDOM = document.createElement('td')
            tdLastNameDOM.textContent = user.lastName


            const tdDNIDOM = document.createElement('td')
            tdDNIDOM.textContent = user.dni

            const tdMPDOM = document.createElement('td')
            tdMPDOM.textContent = user.pr

            const tdSpecialtyDOM = document.createElement('td')
            tdSpecialtyDOM.textContent = user.specialty

            const tdActionsDOM = document.createElement('td')
            const btnEditDOM = document.createElement('button')
            btnEditDOM.innerHTML = `<span class="fa fa-solid fa-edit"></span>`
            btnEditDOM.classList = 'btn btn-outline-dark me-1'
            btnEditDOM.setAttribute("data-bs-toggle", "modal");
            btnEditDOM.setAttribute("data-bs-target", "#editAdminModal");
            btnEditDOM.onclick = () => { loadEditAdmin(user) }

            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmDelete");
            btnDeleteDOM.onclick = () => { deleteUser(user.email) }

            tdActionsDOM.appendChild(btnEditDOM)
            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdFirstNameDOM)
            trDOM.appendChild(tdLastNameDOM)
            trDOM.appendChild(tdDNIDOM)
            trDOM.appendChild(tdMPDOM)
            trDOM.appendChild(tdSpecialtyDOM)

            trDOM.appendChild(tdActionsDOM)
            tbodyAdminsDOM.append(trDOM)
        }
    });
}

function generateTableUsers(listUsers) {
    tbodyUsersDOM.innerHTML = ''
    listUsers.forEach((user, i) => {
        if (user) {

            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1

            const trDOM = document.createElement('tr')

            const tdFirstNameDOM = document.createElement('td')
            tdFirstNameDOM.textContent = user.firstName

            const tdLastNameDOM = document.createElement('td')
            tdLastNameDOM.textContent = user.lastName


            const tdDNIDOM = document.createElement('td')
            tdDNIDOM.textContent = user.dni

            const tdActionsDOM = document.createElement('td')
            const btnEditDOM = document.createElement('button')
            btnEditDOM.innerHTML = `<span class="fa fa-solid fa-edit"></span>`
            btnEditDOM.classList = 'btn btn-outline-dark me-1'
            btnEditDOM.setAttribute("data-bs-toggle", "modal");
            btnEditDOM.setAttribute("data-bs-target", "#editUserModal");
            btnEditDOM.onclick = () => { loadEditUser(user) }

            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmDelete");
            btnDeleteDOM.onclick = () => { deleteUser(user.email) }

            tdActionsDOM.appendChild(btnEditDOM)
            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdFirstNameDOM)
            trDOM.appendChild(tdLastNameDOM)
            trDOM.appendChild(tdDNIDOM)

            trDOM.appendChild(tdActionsDOM)
            tbodyUsersDOM.append(trDOM)
        }
    });
}


btnDeleteDOM.onclick = (e) => {
    let newItems = []
    newItems = listAdmins.filter(u => u.email != deleteConfig.email)
    localStorage.setItem('admins', JSON.stringify(newItems))
    listAdmins = newItems;
    titleSuccessDOM.textContent = 'Usuario eliminado';
    const toastOkDOM = document.getElementById('toastOk')
    const toast = new bootstrap.Toast(toastOkDOM)
    toast.show()
    generateTableRegisterAdmins(newItems)
}

formUserAMBDOM.onsubmit = (e) => {
    e.preventDefault()
    const id = listAdmins.findIndex(u => u.email == userToEdit.email)
    const typeUserDOM = document.getElementById('typeUserForm')
    userToEdit = null;
    if (typeUserDOM.value) {
        listAdmins[id].activation = typeUserDOM.value
        localStorage.setItem('admins', JSON.stringify(listAdmins))
        listAdmins = JSON.parse(localStorage.getItem('admins'))
        generateTableRegisterAdmins(listAdmins)
        titleSuccessDOM.textContent = 'Usuario editado';
        const toastOkDOM = document.getElementById('toastOk')
        const toast = new bootstrap.Toast(toastOkDOM)
        location.reload()
        toast.show()
    } else {
        const toastErrorDOM = document.getElementById('toastError')
        const toast = new bootstrap.Toast(toastErrorDOM)
        location.reload()
        toast.show()
    }
}

formAdminAMBDOM.onsubmit = (e) => {
    e.preventDefault()
    const id = listAdmins.findIndex(u => u.email == userToEdit.email)
    const firstNameAdminDOM = document.getElementById('firstNameAdminForm')
    const lastNameAdminDOM = document.getElementById('lastNameAdminForm')
    const dniAdminDOM = document.getElementById('dniAdminForm')
    const prAdminDOM = document.getElementById('mpAdminForm')
    const typeAdminDOM = document.getElementById('typeAdminForm')
    userToEdit = null;
    if ((firstNameAdminDOM.value) && (lastNameAdminDOM.value) && (dniAdminDOM.value) && (prAdminDOM.value) && (typeAdminDOM.value)) {
        listAdmins[id].firstName = firstNameAdminDOM.value
        listAdmins[id].lastName = lastNameAdminDOM.value
        listAdmins[id].dni = dniAdminDOM.value
        listAdmins[id].pr = prAdminDOM.value
        listAdmins[id].activation = typeAdminDOM.value
        localStorage.setItem('admins', JSON.stringify(listAdmins))
        listAdmins = JSON.parse(localStorage.getItem('admins'))
        generateTableRegisterAdmins(listAdmins)
        titleSuccessDOM.textContent = 'Usuario editado';
        const toastOkDOM = document.getElementById('toastOk')
        const toast = new bootstrap.Toast(toastOkDOM)
        location.reload()
        toast.show()
    } else {
        const toastErrorDOM = document.getElementById('toastError')
        const toast = new bootstrap.Toast(toastErrorDOM)
        location.reload()
        toast.show()
    }
}


generateTableRegisterAdmins(listAdmins)
generateTableAdmins(listAdmins)
generateTableUsers(listUsers)