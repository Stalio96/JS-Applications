import { e } from "./dom.js";
import { onComment } from "./comment.js"

const main = document.querySelector('main');

const form = main.querySelector('form');

const newTopic = main.querySelector('.new-topic-border');
const comments = main.querySelector('.container');


newTopic.style.display = 'block';
comments.style.display = 'none';

const homeBtn = document.querySelector('nav').querySelector('a');
homeBtn.addEventListener('click', () => {
    newTopic.style.display = 'block';
    comments.style.display = 'none';
});

const topicContainer = document.querySelector('.topic-container');

//const userData = JSON.parse('userData')

form.addEventListener('submit', onPost);

export async function onPost(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('topicName').trim();
    const userName = formData.get('username').trim();
    const post = formData.get('postText').trim();

    try {
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, userName, post })
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        console.log(data);

        const topic = e('div', { className: 'comment' },
            e('div', { className: 'header' },
                e('img', { src: './static/profile.png', alt: 'avatar' },),
                e('p', {},
                    e('span', {}, `${data.userName}`),
                    ' posted on ',
                    e('time', {}, `${new Date().toDateString()}`)
                ),

                e('p', { className: 'post-content' }, `${data.post}`)
            )
        )

        topicContainer.appendChild(topic);

        newTopic.style.display = 'none';
        comments.style.display = 'block';

        const userData = sessionStorage.setItem('userData', JSON.stringify({ title, userName, post }));

        form.reset();
        onComment();

        //window.location = 'theme-content.html';
    } catch (err) {
        alert(err.message)
    }
}