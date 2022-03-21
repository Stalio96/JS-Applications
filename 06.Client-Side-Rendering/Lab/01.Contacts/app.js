import { html, render } from './node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';

const contactTamplate = (data) => html`
<div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${data.name}</h2>
                <button class="detailsBtn">Details</button>
                <div class="details" id=${data.id}>
                    <p>Phone number: ${data.phoneNumber}</p>
                    <p>Email: ${data.email}</p>
                </div>
            </div>
        </div>
`;

start();

function start(){
    const container = document.getElementById('contacts');
    container.addEventListener('click', onRender);

    function onRender(event){
        if(event.target.tagName == 'BUTTON'){
            const div = event.target.parentElement.querySelector('div');

            if(div.style.display == 'block'){
                div.style.display = '';
            }else{
                div.style.display = 'block';
            }
        }
    }
    
    render(contacts.map(contactTamplate), container);
}