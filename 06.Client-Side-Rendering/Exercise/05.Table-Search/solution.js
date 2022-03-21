import { html, render } from './node_modules/lit-html/lit-html.js';


const tableTamplate = (student) => html`
<tr class=${student.match ? 'select': ''}>
   <td>${student.item.firstName} ${student.item.lastName}</td>
   <td>${student.item.email}</td>
   <td>${student.item.course}</td>
</tr>`;

let students;
const input = document.getElementById('searchField'); 
document.querySelector('#searchBtn').addEventListener('click', onClick);
start();

async function start(){
   const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await res.json();
   students = Object.values(data).map(s => ({item: s, match: false}));
   //students.forEach(s => s.match = false);   
   update();
}


function update() {

   const body = document.querySelector('tbody')

   render(students.map(tableTamplate), body);
}


function onClick(){
   const value = input.value.trim().toLocaleLowerCase();

   for (let student of students){
      student.match = Object.values(student.item).some(s => s.toLocaleLowerCase().includes(value));
   }

   update();
}