function attachedEvents() {
    const loadBookBtn = document.getElementById('loadBooks');
    loadBookBtn.addEventListener('click', loadBooks);

    const submitBtn = document.querySelector('[id="submit"] button');
    submitBtn.addEventListener('click', createBook);
}

const submitForm = document.getElementById('submit');
const editForm = document.getElementById('edit');

const tableBody = document.querySelector('tbody');

const titleInput = document.querySelector('#submit [name="title"]');
const authorInput = document.querySelector('#submit [name="author"]');
const titleInputSave = document.querySelector('#edit [name="title"]');
const authorInputSave = document.querySelector('#edit [name="author"]');

async function saveBook(e, id) {
    e.preventDefault();
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;

    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: authorInputSave.value,
            title: titleInputSave.value
        })
    }

    const res = await fetch(url, options);
    const data = await res.json();

    console.log(data)
}

async function createBook(e) {
    e.preventDefault();
    if (titleInput.value != '' && authorInput != '') {
        const url = 'http://localhost:3030/jsonstore/collections/books';

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: authorInput.value,
                title: titleInput.value
            })
        }

        const res = await fetch(url, options);

        authorInput.value = '';
        titleInput.value = '';

        submitForm.style.display = 'block';
        editForm.style.display = 'none';
    }
}

async function loadBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    tableBody.innerHTML = `<tr>
    <td>Harry Poter</td>
    <td>J. K. Rowling</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>
</tr>
<tr>
    <td>Game of Thrones</td>
    <td>George R. R. Martin</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>
</tr>`;

    const res = await fetch(url);
    const data = await res.json();

    const result = Object.entries(data);
    console.log(result)

    result.forEach(b => {
        const tableRow = document.createElement('tr');

        tableRow.innerHTML = `
        <td>${b[1].title}</td>
        <td>${b[1].author}</td>
        <td>
            <button id=${b[0]}>Edit</button>
            <button id=${b[0]}>Delete</button>
        </td>`;

        const editBtn = tableRow.querySelectorAll('button')[0];
        editBtn.addEventListener('click', async (e) => {
            submitForm.style.display = 'none';
            editForm.style.display = 'block';

            const editTitle = e.target.parentElement.parentElement.children[0];
            const editAuthor = e.target.parentElement.parentElement.children[1];

            titleInputSave.value = editTitle.textContent;
            authorInputSave.value = editAuthor.textContent;

            const saveBtn = document.querySelector('[id="edit"] button');
            saveBtn.addEventListener('click', () => saveBook(e, b[0]));
        });

        const deleteBtn = tableRow.querySelectorAll('button')[1];
        deleteBtn.addEventListener('click', async (e) => {
            const url = `http://localhost:3030/jsonstore/collections/books/${b[0]}`;
            const options = {
                method: 'delete'
            }

            const res = await fetch(url, options);
            tableRow.remove();
        });
        tableBody.appendChild(tableRow);
    })
}

attachedEvents();