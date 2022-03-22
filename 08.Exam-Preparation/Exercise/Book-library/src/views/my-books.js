import { getMyBooks } from '../api/data.js';
import { html } from '../lib.js';
import { getStorage } from '../util.js';

const myBooksTemplate = (book) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${book.length == 0 ? html`<p class="no-books">No books in database!</p>` : html`<ul class="my-books-list">
        ${book.map(bookCard)}
    </ul>`}


    <!-- Display paragraph: If the user doesn't have his own books  -->

</section>`;

const bookCard = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function myBooksPage(ctx) {
    const userData = getStorage();
    const books = await getMyBooks(userData.id);
    ctx.render(myBooksTemplate(books));
}