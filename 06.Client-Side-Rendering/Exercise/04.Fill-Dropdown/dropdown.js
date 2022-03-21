import { html, render } from './node_modules/lit-html/lit-html.js';

const menu = document.getElementById('menu');
menu.remove();

const optionTamplate = (item) => html`
<select id='menu'>
    ${item.map(i => html`<option value: ${i._id}>${i.text}</option>`)}
</select>`;

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

document.querySelector('form').addEventListener('click', postData);

const root = document.querySelector('div');
getData();

async function getData() {
    const res = await fetch(url);
    const data = await res.json();

    update(Object.values(data));
}

function update(item) {
    render(optionTamplate(item), root);
}

async function postData(event) {
    event.preventDefault();

    const text = document.getElementById('itemText').value;

    if(text != ''){
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
    }

    document.getElementById('itemText').value = '';
    getData();
}
