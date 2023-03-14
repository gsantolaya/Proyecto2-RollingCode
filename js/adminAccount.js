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
let listAdmins = []
const storageTurns = localStorage.getItem('turns')
let listTurns = []
const storageConsults = localStorage.getItem('consults')
let listConsults = []
let tbodyConsultsTableDOM = document.getElementById('tbodyConsultsTable')
let tbodyDrTurnsTableDOM = document.getElementById('tbodyTurnsDrTable')
let myAccountTableBodyDOM = document.getElementById('myAccountTableBody')
let btnDeleteConsultDOM = document.getElementById('btn-delete-consult')
let btnDeleteTurnDOM = document.getElementById('btn-delete-turn')
let btnDeleteMyAccountDOM = document.getElementById('btn-delete-myaccount')
let formEditMyAccountDOM = document.getElementById('formEditMyAccount')

let listTurnsDr = []
let myAdmin = []

adminLogin = JSON.parse(storageAdminLogIn)
if (storageAdmins) {
    listAdmins = JSON.parse(storageAdmins)
}
if (storageTurns) {
    listTurns = JSON.parse(storageTurns)
}
if (storageConsults) {
    listConsults = JSON.parse(storageConsults)
}


function deleteConsult(fullname) {
    deleteConfig = {
        for: 'consult',
        fullname: fullname
    }
}
function deleteDrTurn(patient) {
    deleteConfig = {
        for: 'turn',
        patient: patient
    }
}
function deleteMyAdmin(dni) {
    deleteConfig = {
        for: 'admin',
        dni: dni
    }
}

function loadEditMyAccount(admin) {
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


//Funciones generando tablas:
for (let i = 0; i < listAdmins.length; i++) {
    adminLogin = JSON.parse(storageAdminLogIn)
    const admin = listAdmins[i];
    if (admin.dni == adminLogin.dni) {
        let newAdmin = {
            firstName: admin.firstName,
            lastName: admin.lastName,
            dni: admin.dni,
            birthdate: admin.birthdate,
            gender: admin.gender,
            phone: admin.phone,
            address: admin.address,
            pr: admin.pr,
            specialty: admin.specialty,
            email: admin.email,
            password: admin.password,
            type: admin.type,
            schedules: admin.schedules,
            status:admin.status
        }
        myAdmin.push(newAdmin)
    }
}

function generateMyAccount(myAdmin) {
    myAccountTableBodyDOM.innerHTML = ''
    myAdmin.forEach((admin, i) => {
        if (admin) {
            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1
            const trDOM = document.createElement('tr')

            const tdfirstNameMyAccountDOM = document.createElement('td')
            tdfirstNameMyAccountDOM.textContent = admin.firstName
            const tdLastNameMyAccountDOM = document.createElement('td')
            tdLastNameMyAccountDOM.textContent = admin.lastName
            const tdEmailMyAccountDOM = document.createElement('td')
            tdEmailMyAccountDOM.textContent = admin.email
            const tdPasswordMyAccountDOM = document.createElement('td')
            tdPasswordMyAccountDOM.textContent = admin.password

            const tdActionsDOM = document.createElement('td')
            const btnEditDOM = document.createElement('button')
            btnEditDOM.innerHTML = `<span class="fa fa-solid fa-edit btnEdit"></span>`
            btnEditDOM.classList = 'btn btn-outline-dark me-1'
            btnEditDOM.setAttribute("data-bs-toggle", "modal");
            btnEditDOM.setAttribute("data-bs-target", "#editMyAccount");
            btnEditDOM.onclick = () => {loadEditMyAccount(admin) }
            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash btnDelete"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmMyAccountDelete");
            btnDeleteDOM.onclick = () => { deleteMyAdmin(admin.dni) }

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
    adminLogin = JSON.parse(storageAdminLogIn)
    const turn = listTurns[i];
    if (turn.dr == adminLogin.dni) {
        let newDrTurn = {
            patient: turn.patient,
            hour: turn.hour,
            day: turn.day,
            reasonConsultation: turn.reasonConsultation
        }
        listTurnsDr.push(newDrTurn)
    }
}

function generateTableDrTurns(listTurnsDr) {
    tbodyDrTurnsTableDOM.innerHTML = ''
    listTurnsDr.forEach((turn, i) => {
        if (turn) {
            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1
            const trDOM = document.createElement('tr')

            const tdPatientDOM = document.createElement('td')
            tdPatientDOM.textContent = turn.patient
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
            btnDeleteDOM.onclick = () => { deleteDrTurn(turn.patient) }

            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdPatientDOM)
            trDOM.appendChild(tdDayDOM)
            trDOM.appendChild(tdHourDOM)
            trDOM.appendChild(tdReasonConsultationDOM)

            trDOM.appendChild(tdActionsDOM)
            tbodyDrTurnsTableDOM.append(trDOM)
        }
    });
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
function generateTableConsults(listConsults) {
    tbodyConsultsTableDOM.innerHTML = ''
    listConsults.forEach((consult, i) => {
        if (consult) {

            const thDOM = document.createElement('th')
            thDOM.textContent = i + 1
            const trDOM = document.createElement('tr')

            const tdPatientFullname = document.createElement('td')
            tdPatientFullname.textContent = consult.fullname
            const tdPatientEmail = document.createElement('td')
            tdPatientEmail.textContent = consult.email
            const tdPatientPhone = document.createElement('td')
            tdPatientPhone.textContent = consult.phone
            const tdPatientConsult = document.createElement('td')
            tdPatientConsult.textContent = consult.consult

            const tdActionsDOM = document.createElement('td')

            const btnDeleteDOM = document.createElement('button')
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash btnDelete"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmConsultDelete");
            btnDeleteDOM.onclick = () => { deleteConsult(consult.fullname) }

            tdActionsDOM.appendChild(btnDeleteDOM)


            trDOM.appendChild(thDOM)
            trDOM.appendChild(tdPatientFullname)
            trDOM.appendChild(tdPatientEmail)
            trDOM.appendChild(tdPatientPhone)
            trDOM.appendChild(tdPatientConsult)


            trDOM.appendChild(tdActionsDOM)
            tbodyConsultsTableDOM.append(trDOM)
        }
    });
}
//-------------------------------------------------------------------------------------------------------------------------------------
//Funciones delete
btnDeleteConsultDOM.onclick = (e) => {
    let newConsults = []
    newConsults = listConsults.filter(u => u.fullname != deleteConfig.fullname)
    localStorage.setItem('consults', JSON.stringify(newConsults))
    listConsults = newConsults;
    const consultDeleteToastDOM = document.getElementById('consult-delete-toast')
    const toast = new bootstrap.Toast(consultDeleteToastDOM)
    toast.show()
    generateTableConsults(listConsults)
}

btnDeleteTurnDOM.onclick = (e) => {
    let newListTurns = []
    newListTurns = listTurns.filter(u => u.patient != deleteConfig.patient)
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
    let newMyAdmin = []
    newMyAdmin = listAdmins.filter(u => u.dni != deleteConfig.dni)
    localStorage.setItem('admins', JSON.stringify(newMyAdmin))
    listAdmins = newMyAdmin;
    localStorage.removeItem('adminLogIn')
    window.location = './index.html'
}
formEditMyAccountDOM.onsubmit = (e) => {
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

        const successEditToastDOM = document.getElementById('success-editMyAccount-toast')
        const toast = new bootstrap.Toast(successEditToastDOM)
        toast.show()
        setTimeout(function() {
            location.reload()
        }, 3000)
    }else {
        /*const errorToastDOM = document.getElementById('error-toast')
        const toast = new bootstrap.Toast(errorToastDOM)
        toast.show()*/
        setTimeout(function() {
            location.reload()
        }, 3000);
    }
}

generateTableDrTurns(listTurnsDr)
generateTableConsults(listConsults)
generateMyAccount(myAdmin)