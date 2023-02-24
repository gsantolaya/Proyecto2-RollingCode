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
//----------------------------------------------------------------------------------------------------------------------------------------
let formSelectUserType = document.getElementById("form-select-user-type")
let userType = document.getElementById("user-type")
let registerForm = document.getElementById("register-form")
let usersList = []



formSelectUserType.onsubmit = (e) => {
    e.preventDefault()
    if (userType.value == "Profesional") {
        registerForm.innerHTML = `
            <div class="col-md-4">
                    <label for="user-first-name" class="form-label">Nombre:</label>
                    <input type="text" class="form-control" id="user-first-name" value="" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su Nombre.
                    </div>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="user-last-name" class="form-label">Apellido:</label>
                    <input type="text" class="form-control" id="user-last-name" value="" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su apellido.
                    </div>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="user-dni" class="form-label">DNI:</label>
                    <input type="text" class="form-control" id="user-dni" value="" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su número de DNI.
                    </div>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="user-nationality" class="form-label">Nacionalidad:</label>
                    <input type="text" class="form-control" id="user-nationality" value="" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su nacionalidad.
                    </div>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="user-phone" class="form-label">Teléfono:</label>
                    <input type="text" class="form-control" id="user-phone" value="" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su número de teléfono.
                    </div>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="user-address" class="form-label">Domicilio:</label>
                    <input type="text" class="form-control" id="user-address" value="" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su domicilio.
                    </div>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="user-pr" class="form-label">Matrícula profesional:</label>
                    <input type="text" class="form-control" id="user-pr" value="" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su número de matrícula profesional.
                    </div>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="col-md-3">
                    <label for="user-specialty" class="form-label">Especialidad:</label>
                    <select class="form-select" id="user-specialty" required>
                        <option selected disabled value="">General</option>
                        <option>Endodoncia</option>
                        <option>Cirugia</option>
                        <option>Ortodoncia</option>
                        <option>Operatoria</option>
                        <option>Protesis</option>
                    </select>
                    <div class="invalid-feedback">
                        Por favor seleccione una especialidad.
                    </div>
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="user-email" class="form-label">Email:</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="email" class="form-control" id="user-email"
                            aria-describedby="inputGroupPrepend" required>
                        <div class="invalid-feedback">
                            Por favor ingrese su email.
                        </div>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="user-password" class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" id="user-password" value="" maxlength="20" minlength="6" required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>                    <div class="col-md-4">
                    <label for="user-repeat-password" class="form-label">Repetir contraseña:</label>
                    <input type="password" class="form-control" id="user-repeat-password" value="" maxlength="20" minlength="6" required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                        <label class="form-check-label" for="invalidCheck">
                            Estoy de acuerdo con los términos y condiciones.
                        </label>
                        <div class="invalid-feedback">
                            Debes estar de acuerdo con los términos y condiciones antes de registrarte.
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" id="form-register-button" type="submit">Registrarse</button>
                </div>
            `

        registerForm.onsubmit = (e) => {
            let userFirstName = document.getElementById('user-first-name')
            let userLastName = document.getElementById('user-last-name')
            let userDni = document.getElementById('user-dni')
            let userNationality = document.getElementById('user-nationality')
            let userPhone = document.getElementById('user-phone')
            let userAddress = document.getElementById('user-address')
            let userPr = document.getElementById('user-pr')
            let userSpecialty = document.getElementById('user-specialty')
            let userEmail = document.getElementById('user-email')
            let userPassword = document.getElementById('user-password')
            let userRepeatPassword = document.getElementById('user-repeat-password')
            const toastLiveExample = document.getElementById('liveToast')


            e.preventDefault()
            const storageUserList = localStorage.getItem('admins')

            if (userFirstName.value.trim() != "" && userLastName.value.trim() != "" && userDni.value.trim() != "" && userNationality.value.trim() != "" && userPhone.value.trim() != "" && userAddress.value.trim() != "" && userPr.value.trim() != "" && userSpecialty.value.trim() != "" && userEmail.value.trim() != "" && userPassword.value.trim() != "" && userRepeatPassword.value.trim() != "") {
                if (storageUserList) {
                    usersList = JSON.parse(storageUserList)
                }
                const newUser = {
                    firstName: userFirstName.value,
                    lastName: userLastName.value,
                    dni: userDni.value,
                    nationality: userNationality.value,
                    phone: userPhone.value,
                    address: userAddress.value,
                    pr: userPr.value,
                    specialty: userSpecialty.value,
                    email: userEmail.value,
                    password: userPassword.value,
                    type: userType.value
                }
                usersList.push(newUser)
                localStorage.setItem('admins', JSON.stringify(usersList))
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
                registerForm.reset()

            }
        }
    }
    else if (userType.value == "Paciente") {
        registerForm.innerHTML = `
            <div class="col-md-4">
                <label for="user-first-name" class="form-label">Nombre:</label>
                <input type="text" class="form-control" id="user-first-name" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su nombre.
                </div>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-last-name" class="form-label">Apellido:</label>
                <input type="text" class="form-control" id="user-last-name" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su apellido.
                </div>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-birthdate" class="form-label">Fecha de nacimiento:</label>
                <input type="date" class="form-control" id="user-birthdate" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su fecha de nacimiento.
                </div>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-dni" class="form-label">DNI:</label>
                <input type="text" class="form-control" id="user-dni" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su número de DNI.
                </div>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-nationality" class="form-label">Nacionalidad:</label>
                <input type="text" class="form-control" id="user-nationality" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su nacionalidad.
                </div>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-phone" class="form-label">Teléfono:</label>
                <input type="text" class="form-control" id="user-phone" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su número de teléfono.
                </div>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-address" class="form-label">Domicilio:</label>
                <input type="text" class="form-control" id="user-address" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su domicilio.
                </div>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-3">
                <label for="user-sure" class="form-label">Obra social:</label>
                <select class="form-select" id="user-sure">
                    <option>Sin Obra Social</option>
                    <option>SUBSIDIO DE SALUD</option>
                    <option>SWISS MEDICAL GROUP	</option>
                    <option>O.S.A. PRENSA</option>
                    <option>PODER JUDICIAL NAC.	</option>
                    <option>APM PROTESIS	</option>
                    <option>LUIS PASTEUR</option>
                    <option>SOCDUS Ceramistas</option>
                    <option>OSPRERA</option>
                    <option>AMFFA</option>
                    <option>OSDIPP</option>
                    <option>OSSEG </option>
                    <option>OSDE</option>
                    <option>TV SALUD</option>
                    <option>JERARQUICO SALUD</option>
                    <option>POLICIA FEDERAL</option>
                    <option>CONSULMED</option>
                    <option>GALENO</option>
                    <option>SADAIC</option>
                    <option>ASOC. MUTUAL SANCOR</option>
                    <option>ACA SALUD - AVALIAN</option>
                    <option>DASUTeN</option>
                    <option>OSPLAD</option>
                    <option>AMNSTERDAM SALUD</option>
                    <option>APM ODONTOLOGIA GRAL.</option>
                    <option>BRAMED PRIVADA</option>
                    <option>ODONTOPLAD</option>
                    <option>BASA UTE UOM</option>
                    <option>MUTUAL AGUA Y ENERGIA</option>
                    <option>UTA</option>
                    <option>OSPe</option>
                    <option>OSFATUN - SER SANO</option>
                    <option>PREVENCION SALUD</option>
                    <option>OSFATLYF - LUZ Y FUERZA</option>
                    <option>MEDICUS</option>
                    <option>PROVINCIA ART</option>
                    <option>MEP LIFE</option>
                    <option>ODONTOLOGIA FAA</option>
                    <option>IOSFA</option>
                    <option>MEDIFE</option>
                    <option>OSPIM</option>
                    <option>AMERICA SERVICIOS</option>
                    <option>PERSONAL DE FARMACIA</option>
                    <option>OTRA</option>
                </select>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-email" class="form-label">Email:</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="email" class="form-control" id="user-email"
                        aria-describedby="inputGroupPrepend" required>
                    <div class="invalid-feedback">
                    Por favor ingrese su email.
                    </div>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-password" class="form-label">Contraseña:</label>
                <input type="password" class="form-control" id="user-password" value="" maxlength="20" minlength="6" required>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>                    <div class="col-md-4">
                <label for="user-repeat-password" class="form-label">Repetir contraseña:</label>
                <input type="password" class="form-control" id="user-repeat-password" value="" maxlength="20" minlength="6" required>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                        <label class="form-check-label" for="invalidCheck">
                            Estoy de acuerdo con los términos y condiciones.
                        </label>
                        <div class="invalid-feedback">
                            Debes estar de acuerdo con los términos y condiciones antes de registrarte.
                        </div>
                    </div>
                </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Registrarse</button>
            </div>
            `

        registerForm.onsubmit = (e) => {
            let userFirstName = document.getElementById('user-first-name')
            let userLastName = document.getElementById('user-last-name')
            let userBirthdate = document.getElementById('user-birthdate')
            let userDni = document.getElementById('user-dni')
            let userNationality = document.getElementById('user-nationality')
            let userPhone = document.getElementById('user-phone')
            let userAddress = document.getElementById('user-address')
            let userSure = document.getElementById('user-sure')
            let userEmail = document.getElementById('user-email')
            let userPassword = document.getElementById('user-password')
            let userRepeatPassword = document.getElementById('user-repeat-password')
            const toastLiveExample = document.getElementById('liveToast')


            e.preventDefault()
            const storageUserList = localStorage.getItem('users')

            if (userFirstName.value.trim() != "" && userLastName.value.trim() != "" && userDni.value.trim() != "" && userNationality.value.trim() != "" && userPhone.value.trim() != "" && userAddress.value.trim() != "" && userBirthdate.value.trim() != "" && userSure.value.trim() != "" && userEmail.value.trim() != "" && userPassword.value.trim() != "" && userRepeatPassword.value.trim() != "") {
                if (storageUserList) {
                    usersList = JSON.parse(storageUserList)
                }
                const newUser = {
                    firstName: userFirstName.value,
                    lastName: userLastName.value,
                    birthdate: userBirthdate.value,
                    dni: userDni.value,
                    nationality: userNationality.value,
                    phone: userPhone.value,
                    address: userAddress.value,
                    sure: userSure.value,
                    email: userEmail.value,
                    password: userPassword.value,
                    type: userType.value
                }
                usersList.push(newUser)
                localStorage.setItem('users', JSON.stringify(usersList))
                const toast = new bootstrap.Toast(toastLiveExample)
                toast.show()
            }
        }
    }
}