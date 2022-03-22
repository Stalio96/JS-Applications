import { createNewComment, deleteGame, getGameById, loadAllComments } from '../api/data.js';
import { html } from '../lib.js';
import { getStorage } from '../util.js';

const detailsTemplate = (game, isOwner, onDelete, allComments, addCommentView, addComment) => html`<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
            ${game.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${allComments.length == 0 ? html`<p class="no-comment">No comments.</p>` : html`<ul>
                <!-- list all comments for current game (If any) -->
                ${allComments.map(detailComments)}
            </ul>`}

            <!-- Display paragraph: If there are no games in the database -->

        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : null}
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${addCommentView ? null : html`<article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${addComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`}


</section>`;

const detailComments = (comment) => html`
<li class="comment">
    <p>Content: ${comment}</p>
</li>`;

export async function detailsPage(ctx) {

    const [game, allComments, userData] = await Promise.all([
        getGameById(ctx.params.id),
        loadAllComments(ctx.params.id),
        getStorage()
    ]);

    const isOwner = userData && userData.id == game._ownerId;
    const addCommentView = isOwner || !userData;
    ctx.render(detailsTemplate(game, isOwner, onDelete, allComments, addCommentView, addComment));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${game.title}`);
        if (choice) {
            await deleteGame(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function addComment(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const comment = formData.get('comment');

        const obj = {
            gameId: ctx.params.id,
            comment
        }

        await createNewComment(obj);
        event.target.reset();
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}