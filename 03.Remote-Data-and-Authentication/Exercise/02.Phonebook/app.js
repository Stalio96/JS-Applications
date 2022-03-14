function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', loadPhones);

    const createBtn = document.getElementById('btnCreate');
    createBtn.addEventListener('click', createPhones);
}

attachEvents();

const ulPhonebook = document.getElementById('phonebook');

async function loadPhones(){
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const res = await fetch(url);
    const data = await res.json();

    const result = Object.values(data);

    ulPhonebook.innerHTML = '';

    result.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `${p.person}: ${p.phone} <button value=${p._id}>Delete</button>`;

        const deleteBtn = li.querySelector('button');

        deleteBtn.addEventListener('click', async () => {
            const url = `http://localhost:3030/jsonstore/phonebook/${deleteBtn.value}`;

            const options = {
                method: 'delete'
            }

            const res = await fetch(url, options);

            li.remove();
        });
        ulPhonebook.appendChild(li)
    });
}

async function createPhones(){
    const name = document.getElementById('person').value.trim();
    const number = document.getElementById('phone').value.trim();

    const url = 'http://localhost:3030/jsonstore/phonebook';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            person: name,
            phone: number
        })
    }

    const res = await fetch(url, options);
    const result = await res.json();

    loadPhones()

    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';
}