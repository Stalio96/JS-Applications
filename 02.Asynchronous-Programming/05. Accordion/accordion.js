async function solution() {

    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    const res = await fetch(url);
    const data = await res.json();

    articleHandler(data)
}

async function articleHandler(titles) {

    const mainSection = document.getElementById('main');

    for (let id of titles) {
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id._id}`;

        const res = await fetch(url);
        const data = await res.json();

        const divAccordion = document.createElement('div');
        divAccordion.className = 'accordion';

        divAccordion.innerHTML = `<div class="head">
        <span>${data.title}</span>
        <button class="button" id="${data._id}">More</button>
    </div>
    <div class="extra">
        <p>${data.content}</p>
    </div>`;

        mainSection.appendChild(divAccordion);

        const moreBtn = document.getElementById(data._id);

        moreBtn.addEventListener('click', (e) => {
            const content = e.target.parentElement.parentElement.querySelector('.extra')

            moreBtn.textContent = moreBtn.textContent == 'More' ? 'Less' : 'More';

            content.style.display = content.style.display == 'block' ? 'none' : 'block';
        });
    }
}

solution()