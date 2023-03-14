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
const storageAdmins = localStorage.getItem('admins')
const storageUsers = localStorage.getItem('users')

let formActiveAdminDOM = document.getElementById('formActiveAdmin')
let formEditAdminDOM = document.getElementById('formEditAdmin')
let formEditUserDOM = document.getElementById('formEditUser')
let btnDeleteAdminDOM = document.getElementById('btn-delete-admin')
let btnDeleteUserDOM = document.getElementById('btn-delete-user')
//let btnActivationDOM = document.getElementById('btnActivation')
let tbodyUserDOM = document.getElementById('adminsRegisterTableDetails')
let tbodyAdminsDOM = document.getElementById('adminsTableDetails')
let tbodyUsersDOM = document.getElementById('usersTableDetails')
let adminToEdit = null 
let userToEdit = null
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
function loadActiveAdmin(admin) {
    adminToEdit = admin;
    const statusAdminDOM = document.getElementById('admin-active-status')
    statusAdminDOM.value = admin.status
}

function loadEditAdmin(admin) {
    adminToEdit = admin;
    const firstNameAdminDOM = document.getElementById('admin-first-name')
    firstNameAdminDOM.value = admin.firstName
    const lastNameAdminDOM = document.getElementById('admin-last-name')
    lastNameAdminDOM.value = admin.lastName
    const dniAdminDOM = document.getElementById('admin-dni')
    dniAdminDOM.value = admin.dni
    const birthdateAdminDOM = document.getElementById('admin-birthdate')
    birthdateAdminDOM.value = admin.birthdate
    const genderAdminDOM = document.getElementById('admin-gender')
    genderAdminDOM.value = admin.gender
    const phoneAdminDOM = document.getElementById('admin-phone')
    phoneAdminDOM.value = admin.phone
    const addressAdminDOM = document.getElementById('admin-address')
    addressAdminDOM.value = admin.address
    const prAdminDOM = document.getElementById('admin-pr')
    prAdminDOM.value = admin.pr
    const specialtyAdminDOM = document.getElementById('admin-specialty')
    specialtyAdminDOM.value = admin.specialty
    const emailAdminDOM = document.getElementById('admin-email')
    emailAdminDOM.value = admin.email
    const passwordAdminDOM = document.getElementById('admin-password')
    passwordAdminDOM.value = admin.password
    const statusAdminDOM = document.getElementById('admin-status')
    statusAdminDOM.value = admin.status
}

function loadEditUser(user) {
    userToEdit = user;

    const firstNameUserDOM = document.getElementById('user-first-name')
    firstNameUserDOM.value = user.firstName
    const lastNameUserDOM = document.getElementById('user-last-name')
    lastNameUserDOM.value = user.lastName
    const dniUserDOM = document.getElementById('user-dni')
    dniUserDOM.value = user.dni
    const nationalityUserDOM = document.getElementById('user-nationality')
    nationalityUserDOM.value = user.dni
    const birthdateUserDOM = document.getElementById('user-birthdate')
    birthdateUserDOM.value = user.birthdate
    const genderUserDOM = document.getElementById('user-gender')
    genderUserDOM.value = user.gender
    const phoneUserDOM = document.getElementById('user-phone')
    phoneUserDOM.value = user.phone
    const addressUserDOM = document.getElementById('user-address')
    addressUserDOM.value = user.address
    const sureUserDOM = document.getElementById('user-sure')
    sureUserDOM.value = user.sure
    const emailUserDOM = document.getElementById('user-email')
    emailUserDOM.value = user.email
    const passwordUserDOM = document.getElementById('user-password')
    passwordUserDOM.value = user.password
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//Funciones creando tablas DOM
function generateTableRegisterAdmins(listAdmins) {
    tbodyUserDOM.innerHTML = ''
    listAdmins.forEach((admin, i) => {
        if (admin.status != "activado") {

            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1
            const trDOM = document.createElement('tr')

            const tdFirstNameDOM = document.createElement('td')
            tdFirstNameDOM.textContent = admin.firstName
            const tdLastNameDOM = document.createElement('td')
            tdLastNameDOM.textContent = admin.lastName
            const tdDNIDOM = document.createElement('td')
            tdDNIDOM.textContent = admin.dni


            const tdActionsDOM = document.createElement('td')
            const btnEditDOM = document.createElement('button')
            btnEditDOM.innerHTML = `<span class="fa fa-solid fa-check btnEdit"></span>`
            btnEditDOM.classList = 'btn btn-outline-dark me-1'
            btnEditDOM.setAttribute("data-bs-toggle", "modal");
            btnEditDOM.setAttribute("data-bs-target", "#activeAdminModal");
            btnEditDOM.onclick = () => {loadActiveAdmin(admin) }

            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash btnDelete"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmAdminDelete");
            btnDeleteDOM.onclick = () => {deleteUser(admin.email) }

            tdActionsDOM.appendChild(btnEditDOM)
            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdFirstNameDOM)
            trDOM.appendChild(tdLastNameDOM)
            trDOM.appendChild(tdDNIDOM)

            trDOM.appendChild(tdActionsDOM)
            tbodyUserDOM.append(trDOM)
        }
    });
}

function generateTableAdmins(listAdmins) {
    tbodyAdminsDOM.innerHTML = ''
    listAdmins.forEach((admin, i) => {
        if (admin.status == "activado") {

            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1
            const trDOM = document.createElement('tr')

            const tdFirstNameDOM = document.createElement('td')
            tdFirstNameDOM.textContent = admin.firstName
            const tdLastNameDOM = document.createElement('td')
            tdLastNameDOM.textContent = admin.lastName
            const tdDNIDOM = document.createElement('td')
            tdDNIDOM.textContent = admin.dni
            /*const tdBirthdateDOM = document.createElement('td')
            tdBirthdateDOM.textContent = admin.birthdate
            const tdGenderDOM = document.createElement('td')
            tdGenderDOM.textContent = admin.gender
            const tdPhoneDOM = document.createElement('td')
            tdPhoneDOM.textContent = admin.phone
            const tdAddressDOM = document.createElement('td')
            tdAddressDOM.textContent = admin.address
            const tdPrDOM = document.createElement('td')
            tdPrDOM.textContent = admin.pr
            const tdSpecialtyDOM = document.createElement('td')
            tdSpecialtyDOM.textContent = admin.specialty*/

            const tdActionsDOM = document.createElement('td')
            const btnEditDOM = document.createElement('button')
            btnEditDOM.innerHTML = `<span class="fa fa-solid fa-edit btnEdit"></span>`
            btnEditDOM.classList = 'btn btn-outline-dark me-1'
            btnEditDOM.setAttribute("data-bs-toggle", "modal");
            btnEditDOM.setAttribute("data-bs-target", "#editAdminModal");
            btnEditDOM.onclick = () => { loadEditAdmin(admin) }

            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash btnDelete"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmAdminDelete");
            btnDeleteDOM.onclick = () => { deleteUser(admin.email) }

            tdActionsDOM.appendChild(btnEditDOM)
            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdFirstNameDOM)
            trDOM.appendChild(tdLastNameDOM)
            trDOM.appendChild(tdDNIDOM)
            /*trDOM.appendChild(tdBirthdateDOM)
            trDOM.appendChild(tdGenderDOM)
            trDOM.appendChild(tdPhoneDOM)
            trDOM.appendChild(tdAddressDOM)
            trDOM.appendChild(tdPrDOM)
            trDOM.appendChild(tdSpecialtyDOM)*/

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
            /*const tdBirthdateDOM = document.createElement('td')
            tdBirthdateDOM.textContent = user.birthdate
            const tdGenderDOM = document.createElement('td')
            tdGenderDOM.textContent = user.gender
            const tdNationalityDOM = document.createElement('td')
            tdNationalityDOM.textContent = user.nationality
            const tdPhoneDOM = document.createElement('td')
            tdPhoneDOM.textContent = user.phone
            const tdAddressDOM = document.createElement('td')
            tdAddressDOM.textContent = user.address
            const tdSureDOM = document.createElement('td')
            tdSureDOM.textContent = user.sure*/

            const tdActionsDOM = document.createElement('td')
            const btnEditDOM = document.createElement('button')
            btnEditDOM.innerHTML = `<span class="fa fa-solid fa-edit btnEdit"></span>`
            btnEditDOM.classList = 'btn btn-outline-dark me-1'
            btnEditDOM.setAttribute("data-bs-toggle", "modal");
            btnEditDOM.setAttribute("data-bs-target", "#editUserModal");
            btnEditDOM.onclick = () => { loadEditUser(user) }

            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash btnDelete"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmUserDelete");
            btnDeleteDOM.onclick = () => { deleteUser(user.email)}

            tdActionsDOM.appendChild(btnEditDOM)
            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdFirstNameDOM)
            trDOM.appendChild(tdLastNameDOM)
            trDOM.appendChild(tdDNIDOM)
            /*trDOM.appendChild(tdBirthdateDOM)
            trDOM.appendChild(tdGenderDOM)
            trDOM.appendChild(tdNationalityDOM)
            trDOM.appendChild(tdPhoneDOM)
            trDOM.appendChild(tdAddressDOM)
            trDOM.appendChild(tdSureDOM)*/


            trDOM.appendChild(tdActionsDOM)
            tbodyUsersDOM.append(trDOM)
        }
    });
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//Funciones delete:
btnDeleteUserDOM.onclick = (e) => {
    let newUsers = []
    newUsers = listUsers.filter(u => u.email != deleteConfig.email)
    localStorage.setItem('users', JSON.stringify(newUsers))
    listUsers = newUsers;
    const successDeleteToast = document.getElementById('success-delete-toast')
    const toast = new bootstrap.Toast(successDeleteToast)
    toast.show()
    generateTableUsers(newUsers)
}
btnDeleteAdminDOM.onclick = (e) => {
    let newAdmins = []
    newAdmins = listAdmins.filter(u => u.email != deleteConfig.email)
    localStorage.setItem('admins', JSON.stringify(newAdmins))
    listAdmins = newAdmins;
    const successDeleteToast = document.getElementById('success-delete-toast')
    const toast = new bootstrap.Toast(successDeleteToast)
    toast.show()
    generateTableRegisterAdmins(newAdmins)
    generateTableAdmins(newAdmins)
}
// Funciones edit:
formActiveAdminDOM.onsubmit = (e) => {
    e.preventDefault()
    const id = listAdmins.findIndex(u => u.email == adminToEdit.email)

    const adminActiveStatusDOM = document.getElementById('admin-active-status')

    adminToEdit = null;
    if (adminActiveStatusDOM.value) {
        listAdmins[id].status = adminActiveStatusDOM.value
        localStorage.setItem('admins', JSON.stringify(listAdmins))
        listAdmins = JSON.parse(localStorage.getItem('admins'))
        generateTableRegisterAdmins(listAdmins)
        generateTableAdmins(listAdmins)
        // setTimeout(function() {
        //     location.reload();
        // }, 3000);
        if(adminActiveStatusDOM.value == "activado"){
        const adminActivedToastDOM = document.getElementById('admin-actived-toast')
        const toast = new bootstrap.Toast(adminActivedToastDOM)
        toast.show()
        }
    }else {
        const errorToastDOM = document.getElementById('error-toast')
        const toast = new bootstrap.Toast(errorToastDOM)
        toast.show()
    }
}
formEditAdminDOM.onsubmit = (e) => {
    e.preventDefault()
    const id = listAdmins.findIndex(u => u.email == adminToEdit.email)
    const firstNameAdminDOM = document.getElementById('admin-first-name')
    const lastNameAdminDOM = document.getElementById('admin-last-name')
    const dniAdminDOM = document.getElementById('admin-dni')
    const birthdateAdminDOM = document.getElementById('admin-birthdate')
    const genderAdminDOM = document.getElementById('admin-gender')
    const phoneAdminDOM = document.getElementById('admin-phone')
    const addressAdminDOM = document.getElementById('admin-address')
    const prAdminDOM = document.getElementById('admin-pr')
    const specialtyAdminDOM = document.getElementById('admin-specialty')
    const emailAdminDOM = document.getElementById('admin-email')
    const passwordAdminDOM = document.getElementById('admin-password')
    const statusAdminDOM = document.getElementById('admin-status')

    adminToEdit = null;
    
    if ((firstNameAdminDOM.value) && (lastNameAdminDOM.value) && (dniAdminDOM.value) && (birthdateAdminDOM.value) && (genderAdminDOM.value) && (phoneAdminDOM.value) && (addressAdminDOM.value) && (prAdminDOM.value) && (specialtyAdminDOM.value) && (emailAdminDOM.value) && (passwordAdminDOM.value) && (statusAdminDOM.value)) {
        listAdmins[id].firstName = firstNameAdminDOM.value
        listAdmins[id].lastName = lastNameAdminDOM.value
        listAdmins[id].dni = dniAdminDOM.value
        listAdmins[id].birthdate = birthdateAdminDOM.value
        listAdmins[id].gender = genderAdminDOM.value
        listAdmins[id].phone = phoneAdminDOM.value
        listAdmins[id].address = addressAdminDOM.value
        listAdmins[id].pr = prAdminDOM.value
        listAdmins[id].specialty = specialtyAdminDOM.value
        listAdmins[id].email = emailAdminDOM.value
        listAdmins[id].password = passwordAdminDOM.value
        listAdmins[id].status = statusAdminDOM.value

        localStorage.setItem('admins', JSON.stringify(listAdmins))
        listAdmins = JSON.parse(localStorage.getItem('admins'))
        generateTableRegisterAdmins(listAdmins)
        generateTableAdmins(listAdmins)

        const successEditToastDOM = document.getElementById('success-edit-toast')
        const toast = new bootstrap.Toast(successEditToastDOM)
        toast.show()
        // setTimeout(function() {
        //     location.reload();
        // }, 3000);
    } else {
        const errorToastDOM = document.getElementById('error-toast')
        const toast = new bootstrap.Toast(errorToastDOM)
        toast.show()
        setTimeout(function() {
            location.reload();
        }, 3000);
    }
}

formEditUserDOM.onsubmit = (e) => {
    e.preventDefault()
    const id = listUsers.findIndex(u => u.email == userToEdit.email)
    const firstNameUserDOM = document.getElementById('user-first-name')
    const lastNameUserDOM = document.getElementById('user-last-name')
    const dniUserDOM = document.getElementById('user-dni')
    const birthdateUserDOM = document.getElementById('user-birthdate')
    const genderUserDOM = document.getElementById('user-gender')
    const phoneUserDOM = document.getElementById('user-phone')
    const addressUserDOM = document.getElementById('user-address')
    const sureUserDOM = document.getElementById('user-sure')
    const nationalityUserDOM = document.getElementById('user-nationality')
    const emailUserDOM = document.getElementById('user-email')
    const passwordUserDOM = document.getElementById('user-password')

    userToEdit = null;

    if ((firstNameUserDOM.value) && (lastNameUserDOM.value) && (dniUserDOM.value) && (birthdateUserDOM.value) && (genderUserDOM.value) && (phoneUserDOM.value) && (addressUserDOM.value) && (sureUserDOM.value) && (nationalityUserDOM.value) && (emailUserDOM.value) && (passwordUserDOM.value)){
        listUsers[id].firstName = firstNameUserDOM.value
        listUsers[id].lastName = lastNameUserDOM.value
        listUsers[id].dni = dniUserDOM.value
        listUsers[id].dni = birthdateUserDOM.value
        listUsers[id].gender = genderUserDOM.value
        listUsers[id].phone = phoneUserDOM.value
        listUsers[id].address = addressUserDOM.value
        listUsers[id].pr = sureUserDOM.value
        listUsers[id].specialty = nationalityUserDOM.value
        listUsers[id].email = emailUserDOM.value
        listUsers[id].password = passwordUserDOM.value

        localStorage.setItem('users', JSON.stringify(listUsers))
        listUsers = JSON.parse(localStorage.getItem('users'))
        generateTableUsers(listUsers)

        const successEditToastDOM = document.getElementById('success-edit-toast')
        const toast = new bootstrap.Toast(successEditToastDOM)
        toast.show()
        // setTimeout(function() {
        //     location.reload();
        // }, 3000);
    } else {
        const errorToastDOM = document.getElementById('error-toast')
        const toast = new bootstrap.Toast(errorToastDOM)
        toast.show()
        setTimeout(function() {
            location.reload();
        }, 3000);
    }
}
generateTableRegisterAdmins(listAdmins)
generateTableAdmins(listAdmins)
generateTableUsers(listUsers)