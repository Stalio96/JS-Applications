import { showCatalog } from './catalog.js';
import { showCrate } from './create.js';
import { showUpdate } from './update.js';
import { render } from './utility.js';

const root = document.body;

const ctx = {
    update
}

update();

function update(){
    render([
        showCatalog(ctx),
        showCrate(ctx), 
        showUpdate(ctx)
    ], root)
}


