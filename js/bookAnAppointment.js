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
//----------------------------------------------------------------------------------------------------------------------------------------
//Boton solicitar turno
if (storageUserLogIn) {
    let bookAppointmentButton = document.getElementById("book-appointment-button")

    bookAppointmentButton.onclick = (e) => {
        e.preventDefault()
        window.location = './bookAnAppointment.html'
    }
}
//-----------------------------------------------------------------------------------------------------------------------------------------
//Si no hay una sesion iniciada, redirecciona a login
const myModal = document.getElementById('login-modal')
const myInput = document.getElementById('formLogIn')
if (storageAdminLogIn){
    window.location = './index.html'
} else if (storageUserLogIn == null) {
    window.location = './login.html'
    alert("Debe iniciar sesion")
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
let bookAnAppointmentForm = document.getElementById('bookAnAppointment-form')
let selectDrDOM = document.getElementById('select-dr')
let selectDayDOM = document.getElementById('select-day')
let selectHourDOM = document.getElementById('select-hour')
let fecha = document.getElementById('fecha')
let validationTextarea = document.getElementById('validationTextarea')
let fileInput = document.getElementById('file-input')
let searchInputDOM = document.getElementById('search-input')
let listUserLogIn = []
let listTurns = []
//let userLogIn = []
let listProfessionals = []
let filteredprofessional = []
let prefix = undefined


const storageProfessionals = localStorage.getItem('admins')
if (storageProfessionals) {
    listProfessionals = JSON.parse(storageProfessionals)
}

let searchNameDOM = document.getElementById('search-name')
let searchSpecialtyDOM = document.getElementById('search-specialty')
let daysAttentionDOM = document.getElementById('days-attention')
let optionSearchSelected = "name"

searchNameDOM.onclick = () => {
    optionSearchSelected = "name"
}
searchSpecialtyDOM.onclick = () => {
    optionSearchSelected = "specialty"
}

selectDrDOM.innerHTML = `<option selected disabled value="">Seleccione una opción</option>`
for (let i = 0; i < listProfessionals.length; i++) {
    const professional = listProfessionals[i];
    if (professional.gender == "Femenino") {
        prefix = "Dra."
    } else {
        prefix = "Dr."
    }
    selectDrDOM.innerHTML += `<option value="${professional.dni}">${prefix} ${professional.firstName} ${professional.lastName}</option>`
}
if (daysAttentionDOM.value == 'alls') {
    searchInputDOM.onkeyup = (e) => {
        let professionalFilter = (e.target.value).toLowerCase().trim()
        let searchBy = optionSearchSelected == "specialty" ? 'specialty' : 'firstName'
        filteredprofessional = listProfessionals.filter((profesional) => profesional[searchBy].toLowerCase().trim().includes(professionalFilter))

        selectDrDOM.innerHTML = `<option selected disabled value="">Seleccione una opción</option>`
        for (let i = 0; i < filteredprofessional.length; i++) {
            const professional = filteredprofessional[i];
            if (professional.gender == "Femenino") {
                prefix = "Dra."
            } else {
                prefix = "Dr."
            }
            selectDrDOM.innerHTML += `<option value="${professional.dni}">${prefix} ${professional.firstName} ${professional.lastName}</option>`
        }
    }


    daysAttentionDOM.onchange = (e) => {
        let daySelected = e.target.value
        let searchBy = optionSearchSelected == "specialty" ? 'specialty' : 'firstName'
        filteredprofessional = []
        listProfessionals.forEach((professional) => {
            if (professional[searchBy].toLowerCase().trim().includes(searchInputDOM.value.toLowerCase().trim())) {
                if (professional.schedules[daySelected] && professional.schedules[daySelected].length > 0) {
                    filteredprofessional.push(professional)
                }
            }
        })
        selectDrDOM.innerHTML = `<option selected disabled value="">Seleccione una opción</option>`
        for (let i = 0; i < filteredprofessional.length; i++) {
            const professional = filteredprofessional[i];
            if (professional.gender == "Femenino") {
                prefix = "Dra."
            } else {
                prefix = "Dr."
            }
            selectDrDOM.innerHTML += `<option value="${professional.dni}">${prefix} ${professional.firstName} ${professional.lastName}</option>`
        }
        searchInputDOM.onkeyup = (e) => {
            let professionalFilter = (e.target.value).toLowerCase().trim()
            let searchBy = optionSearchSelected == "specialty" ? 'specialty' : 'firstName'
            filteredprofessional = []
            listProfessionals.forEach((professional) => {
                if (professional[searchBy].toLowerCase().trim().includes(professionalFilter)) {
                    if (professional.schedules[daysAttentionDOM.value] && professional.schedules[daysAttentionDOM.value].length > 0) {
                        filteredprofessional.push(professional)
                    }
                }
            })
        }
    }

}





selectDrDOM.onchange = () => {
    selectDayDOM.innerHTML = `<option selected disabled value="">Seleccione una opción</option>`
    let professionalSelected = listProfessionals.find(professional => selectDrDOM.value.includes(professional.dni))
    if (professionalSelected.schedules.monday.length != 0) {
        selectDayDOM.innerHTML += `<option>Lunes</option>`
    }
    if (professionalSelected.schedules.tuesday.length != 0) {
        selectDayDOM.innerHTML += `<option>Martes</option>`
    }
    if (professionalSelected.schedules.wednesday.length != 0) {
        selectDayDOM.innerHTML += `<option>Miércoles</option>`
    }
    if (professionalSelected.schedules.thursday.length != 0) {
        selectDayDOM.innerHTML += `<option>Jueves</option>`
    }
    if (professionalSelected.schedules.friday.length != 0) {
        selectDayDOM.innerHTML += `<option>Viernes</option>`
    }
}

selectDayDOM.onchange = () => {
    selectHourDOM.innerHTML = `<option selected disabled value="">Seleccione una opción</option>`
    let professionalSelected = listProfessionals.find(professional => selectDrDOM.value.includes(professional.dni))
    switch (selectDayDOM.value) {
        case "Lunes":
            for (let i = 0; i < professionalSelected.schedules.monday.length; i++) {
                const hour = professionalSelected.schedules.monday[i];
                selectHourDOM.innerHTML += `<option>${hour}</option>`
            }
            break;
        case "Martes":
            for (let i = 0; i < professionalSelected.schedules.tuesday.length; i++) {
                const hour = professionalSelected.schedules.tuesday[i];
                selectHourDOM.innerHTML += `<option>${hour}</option>`
            }
            break;
        case "Miércoles":
            for (let i = 0; i < professionalSelected.schedules.wednesday.length; i++) {
                const hour = professionalSelected.schedules.wednesday[i];
                selectHourDOM.innerHTML += `<option>${hour}</option>`
            }
            break;
        case "Jueves":
            for (let i = 0; i < professionalSelected.schedules.thursday.length; i++) {
                const hour = professionalSelected.schedules.thursday[i];
                selectHourDOM.innerHTML += `<option>${hour}</option>`
            }
            break;
        case "Viernes":
            for (let i = 0; i < professionalSelected.schedules.friday.length; i++) {
                const hour = professionalSelected.schedules.friday[i];
                selectHourDOM.innerHTML += `<option>${hour}</option>`
            }
            break;
        default:
            break;
    }
}




bookAnAppointmentForm.onsubmit = (e) => {
    e.preventDefault()
    const storageTurns = localStorage.getItem('turns')
    if (storageTurns) {
        listTurns = JSON.parse(storageTurns)
    }
    if (storageUserLogIn) {
        userLogIn = JSON.parse(storageUserLogIn)
    }
    if (selectDrDOM.value.trim() != "" && selectDayDOM.value.trim() != "" && selectHourDOM.value.trim() != "" && validationTextarea.value.trim() != "") {
        const userFind = listTurns.find(turn => turn.patient == userLogIn.dni && turn.dr == selectDrDOM.value)
        if (userFind) {
            const errorToastDOM = document.getElementById('error-toast')
            const errorToastBody = document.getElementById('error-toast-body')
            errorToastBody.innerHTML = 'Lo sentimos, ya posee un turno con el profesional seleccionado, si desea cambiarlo debe eliminarlo primero.'
            const toast = new bootstrap.Toast(errorToastDOM)
            toast.show()
        } else {
            const turnFind = listTurns.find(turn => turn.dr == selectDrDOM.value.trim() && turn.day == selectDayDOM.value.trim() && turn.hour == selectHourDOM.value.trim())
            if (turnFind) {
                const errorToastDOM = document.getElementById('error-toast')
                const errorToastBody = document.getElementById('error-toast-body')
                errorToastBody.innerHTML = 'Lo sentimos, el turno seleccionado no se encuentra disponible, intente nuevamente en otro día u horario'
                const toast = new bootstrap.Toast(errorToastDOM)
                toast.show()
            } else {
                const newTurn = {
                    dr: selectDrDOM.value,
                    day: selectDayDOM.value,
                    hour: selectHourDOM.value,
                    reasonConsultation: validationTextarea.value,
                    patient: `${userLogIn.dni}`
                }
                listTurns.push(newTurn)
                localStorage.setItem('turns', JSON.stringify(listTurns))

                const successToastDOM = document.getElementById('success-toast')
                const toast = new bootstrap.Toast(successToastDOM)
                toast.show()
            }
        }
    } else {
        const errorToastDOM = document.getElementById('error-toast')
        const toast = new bootstrap.Toast(errorToastDOM)
        toast.show()
    }
}