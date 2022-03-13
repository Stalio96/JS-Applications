async function getProducts() {

    const url = `http://localhost:3030/jsonstore/cookbook/recipes`;

    const res = await fetch(url);
    const data = await res.json();
    const products = Object.values(data);

    setProducts(products);
}

function setProducts(recipe){
    const main = document.querySelector('main');
    main.replaceChildren();

    recipe.forEach(r => {
        const previewArticle = document.createElement('article');
        previewArticle.className = 'preview';
    
        const divTitle = document.createElement('div');
        divTitle.className = 'title';
    
        const h2 = document.createElement('h2');
        h2.textContent = r.name;

        const divSmall = document.createElement('div');
        divSmall.className = 'small';

        const img = document.createElement('img');
        img.src = r.img;

        divTitle.appendChild(h2);
        divSmall.appendChild(img);

        previewArticle.appendChild(divTitle);
        previewArticle.appendChild(divSmall);

        main.appendChild(previewArticle);

        previewArticle.addEventListener('click', () => loadSelected(r._id, previewArticle))
    });
}

async function loadSelected(id, prev){
    const main = document.querySelector('main');

    const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    const article = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.textContent = data.name;

    article.appendChild(h2);

    const divBand = document.createElement('div');
    divBand.className = 'band';

    const divThumb = document.createElement('div');
    divThumb.className = 'thumb';

    const img = document.createElement('img');
    img.src = data.img;

    divThumb.appendChild(img);
    divBand.appendChild(divThumb);

    const divIngridients = document.createElement('div');
    divIngridients.className = 'ingredients';

    const h3 = document.createElement('h3');
    h3.textContent = 'Ingredients:';

    divIngridients.appendChild(h3);

    const ul = document.createElement('ul');

    for(let ingridient of data.ingredients){
        const li = document.createElement('li');
        li.textContent = ingridient;

        ul.appendChild(li);
    }

    divIngridients.appendChild(ul);

    divBand.appendChild(divIngridients);

    article.appendChild(divBand);

    const divDescription = document.createElement('div');
    divDescription.className = 'description';

    const h3Prep = document.createElement('h3');
    h3Prep.textContent = 'Preparation:';

    divDescription.appendChild(h3Prep);

    for(let step of data.steps){
        const paragraph = document.createElement('p');
        paragraph.textContent = step;

        divDescription.appendChild(paragraph);
    }

    article.appendChild(divDescription);

    prev.replaceWith(article);


}

getProducts();