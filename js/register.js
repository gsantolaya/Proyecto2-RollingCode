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
let adminsList = []



formSelectUserType.onsubmit = (e) => {
    e.preventDefault()
    if (userType.value == "Profesional") {
        registerForm.innerHTML =
            `
            <div class="col-md-4">
                <label for="admin-first-name" class="form-label"><b>Nombre:</b></label>
                <input type="text" maxlength="30" minlength="2" class="form-control" id="admin-first-name" value="" placeholder="Ej:Juán" required>
                <div class="invalid-feedback">
                    Por favor ingrese su Nombre correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-last-name" class="form-label"><b>Apellido:</b></label>
                <input type="text" maxlength="30" minlength="2" class="form-control" id="admin-last-name" value="" placeholder="Ej:Pérez" required>
                <div class="invalid-feedback">
                    Por favor ingrese su apellido correctamente.
                </div>     
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-dni" class="form-label"><b>DNI:</b></label>
                <input type="number" maxlength="8" minlength="7" class="form-control" id="admin-dni" value="" placeholder="Ej: 35263544" required>
                <div class="invalid-feedback">
                    Por favor ingrese su número de DNI correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-birthdate" class="form-label"><b>Fecha de nacimiento:</b></label>
                <input type="date" class="form-control" id="admin-birthdate" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su fecha de nacimiento correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-gender" class="form-label"><b>Sexo:</b></label>
                <select class="form-select" id="admin-gender" required>
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>
                <div class="invalid-feedback">
                    Por favor seleccione una opción.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-phone" class="form-label"><b>Teléfono:</b></label>
                <input type="tel" maxlength="15" minlength="2" class="form-control" id="admin-phone" value="" placeholder="Ej: 3815792562" required>
                <div class="invalid-feedback">
                    Por favor ingrese su número de teléfono correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-address" class="form-label"><b>Domicilio:</b></label>
                <input type="text" maxlength="30" minlength="10" class="form-control" id="admin-address" value="" placeholder="Ej: Laprida 550" required>
                <div class="invalid-feedback">
                    Por favor ingrese su domicilio correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-pr" class="form-label"><b>Matrícula profesional:</b></label>
                <input type="text" maxlength="4" minlength="3" class="form-control" id="admin-pr" value="" placeholder="Ej: 2750" required>
                <div class="invalid-feedback">
                    Por favor ingrese su número de matrícula profesional correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-specialty" class="form-label"><b>Especialidad:</b></label>
                <select class="form-select" id="admin-specialty" required>
                    <option>General</option>
                    <option>Endodoncia</option>
                    <option>Cirugia</option>
                    <option>Ortodoncia</option>
                    <option>Operatoria</option>
                    <option>Protesis</option>
                </select>
                <div class="invalid-feedback">
                    Por favor seleccione una opción.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-email" class="form-label"><b>Email:</b></label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="email" maxlength="30" minlength="5" class="form-control" id="admin-email"aria-describedby="inputGroupPrepend" placeholder="Ej: juanperez@gmail.com" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su email correctamente.
                    </div>
                    <div class="valid-feedback">
                        Excelente!
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-password" class="form-label"><b>Contraseña:</b></label>
                <input type="password" maxlength="30" minlength="5" class="form-control" id="admin-password" value="" maxlength="20" minlength="6" placeholder="******" required>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="admin-repeat-password" class="form-label"><b>Repetir contraseña:</b></label>
                <input type="password" maxlength="30" minlength="5" class="form-control" id="admin-repeat-password" value="" maxlength="20" minlength="6" placeholder="******" required>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="d-md-flex flex-row align-items-center justify-content-center mt-lg-4">
                <div class="col-12 col-lg-6 justify-content-end align-items-end m-0 p-0 text-center">
                    <h5 class="w-100"><b>Selecciones sus días y horarios de atención:</b></h5>
                    <div class="col-12 d-flex justify-content-evenly mt-lg-3">
                        <div>
                            <h6>Lunes:</h6>
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="09.00" id="monday09">
                                <label class="form-check-label" for="monday09">09.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="10.00" id="monday10">
                                <label class="form-check-label" for="monday10">10.00</label>
                            </div>                           
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="11.00" id="monday11">
                                <label class="form-check-label" for="monday11">11.00</label>
                            </div>   
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="12.00" id="monday12">
                                <label class="form-check-label" for="monday12">12.00</label>
                            </div>       
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="13.00" id="monday13">
                                <label class="form-check-label" for="monday13">13.00</label>
                            </div>                
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="14.00" id="monday14">
                                <label class="form-check-label" for="monday14">14.00</label>
                            </div>                          
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="15.00" id="monday15">
                                <label class="form-check-label" for="monday15">15.00</label>
                            </div>            
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="16.00" id="monday16">
                                <label class="form-check-label" for="monday16">16.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="17.00" id="monday17">
                                <label class="form-check-label" for="monday17">17.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="18.00" id="monday18">
                                <label class="form-check-label" for="monday18">18.00</label>
                            </div>                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="19.00" id="monday19">
                                <label class="form-check-label" for="monday19">19.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-monday" type="checkbox" value="20.00" id="monday20">
                                <label class="form-check-label" for="monday20">20.00</label>
                            </div>
                        </div>
                        <div>
                            <h6>Martes:</h6>
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="09.00" id="tuesday09">
                                <label class="form-check-label" for="tuesday09">09.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="10.00" id="tuesday10">
                                <label class="form-check-label" for="tuesday10">10.00</label>
                            </div>                           
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="11.00" id="tuesday11">
                                <label class="form-check-label" for="tuesday11">11.00</label>
                            </div>   
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="12.00" id="tuesday12">
                                <label class="form-check-label" for="tuesday12">12.00</label>
                            </div>       
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="13.00" id="tuesday13">
                                <label class="form-check-label" for="tuesday13">13.00</label>
                            </div>                
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="14.00" id="tuesday14">
                                <label class="form-check-label" for="tuesday14">14.00</label>
                            </div>                          
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="15.00" id="tuesday15">
                                <label class="form-check-label" for="tuesday15">15.00</label>
                            </div>            
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="16.00" id="tuesday16">
                                <label class="form-check-label" for="tuesday16">16.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="17.00" id="tuesday17">
                                <label class="form-check-label" for="tuesday17">17.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="18.00" id="tuesday18">
                                <label class="form-check-label" for="tuesday18">18.00</label>
                            </div>                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="19.00" id="tuesday19">
                                <label class="form-check-label" for="tuesday19">19.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-tuesday" type="checkbox" value="20.00" id="tuesday20">
                                <label class="form-check-label" for="tuesday20">20.00</label>
                            </div>
                        </div>
                        <div>
                            <h6>Miércoles:</h6>
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="09.00" id="wednesday09">
                                <label class="form-check-label" for="wednesday09">09.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="10.00" id="wednesday10">
                                <label class="form-check-label" for="wednesday10">10.00</label>
                            </div>                           
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="11.00" id="wednesday11">
                                <label class="form-check-label" for="wednesday11">11.00</label>
                            </div>   
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="12.00" id="wednesday12">
                                <label class="form-check-label" for="wednesday12">12.00</label>
                            </div>       
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="13.00" id="wednesday13">
                                <label class="form-check-label" for="wednesday13">13.00</label>
                            </div>                
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="14.00" id="wednesday14">
                                <label class="form-check-label" for="wednesday14">14.00</label>
                            </div>                          
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="15.00" id="wednesday15">
                                <label class="form-check-label" for="wednesday15">15.00</label>
                            </div>            
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="16.00" id="wednesday16">
                                <label class="form-check-label" for="wednesday16">16.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="17.00" id="wednesday17">
                                <label class="form-check-label" for="wednesday17">17.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday18" type="checkbox" value="18.00" id="wednesday18">
                                <label class="form-check-label" for="wednesday">18.00</label>
                            </div>                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="19.00" id="wednesday19">
                                <label class="form-check-label" for="wednesday19">19.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-wednesday" type="checkbox" value="20.00" id="wednesday20">
                                <label class="form-check-label" for="wednesday20">20.00</label>
                            </div>
                        </div>
                        <div>
                            <h6>Jueves:</h6>
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="09.00" id="thursday09">
                                <label class="form-check-label" for="thursday09">09.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="10.00" id="thursday10">
                                <label class="form-check-label" for="thursday10">10.00</label>
                            </div>                           
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="11.00" id="thursday11">
                                <label class="form-check-label" for="thursday11">11.00</label>
                            </div>   
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="12.00" id="thursday12">
                                <label class="form-check-label" for="thursday12">12.00</label>
                            </div>       
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="13.00" id="thursday13">
                                <label class="form-check-label" for="thursday13">13.00</label>
                            </div>                
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="14.00" id="thursday14">
                                <label class="form-check-label" for="thursday14">14.00</label>
                            </div>                          
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="15.00" id="thursday15">
                                <label class="form-check-label" for="thursday15">15.00</label>
                            </div>            
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="16.00" id="thursday16">
                                <label class="form-check-label" for="thursday16">16.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="17.00" id="thursday17">
                                <label class="form-check-label" for="thursday17">17.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="18.00" id="thursday18">
                                <label class="form-check-label" for="thursday18">18.00</label>
                            </div>                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="19.00" id="thursday19">
                                <label class="form-check-label" for="thursday19">19.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-thursday" type="checkbox" value="20.00" id="thursday20">
                                <label class="form-check-label" for="thursday20">20.00</label>
                            </div>
                        </div>
                        <div>
                            <h6>Viernes:</h6>
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="09.00" id="friday09">
                                <label class="form-check-label" for="friday09">09.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="10.00" id="friday10">
                                <label class="form-check-label" for="friday10">10.00</label>
                            </div>                           
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="11.00" id="friday11">
                                <label class="form-check-label" for="friday11">11.00</label>
                            </div>   
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="12.00" id="friday12">
                                <label class="form-check-label" for="friday12">12.00</label>
                            </div>       
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="13.00" id="friday13">
                                <label class="form-check-label" for="friday13">13.00</label>
                            </div>                
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="14.00" id="friday14">
                                <label class="form-check-label" for="friday14">14.00</label>
                            </div>                          
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="15.00" id="friday15">
                                <label class="form-check-label" for="friday15">15.00</label>
                            </div>            
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="16.00" id="friday16">
                                <label class="form-check-label" for="friday16">16.00</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="17.00" id="friday17">
                                <label class="form-check-label" for="friday17">17.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="18.00" id="friday18">
                                <label class="form-check-label" for="friday18">18.00</label>
                            </div>                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="19.00" id="friday19">
                                <label class="form-check-label" for="friday19">19.00</label>
                            </div>                            
                            <div class="form-check">
                                <input class="form-check-input hours-friday" type="checkbox" value="20.00" id="friday20">
                                <label class="form-check-label" for="friday20">20.00</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6 align-items-center justify-content-center mx-md-5">
                    <div class="form-check col-12 mx-md-5">
                        <input class="form-check-input" type="checkbox" value="" id="adminTermsAndConditions" required>
                        <label class="form-check-label" for="adminTermsAndConditions"><b>Estoy de acuerdo con los términos y condiciones.</b></label>
                        <div class="invalid-feedback">
                            Debes estar de acuerdo con los términos y condiciones antes de registrarte.
                        </div>
                    </div>
                        <div class="col-12 m-md-3">
                        <button class="btn btn-secondary w-100 w-md-57" id="form-register-button" type="submit"><b>Registrarse</b></button>
                    </div>
                </div>
            </div>
            `

        registerForm.onsubmit = (e) => {
            let adminFirstNameDOM = document.getElementById('admin-first-name')
            let adminLastNameDOM = document.getElementById('admin-last-name')
            let adminDniDOM = document.getElementById('admin-dni')
            let userbirthdateDOM = document.getElementById('admin-birthdate')
            let adminPhoneDOM = document.getElementById('admin-phone')
            let adminGenderDOM = document.getElementById('admin-gender')
            let adminAddressDOM = document.getElementById('admin-address')
            let adminPrDOM = document.getElementById('admin-pr')
            let adminSpecialtyDOM = document.getElementById('admin-specialty')
            let adminEmailDOM = document.getElementById('admin-email')
            let adminPasswordDOM = document.getElementById('admin-password')
            let adminRepeatPasswordDOM = document.getElementById('admin-repeat-password')
            let adminTermsAndConditionsDOM = document.getElementById("adminTermsAndConditions")
            let hoursMonday = []
            let hoursTuesday = []
            let hoursWednesday = []
            let hoursThursday = []
            let hoursFriday = []

            const successfulRegistrationToastDOM = document.getElementById('successful-registration-toast')
            const successfulRegistrationBodyToastDOM = document.getElementById('successful-registration-body-toast')
            const errorRegistrationToastDOM = document.getElementById('error-registration-toast')
            const errorRegistrationBodyToastDOM = document.getElementById('error-registration-body-toast')

            const checkboxMondayListDOM = document.querySelectorAll(".hours-monday")
            checkboxMondayListDOM.forEach((checkbox) => {
                if (checkbox.checked) {
                    hoursMonday.push(checkbox.value)
                }
            })
            const checkboxTuesdayListDOM = document.querySelectorAll(".hours-tuesday")
            checkboxTuesdayListDOM.forEach((checkbox) => {
                if (checkbox.checked) {
                    hoursTuesday.push(checkbox.value)
                }
            })
            const checkboxWednesdayListDOM = document.querySelectorAll(".hours-wednesday")
            checkboxWednesdayListDOM.forEach((checkbox) => {
                if (checkbox.checked) {
                    hoursWednesday.push(checkbox.value)
                }
            })
            const checkboxThursdayListDOM = document.querySelectorAll(".hours-thursday")
            checkboxThursdayListDOM.forEach((checkbox) => {
                if (checkbox.checked) {
                    hoursThursday.push(checkbox.value)
                }
            })
            const checkboxFridayListDOM = document.querySelectorAll(".hours-friday")
            checkboxFridayListDOM.forEach((checkbox) => {
                if (checkbox.checked) {
                    hoursFriday.push(checkbox.value)
                }
            })

            const storageAdminsList = localStorage.getItem('admins')

            e.preventDefault()

            if (adminFirstNameDOM.value.trim() != "" && adminLastNameDOM.value.trim() != "" && adminDniDOM.value.trim() != "" && userbirthdateDOM.value.trim() != "" && adminGenderDOM.value.trim() != "" && adminPhoneDOM.value.trim() != "" && adminAddressDOM.value.trim() != "" && adminPrDOM.value.trim() != "" && adminSpecialtyDOM.value.trim() != "" && adminEmailDOM.value.trim() != "" && adminPasswordDOM.value.trim() != "" && adminRepeatPasswordDOM.value.trim() != "" && adminTermsAndConditionsDOM.checked) {
                if (storageAdminsList) {
                    adminsList = JSON.parse(storageAdminsList)
                }
                const userDniFind = adminsList.find(admin => admin.dni === adminDniDOM.value.trim())
                if (userDniFind) {
                    adminDniDOM.setCustomValidity(":invalid")
                    const toast = new bootstrap.Toast(errorRegistrationToastDOM)
                    errorRegistrationBodyToastDOM.innerHTML = 'El DNI ingresado ya se encuentra registrado.'
                    toast.show()
                } else {
                    const userEmailFind = adminsList.find(admin => admin.email === adminEmailDOM.value.trim())
                    if (userEmailFind) {
                        adminEmailDOM.setCustomValidity(":invalid")
                        const toast = new bootstrap.Toast(errorRegistrationToastDOM)
                        errorRegistrationBodyToastDOM.innerHTML = 'El email ingresado ya se encuentra registrado.'
                        toast.show()
                    } else {
                        if (adminPasswordDOM.value == adminRepeatPasswordDOM.value) {
                            const newAdmin = {
                                firstName: adminFirstNameDOM.value,
                                lastName: adminLastNameDOM.value,
                                dni: adminDniDOM.value,
                                birthdate: userbirthdateDOM.value,
                                gender: adminGenderDOM.value,
                                phone: adminPhoneDOM.value,
                                address: adminAddressDOM.value,
                                pr: adminPrDOM.value,
                                specialty: adminSpecialtyDOM.value,
                                email: adminEmailDOM.value,
                                password: adminPasswordDOM.value,
                                type: userType.value,
                                schedules: {
                                    monday: hoursMonday,
                                    tuesday: hoursTuesday,
                                    wednesday: hoursWednesday,
                                    thursday: hoursThursday,
                                    friday: hoursFriday
                                },
                                activation: null
                            }
                            adminsList.push(newAdmin)
                            localStorage.setItem('admins', JSON.stringify(adminsList))
                            const toast = new bootstrap.Toast(successfulRegistrationToastDOM)
                            successfulRegistrationBodyToastDOM.innerHTML='Se ha registrado correctamente como profesional, recibira un mail cuando su cuenta sea activada'
                            toast.show()
                            setTimeout(function() {
                            window.location = './index.html'
                            }, 3000);
                        } else {
                            adminPasswordDOM.setCustomValidity(":invalid")
                            adminRepeatPasswordDOM.setCustomValidity(":invalid")
                            const toast = new bootstrap.Toast(errorRegistrationToastDOM)
                            errorRegistrationBodyToastDOM.innerHTML = 'Las contraseñas ingresadas no son iguales.'
                            toast.show()
                        }
                    }
                }
            }else{
                const toast = new bootstrap.Toast(errorRegistrationToastDOM)
                toast.show()
            }
        }
    }else if (userType.value == "Paciente") {
            registerForm.innerHTML = `
            <div class="col-md-4">
                <label for="user-first-name" class="form-label"><b>Nombre:</b></label>
                <input type="text" maxlength="30" minlength="2" class="form-control" id="user-first-name" value="" placeholder="Ej:Juán" required>
                <div class="invalid-feedback">
                    Por favor ingrese su Nombre correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-last-name" class="form-label"><b>Apellido:</b></label>
                <input type="text" maxlength="30" minlength="2" class="form-control" id="user-last-name" value="" placeholder="Ej:Pérez" required>
                <div class="invalid-feedback">
                    Por favor ingrese su apellido correctamente.
                </div>     
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-dni" class="form-label"><b>DNI:</b></label>
                <input type="number" maxlength="8" minlength="7" class="form-control" id="user-dni" value="" placeholder="Ej: 35263544" required>
                <div class="invalid-feedback">
                    Por favor ingrese su número de DNI correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-nationality" class="form-label"><b>Nacionalidad:</b></label>
                <input type="text" maxlength="15" minlength="5" class="form-control" id="user-nationality" value="" placeholder="Ej: Argentino" required>
                <div class="invalid-feedback">
                    Por favor ingrese su nacionalidad correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-birthdate" class="form-label"><b>Fecha de nacimiento:</b></label>
                <input type="date" class="form-control" id="user-birthdate" value="" required>
                <div class="invalid-feedback">
                    Por favor ingrese su fecha de nacimiento correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-gender" class="form-label"><b>Sexo:</b></label>
                <select class="form-select" id="user-gender" required>
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>
                <div class="invalid-feedback">
                    Por favor seleccione una opción.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-phone" class="form-label"><b>Teléfono:</b></label>
                <input type="tel" maxlength="15" minlength="2" class="form-control" id="user-phone" value="" placeholder="Ej: 3815792562" required>
                <div class="invalid-feedback">
                    Por favor ingrese su número de teléfono correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-address" class="form-label"><b>Domicilio:</b></label>
                <input type="text" maxlength="30" minlength="10" class="form-control" id="user-address" value="" placeholder="Ej: Laprida 550" required>
                <div class="invalid-feedback">
                    Por favor ingrese su domicilio correctamente.
                </div>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-sure" class="form-label"><b>Obra social:</b></label>
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
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-email" class="form-label"><b>Email:</b></label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="email" maxlength="30" minlength="5" class="form-control" id="user-email"aria-describedby="inputGroupPrepend" placeholder="Ej: juanperez@gmail.com" required>
                    <div class="invalid-feedback">
                        Por favor ingrese su email correctamente.
                    </div>
                    <div class="valid-feedback">
                        Excelente!
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-password" class="form-label"><b>Contraseña:</b></label>
                <input type="password" maxlength="30" minlength="5" class="form-control" id="user-password" value="" maxlength="20" minlength="6" placeholder="******" required>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="col-md-4">
                <label for="user-repeat-password" class="form-label"><b>Repetir contraseña:</b></label>
                <input type="password" maxlength="30" minlength="5" class="form-control" id="user-repeat-password" value="" maxlength="20" minlength="6" placeholder="******" required>
                <div class="valid-feedback">
                    Excelente!
                </div>
            </div>
            <div class="mt-4">
                <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="userTermsAndConditions" required>
                        <label class="form-check-label" for="userTermsAndConditions">
                        <b>Estoy de acuerdo con los términos y condiciones.</b>
                        </label>
                        <div class="invalid-feedback">
                            Debes estar de acuerdo con los términos y condiciones antes de registrarte.
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-secondary w-75" type="submit"><b>Registrarse</b></button>
                </div>
            </div>

            `

            registerForm.onsubmit = (e) => {
                let userFirstNameDOM = document.getElementById('user-first-name')
                let userLastNameDOM = document.getElementById('user-last-name')
                let userDniDOM = document.getElementById('user-dni')
                let userNationalityDOM = document.getElementById('user-nationality')
                let userBirthdateDOM = document.getElementById('user-birthdate')
                let userPhoneDOM = document.getElementById('user-phone')
                let userAddressDOM = document.getElementById('user-address')
                let userGenderDOM = document.getElementById('user-gender')
                let userSureDOM = document.getElementById('user-sure')
                let userEmailDOM = document.getElementById('user-email')
                let userPasswordDOM = document.getElementById('user-password')
                let userRepeatPasswordDOM = document.getElementById('user-repeat-password')
                let userTermsAndConditionsDOM = document.getElementById('userTermsAndConditions')

                const successfulRegistrationToastDOM = document.getElementById('successful-registration-toast')
                const successfulRegistrationBodyToastDOM = document.getElementById('successful-registration-body-toast')
                const errorRegistrationToastDOM = document.getElementById('error-registration-toast')
                const errorRegistrationBodyToastDOM = document.getElementById('error-registration-body-toast')



                e.preventDefault()
                const storageUsersList = localStorage.getItem('users')


                if (userFirstNameDOM.value.trim() != "" && userLastNameDOM.value.trim() != "" && userDniDOM.value.trim() != "" && userNationalityDOM.value.trim() != "" && userPhoneDOM.value.trim() != "" && userAddressDOM.value.trim() != "" && userGenderDOM.value.trim() != "" && userBirthdateDOM.value.trim() != "" && userSureDOM.value.trim() != "" && userEmailDOM.value.trim() != "" && userPasswordDOM.value.trim() != "" && userRepeatPasswordDOM.value.trim() != "" && userTermsAndConditionsDOM.checked) {
                    if (storageUsersList) {
                        usersList = JSON.parse(storageUsersList)
                    }
                    const userDniFind = usersList.find(user => user.dni === userDniDOM.value.trim())
                    if (userDniFind) {
                        userDniDOM.setCustomValidity(":invalid")
                        const toast = new bootstrap.Toast(errorRegistrationToastDOM)
                        errorRegistrationBodyToastDOM.innerHTML = 'El DNI ingresado ya se encuentra registrado.'
                        toast.show()
                    } else {
                        const userEmailFind = usersList.find(user => user.email === userEmailDOM.value.trim())
                        if (userEmailFind) {
                            userEmailDOM.setCustomValidity(":invalid")
                            const toast = new bootstrap.Toast(errorRegistrationToastDOM)
                            errorRegistrationBodyToastDOM.innerHTML = 'El email ingresado ya se encuentra registrado.'
                            toast.show()
                        } else {
                            if (userPasswordDOM.value == userRepeatPasswordDOM.value) {
                                const newUser = {
                                        firstName: userFirstNameDOM.value,
                                        lastName: userLastNameDOM.value,
                                        birthdate: userBirthdateDOM.value,
                                        dni: userDniDOM.value,
                                        gender: userGenderDOM.value,
                                        nationality: userNationalityDOM.value,
                                        phone: userPhoneDOM.value,
                                        address: userAddressDOM.value,
                                        sure: userSureDOM.value,
                                        email: userEmailDOM.value,
                                        password: userPasswordDOM.value,
                                        type: userType.value
                                    }
                                usersList.push(newUser)
                                localStorage.setItem('users', JSON.stringify(usersList))
                                const toast = new bootstrap.Toast(successfulRegistrationToastDOM)
                                successfulRegistrationBodyToastDOM.innerHTML='Se ha registrado correctamente como paciente, ya puede ingresar a su cuenta.'
                                toast.show()
                                setTimeout(function() {
                                    window.location = './login.html'
                                    }, 3000)
                            }else {
                                adminPasswordDOM.setCustomValidity(":invalid")
                                adminRepeatPasswordDOM.setCustomValidity(":invalid")
                                const toast = new bootstrap.Toast(errorRegistrationToastDOM)
                                errorRegistrationBodyToastDOM.innerHTML = 'Las contraseñas ingresadas no son iguales.'
                                toast.show()
                            }
                        }
                    }
                }else{
                    const toast = new bootstrap.Toast(errorRegistrationToastDOM)
                    toast.show()
                }    
            }
        }
    }
