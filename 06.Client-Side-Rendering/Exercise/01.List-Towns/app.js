import {html, render} from './node_modules/lit-html/lit-html.js';

const townsTamplate = (towns) => html`
<ul>
    ${towns.map(t => html`<li>${t}</li>`)}
</ul>`;

document.querySelector('form').addEventListener('click', onClick);

const root = document.getElementById('root');

const input = document.getElementById('towns');

function onClick(event){
    event.preventDefault();

    const data = input.value.split(',');

    if(data != ''){
        render(townsTamplate(data), root);
    }
}