import { searchAlbum } from '../api/data.js';
import { html } from '../lib.js';
import { getStorage } from '../util.js';

const serchTemplate = (songs, onSearch, params = '', userData) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <form @submit=${onSearch}>
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${params}>
            <button class="button-list">Search</button>
        </div>
    </form>

    <h2>Results:</h2>

    <!--Show after click Search button-->

    <div class="search-result">
        <!--If have matches-->
        ${songs.length == 0 
        ? html`<p class="no-result">No result.</p>`
        : userData ? songs.map(resultCardUser) : songs.map(resultCardGuest)}
    </div>
</section>`;

const resultCardUser = (result) => html`
<div class="card-box">
    <img src=${result.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${result.name}</p>
            <p class="artist">Artist: ${result.artist}</p>
            <p class="genre">Genre: ${result.genre}</p>
            <p class="price">Price: $${result.price}</p>
            <p class="date">Release Date: ${result.releaseDate}</p>
        </div>
        <div class="btn-group">
            <a href="/details/${result._id}" id="details">Details</a>
        </div>
    </div>
</div>`;

const resultCardGuest = (result) => html`
<div class="card-box">
    <img src=${result.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${result.name}</p>
            <p class="artist">Artist: ${result.artist}</p>
            <p class="genre">Genre: ${result.genre}</p>
            <p class="price">Price: $${result.price}</p>
            <p class="date">Release Date: ${result.releaseDate}</p>
        </div>
    </div>
</div>`;


export async function searchPage(ctx) {
    const userData = await getStorage();
    const params = ctx.querystring.split('=')[1];
    let songs = [];

    if(params){
        songs = await searchAlbum(params);
    }

    ctx.render(serchTemplate(songs, onSearch, params, userData));

    async function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search');

        if(search){
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
            ctx.render(serchTemplate([], onSearch, params));
        }
    }
}