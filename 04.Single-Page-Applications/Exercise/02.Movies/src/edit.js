import { showView } from "./dom.js";
import { showHome } from "./home.js";

const section = document.getElementById('edit-movie');
section.remove();

export function showEdit(){
    showView(section);
}

const form = section.querySelector('form');

form.addEventListener('submit', onEdit);

async function onEdit(event){
    event.preventDefault();

    const formData = new FormData(form);

    const movieTitle = formData.get('title');
    const description = formData.get('description');
    const imgUrl = formData.get('imageUrl');

    const userData = JSON.parse(localStorage.getItem('userData'))
    const movieData = JSON.parse(localStorage.getItem('movieData'))

    const res = await fetch(`http://localhost:3030/data/movies/${movieData.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify({
            title: movieTitle,
            description: description,
            imageUrl: imgUrl
        })
    })

    showHome();
}