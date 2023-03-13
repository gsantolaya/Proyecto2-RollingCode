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
let tbodyDrTurnsTableDOM = document.getElementById ('tbodyTurnsDrTable')
let btnDeleteConsultDOM = document.getElementById('btn-delete-consult')
let btnDeleteTurnDOM = document.getElementById('btn-delete-turn')

let listTurnsDr = []

adminLogin = JSON.parse(storageAdminLogIn)
if(storageAdmins){
    listAdmins = JSON.parse(storageAdmins)
}
if(storageTurns){
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

//Funciones generando tablas:




for (let i = 0; i < listTurns.length; i++) {
    adminLogin = JSON.parse(storageAdminLogIn)
    const turn = listTurns[i];
    if(turn.dr == adminLogin.dni){
        let newDrTurn = {
            patient:turn.patient,
            hour:turn.hour,
            day:turn.day,
            reasonConsultation:turn.reasonConsultation
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
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmDrTurntDelete");
            btnDeleteDOM.onclick = () => { deleteDrTurn(turn.patient)}

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
            btnDeleteDOM.innerHTML = `<span class="fa fa-solid fa-trash"></span>`
            btnDeleteDOM.classList = 'btn btn-outline-danger'
            btnDeleteDOM.setAttribute("data-bs-toggle", "modal");
            btnDeleteDOM.setAttribute("data-bs-target", "#confirmConsultDelete");
            btnDeleteDOM.onclick = () => { deleteConsult(consult.fullname)}

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
    let newDrTurns = []
    newDrTurns = listTurnsDr.filter(u => u.patient != deleteConfig.patient)
    console.log(newDrTurns)
    //localStorage.setItem('turns', JSON.stringify(listTurnsDr))
    listTurnsDr = newDrTurns;
    const drTurnDeleteToastDOM = document.getElementById('drTurn-delete-toast')
    const toast = new bootstrap.Toast(drTurnDeleteToastDOM)
    toast.show()
    setTimeout(function () {
        location.reload();
    }, 3000);
}



generateTableDrTurns(listTurnsDr)
generateTableConsults(listConsults)