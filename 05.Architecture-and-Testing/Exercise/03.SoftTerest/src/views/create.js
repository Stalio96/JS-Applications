import { createIdea } from '../api/data.js';
import { e } from '../dom.js';


const section = document.getElementById('createPage');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export async function showCreatePage(ctxTarget){
    ctx = ctxTarget;
    ctx.showView(section);
}

async function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageURL').trim();

    if(title.length < 6){
        return alert('Title must be atleast 6 characters long.');
    }
    if(description.length < 10){
        return alert('Title must be atleast 10 characters long.');
    }
    if(img.length < 5){
        return alert('Title must be atleast 5 characters long.');
    }
    await createIdea({title, description, img});
    form.reset();
    ctx.goTo('catalog');
}