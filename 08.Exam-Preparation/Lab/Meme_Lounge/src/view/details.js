import { deleteMeme, getMeme } from '../api/data.js';
import { html } from '../lib.js';
import { getStorage } from '../util.js';

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` : null}
        </div>
    </div>
</section>`;

export async function detailsPage(ctx){
    const memeDetails = await getMeme(ctx.params.id);
    const userData = getStorage();

    const isOwner = userData && memeDetails._ownerId == userData.id;

    ctx.render(detailsTemplate(memeDetails, isOwner, onDelete));

    async function onDelete(){
        await deleteMeme(ctx.params.id);
        ctx.page.redirect('/memes');
    }
}