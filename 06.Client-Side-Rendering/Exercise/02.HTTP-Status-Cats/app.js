import { cats } from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const catsTamplate = (cat) => html`
<ul>
    ${cat.map(c => html`<li>
        <img src="./images/${c.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">${c.catInfo ? 'Hide' : 'Show'} status code</button>
            <div class="status" style="display: none" id=${c.id}>
                <h4 class="card-title">Status Code: ${c.statusCode}</h4>
                <p class="card-text">${c.statusMessage}</p>
            </div>
        </div>
    </li>`)}
</ul>`;

const root = document.getElementById('allCats');
root.addEventListener('click', onToggle);

upDate();

function upDate() {
    render(catsTamplate(cats), root);
}

function onToggle(event) {
    if (event.target.tagName == 'BUTTON') {
        const details = event.target.parentElement.querySelector('.status');

        if (details.style.display == 'none') {
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    }
}