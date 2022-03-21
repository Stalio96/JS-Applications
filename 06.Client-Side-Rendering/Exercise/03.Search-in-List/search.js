import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns as townNames } from './towns.js';

const divTowns = document.getElementById('towns');

const townsAsTamplate = (town) => html`
<ul>
   ${towns.map(t => html`<li class=${t.match ? 'active' : ''}>${t.name}</li>`)}
</ul > `;


const towns = townNames.map(t => ({name: t, match: false}));

upDate()

function upDate(){
   render(townsAsTamplate(towns), divTowns);
}

const input = document.getElementById('searchText');

const result = document.getElementById('result');

const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', search);

function search() {
   const match = input.value.toLocaleLowerCase();
   let matches = 0;

   for(let town of towns){
      if(match && town.name.toLocaleLowerCase().includes(match)){
         matches++;
         town.match = true;
      }else {
         town.match = false;
      }
   }

   result.textContent = `${matches} matches found`;

   input.value = '';
   
   upDate();
}
