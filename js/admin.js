profile = document.getElementById("profile")
ulNavbar = document.getElementById("ulNavbar")
turnButton = document.getElementById("turn-button")
const admin = localStorage.getItem('userLogIn')
if (admin) {
    let userName = JSON.parse(admin)
    const liDOM = document.createElement('li')
    liDOM.className += "nav-item dropdown"
    ulNavbar.appendChild(liDOM)
    liDOM.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <img src="./icons/user.svg" height="25px" weight="25px" alt="user-icon">
    <span>${userName.firstname} ${userName.lastname}</span>
    </a>
    <ul class="dropdown-menu">
    <li>
        <a class="dropdown-item" href="./error.html">Mi cuenta</a>
    </li>
    <li>
    <a class="dropdown-item" href="./error.html">Turnos</a>
    </li>
<li>
<a class="dropdown-item" href="./error.html">Historias clinicas</a>
</li>
    <li>
        <hr class="dropdown-divider">
    </li>
    <li>
        <a class="dropdown-item" id="cerrar-sesion" href="./index.html">Cerrar Sesion</a>
    </li>
</ul>`
    ulNavbar.removeChild(turnButton)
    ulNavbar.removeChild(profile)
}

cerrarSesion = document.getElementById("cerrar-sesion")

cerrarSesion.onclick = (e)=>{
    localStorage.removeItem("userLogIn");
}