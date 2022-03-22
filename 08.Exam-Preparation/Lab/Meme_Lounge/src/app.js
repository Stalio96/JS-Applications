import { render, page } from './lib.js';
import { homePage } from './view/home.js';
import { catalogPage } from './view/catalog.js';
import { loginPage } from './view/login.js';
import { registerPage } from './view/register.js';
import { logout } from './api/data.js';
import { getStorage } from './util.js';
import { createPage } from './view/create.js';
import { detailsPage } from './view/details.js';
import { editPage } from './view/edit.js';
import { profilePage } from './view/profile.js';



const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/memes', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', profilePage);

updateNav();
page.start();


function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.update = updateNav;

    next();
}

async function onLogout(){
    await logout();
    updateNav();
}

export function updateNav(){
    const userData = getStorage();

    if(userData){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.profile span').textContent = `Welcome, ${userData.email}`;
    }else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}