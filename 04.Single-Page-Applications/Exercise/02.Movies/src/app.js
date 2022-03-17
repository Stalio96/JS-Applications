import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { showEdit } from "./edit.js";

const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister
}
const nav = document.getElementsByTagName('nav')[0];

document.getElementById('logoutBtn').addEventListener('click', onLogout);

nav.addEventListener('click', (event) => {
    const view = views[event.target.id];
    if (typeof view == 'function') {
        event.preventDefault();
        view();
    }
});


updateNav();
showHome();

export function updateNav(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData != null){
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.user')].forEach(element => element.style.display = 'inline-block');
        [...nav.querySelectorAll('.guest')].forEach(element => element.style.display = 'none');
    }else {
        [...nav.querySelectorAll('.user')].forEach(element => element.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(element => element.style.display = 'inline-block');
    }
}

async function onLogout(event){
    event.preventDefault();
    event.stopImmediatePropagation();

    const { token } = JSON.parse(localStorage.getItem('userData'));

    const res = await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': token
        }
    });

    localStorage.removeItem('userData');
    updateNav();
    showLogin();
}