import { register } from '../api/data.js';
import { e } from '../dom.js';


const section = document.getElementById('registerPage');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export async function showRegisterPage(ctxTarget){
    ctx = ctxTarget;
    ctx.showView(section);
}

async function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const passWord = formData.get('password').trim();
    const repass = formData.get('repeatPassword').trim();

    if(!email || !passWord){
        return alert('All fields are required!')
    }

    if(passWord != repass){
        return alert('Password don\'t match!');
    }

    await register(email, passWord);
    form.reset();
    ctx.goTo('home');
    ctx.upDateNav();
}