import { logout } from './api/data.js';
import { page, render } from './lib.js';
import { getStorage } from './util.js';
import { homePage } from './view/home.js';
import { loginPage } from './view/login.js';
import { registerPage } from './view/register.js';

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorate);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);

page.start();
updateNav();

export function decorate(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.update = updateNav;

    next();
}

async function updateNav() {
    const userData = await getStorage();
    if (userData) {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#profile a').textContent = `Welcome ${userData.username}`;
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

async function onLogout(){
    await logout();
    updateNav();
    page.redirect('/');
}