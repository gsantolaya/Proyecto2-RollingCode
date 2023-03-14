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
//---------------------------------------------------------------------------------------------------------------------------------------------------------
const storageUsers = localStorage.getItem('users')
let listUsers = []
const storageTurns = localStorage.getItem('turns')
let listTurns = []
let tbodyConsultsTableDOM = document.getElementById('tbodyConsultsTable')
let tbodyDrTurnsTableDOM = document.getElementById('tbodyTurnsDrTable')
let myAccountTableBodyDOM = document.getElementById('myAccountTableBody')
let btnDeleteConsultDOM = document.getElementById('btn-delete-consult')
let btnDeleteTurnDOM = document.getElementById('btn-delete-turn')
let btnDeleteMyAccountDOM = document.getElementById('btn-delete-myaccount')
let formEditMyAccountDOM = document.getElementById('formEditMyAccount')

let listPatientTurn = []
let myUser = []



userLogin = JSON.parse(storageUserLogIn)

if (storageUsers) {
    listUsers = JSON.parse(storageUsers)
}
if (storageTurns) {
    listTurns = JSON.parse(storageTurns)
}



function deletePatientTurn(dr) {
    deleteConfig = {
        for: 'turn',
        dr: dr
    }
}
function deleteMyUser(dni) {
    deleteConfig = {
        for: 'user',
        dni: dni
    }
}

function loadEditMyAccount(user) {
    userToEdit = user;
    const firstNameUserDOM = document.getElementById('user-first-name')
    firstNameUserDOM.value = user.firstName
    const lastNameUserDOM = document.getElementById('user-last-name')
    lastNameUserDOM.value = user.lastName
    const dniUserDOM = document.getElementById('user-dni')
    dniUserDOM.value = user.dni
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
    const nationalityUserDOM = document.getElementById('user-nationality')
    nationalityUserDOM.value = user.nationality
    const emailUserDOM = document.getElementById('user-email')
    emailUserDOM.value = user.email
    const passwordUserDOM = document.getElementById('user-password')
    passwordUserDOM.value = user.password

}
//Funciones generando tablas:
for (let i = 0; i < listUsers.length; i++) {
    userLogin = JSON.parse(storageUserLogIn)
    const user = listUsers[i];
    if (user.dni == userLogin.dni) {
        let newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            dni: user.dni,
            birthdate: user.birthdate,
            gender: user.gender,
            phone: user.phone,
            address: user.address,
            nationality: user.nationality,
            sure: user.sure,
            email: user.email,
            password: user.password,
            type: user.type
        }
        myUser.push(newUser)
    }
}
function generateMyAccount(myUser) {
    myAccountTableBodyDOM.innerHTML = ''
    myUser.forEach((user, i) => {
        if (user) {
            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1
            const trDOM = document.createElement('tr')

            const tdfirstNameMyAccountDOM = document.createElement('td')
            tdfirstNameMyAccountDOM.textContent = user.firstName
            const tdLastNameMyAccountDOM = document.createElement('td')
            tdLastNameMyAccountDOM.textContent = user.lastName
            const tdEmailMyAccountDOM = document.createElement('td')
            tdEmailMyAccountDOM.textContent = user.email
            const tdPasswordMyAccountDOM = document.createElement('td')
            tdPasswordMyAccountDOM.textContent = user.password

            const tdActionsDOM = document.createElement('td')
            const btnEditDOM = document.createElement('button')
            btnEditDOM.innerHTML = `<span class="fa fa-solid fa-edit btnEdit"></span>`
            btnEditDOM.classList = 'btn btn-outline-dark me-1'
            btnEditDOM.setAttribute("data-bs-toggle", "modal");
            btnEditDOM.setAttribute("data-bs-target", "#editMyAccount");
            btnEditDOM.onclick = () => {loadEditMyAccount(user) }
            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash btnDelete"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmMyAccountDelete");
            btnDeleteDOM.onclick = () => { deleteMyUser(user.dni) }

            tdActionsDOM.appendChild(btnEditDOM)
            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdfirstNameMyAccountDOM)
            trDOM.appendChild(tdLastNameMyAccountDOM)
            trDOM.appendChild(tdEmailMyAccountDOM)
            trDOM.appendChild(tdPasswordMyAccountDOM)

            trDOM.appendChild(tdActionsDOM)
            myAccountTableBodyDOM.append(trDOM)
        }
    });
}
///----------------------------------------------------------------------------------------------------------------------------------------------------
for (let i = 0; i < listTurns.length; i++) {
    userLogin = JSON.parse(storageUserLogIn)
    const turn = listTurns[i];
    if (turn.patient == userLogin.dni) {
        let newPatientTurn = {
            dr: turn.dr,
            hour: turn.hour,
            day: turn.day,
            reasonConsultation: turn.reasonConsultation
        }
        listPatientTurn.push(newPatientTurn)
    }
}

function generateTableMyTurns(listPatientTurn) {
    tbodyDrTurnsTableDOM.innerHTML = ''
    listPatientTurn.forEach((turn, i) => {
        if (turn) {
            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1
            const trDOM = document.createElement('tr')

            const tdDrDOM = document.createElement('td')
            tdDrDOM.textContent = turn.dr
            const tdDayDOM = document.createElement('td')
            tdDayDOM.textContent = turn.day
            const tdHourDOM = document.createElement('td')
            tdHourDOM.textContent = turn.hour
            const tdReasonConsultationDOM = document.createElement('td')
            tdReasonConsultationDOM.textContent = turn.reasonConsultation

            const tdActionsDOM = document.createElement('td')

            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash btnDelete"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmDrTurntDelete");
            btnDeleteDOM.onclick = () => { deletePatientTurn(turn.dr) }

            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdDrDOM)
            trDOM.appendChild(tdDayDOM)
            trDOM.appendChild(tdHourDOM)
            trDOM.appendChild(tdReasonConsultationDOM)

            trDOM.appendChild(tdActionsDOM)
            tbodyDrTurnsTableDOM.append(trDOM)
        }
    });
}



//-------------------------------------------------------------------------------------------------------------------------------------
//Funciones delete
btnDeleteTurnDOM.onclick = (e) => {
    let newListTurns = []
    newListTurns = listTurns.filter(u => u.dr != deleteConfig.dr)
    localStorage.setItem('turns', JSON.stringify(newListTurns))
    listTurns = newListTurns;
    const drTurnDeleteToastDOM = document.getElementById('drTurn-delete-toast')
    const toast = new bootstrap.Toast(drTurnDeleteToastDOM)
    toast.show()
    setTimeout(function () {
        location.reload();
    }, 3000);
}

btnDeleteMyAccountDOM.onclick = (e) => {
    let newMyUser = []
    newMyUser = listUsers.filter(u => u.dni != deleteConfig.dni)
    localStorage.setItem('users', JSON.stringify(newMyUser))
    listAdmins = newMyUser;
    localStorage.removeItem('userLogIn')
    window.location = './index.html'
}


formEditMyAccountDOM.onsubmit = (e) => {
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

    adminToEdit = null;
    
    if ((firstNameUserDOM.value) && (lastNameUserDOM.value) && (dniUserDOM.value) && (birthdateUserDOM.value) && (genderUserDOM.value) && (phoneUserDOM.value) && (addressUserDOM.value) && (sureUserDOM.value) && (nationalityUserDOM.value) && (emailUserDOM.value) && (passwordUserDOM.value)){
        listUsers[id].firstName = firstNameUserDOM.value
        listUsers[id].lastName = lastNameUserDOM.value
        listUsers[id].dni = dniUserDOM.value
        listUsers[id].birthdate = birthdateUserDOM.value
        listUsers[id].gender = genderUserDOM.value
        listUsers[id].phone = phoneUserDOM.value
        listUsers[id].address = addressUserDOM.value
        listUsers[id].pr = sureUserDOM.value
        listUsers[id].specialty = nationalityUserDOM.value
        listUsers[id].email = emailUserDOM.value
        listUsers[id].password = passwordUserDOM.value

        localStorage.setItem('users', JSON.stringify(listUsers))
        listUsers = JSON.parse(localStorage.getItem('users'))

        const successEditToastDOM = document.getElementById('success-editMyAccount-toast')
        const toast = new bootstrap.Toast(successEditToastDOM)
        toast.show()
        setTimeout(function() {
            location.reload()
        }, 3000)
    }else {
        const errorToastDOM = document.getElementById('error-toast')
        const toast = new bootstrap.Toast(errorToastDOM)
        toast.show()
        /*setTimeout(function() {
            location.reload()
        }, 3000);*/
    }
}

/*generateTableMyTurns(listTurnsDr)*/
generateTableMyTurns(listPatientTurn)
generateMyAccount(myUser)