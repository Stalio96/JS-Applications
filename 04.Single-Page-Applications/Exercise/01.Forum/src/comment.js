import { e } from "./dom.js";


const main = document.querySelector('main');

const form = main.querySelector('.container').querySelector('form');
form.addEventListener('submit', onComment);

export async function onComment(event) {
    event.preventDefault();
    
    const comm = main.querySelector('.topic-container').querySelector('.comment');
    
    const formData = new FormData(form);

    const text = formData.get('postText');
    const userName = formData.get('username');

    try {
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                //'X-Authorization': token
            },
            body: JSON.stringify({ text, userName })
        })

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        const userComment = e('div', { className: 'user-comment' },
            e('div', { className: 'topic-name-wrapper' },
                e('div', { className: 'topic-name' },
                    e('p', {},
                        e('strong', {}, `${data.userName}`),
                        ' commented on ',
                        e('time', {}, `${new Date().toDateString()}`)
                    ),
                    e('div', { className: 'post-content' },
                        e('p', {}, `${data.text}`)
                    )
                )
            )
        )

        if(text != '' && userName != ''){
            comm.appendChild(userComment);
        }
        
        form.reset();

    } catch (err) {
        alert(err.message)
    }
}

