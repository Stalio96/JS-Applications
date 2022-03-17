import { showView } from "./dom.js";
import { showHome } from "./home.js";

const section = document.getElementById('add-movie');
section.remove();

export function showCreate(){
    showView(section);
}

const form = section.querySelector('form');
form.addEventListener('submit', onCreate);
const userData = JSON.parse(localStorage.getItem('userData'));

async function onCreate(event){
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const imageUrl = formData.get('imageUrl').trim();

    if(title != '' && description != '' && imageUrl != ''){
        try{
            const res = await fetch('http://localhost:3030/data/movies', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userData.token
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            });

            if(res.ok != true){
                const error = await res.json();
                throw new Error(error.message)
            }

            const data = await res.json();
            console.log(data);

            form.reset();

            localStorage.setItem('movieData', JSON.stringify({
                id: data._id,
                owner: data._ownerId,
                title: data.title,
            }));
            localStorage.setItem('userData', JSON.stringify({
                userId: userData.id,
                token: userData.token
            }))
            showHome();
        }catch(err){
            alert(err.message)
        }
    }else {
        alert('All fields are required!')
    }
}