import {page, render} from './lib.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { getStorage } from './util.js';
import { registerPage } from './views/register.js';
import { logout } from './api/data.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myBooksPage } from './views/my-books.js';


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorate);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-books', myBooksPage);

page.start();
updateUserNav();


function decorate(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateUserNav;

    next();
}

export async function updateUserNav(){
    const userData = await getStorage();

    if(userData){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

async function onLogout(){
    await logout();
    updateUserNav();
    page.redirect('/');
}