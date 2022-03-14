function attachEvents(){
    onLoad();

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', createStudent);
}

const firstName = document.querySelector('[name="firstName"]')
const lastName = document.querySelector('[name="lastName"]')
const facultyNumber = document.querySelector('[name="facultyNumber"]')
const grade = document.querySelector('[name="grade"]')

//const firstNameTable = document.querySelectorAll('th')[0];
//const lastNameTable = document.querySelectorAll('th')[1];
//const facultyNumberTable = document.querySelectorAll('th')[2];
//const gradeTable = document.querySelectorAll('th')[3];

const tableBody = document.querySelector('table tbody');

async function onLoad(){
    tableBody.innerHTML = '';

    const url = `http://localhost:3030/jsonstore/collections/students`;

    const res = await fetch(url);
    const data = await res.json();

    const result = Object.values(data);
    console.log(result);

    result.forEach(p => {
        const tableRow = document.createElement('tr');

        const tdFirst = document.createElement('th');
        tdFirst.textContent = p.firstName;
        const tdLast = document.createElement('th');
        tdLast.textContent = p.lastName;
        const tdFacNum = document.createElement('th');
        tdFacNum.textContent = p.facultyNumber;
        const tdGrade = document.createElement('th');
        tdGrade.textContent = p.grade;

        tableRow.appendChild(tdFirst);
        tableRow.appendChild(tdLast);
        tableRow.appendChild(tdFacNum);
        tableRow.appendChild(tdGrade);

        tableBody.appendChild(tableRow);
    })
}

async function createStudent(e){
    e.preventDefault();


    if(firstName.value != '' && lastName.value != '' && facultyNumber.value != '' && grade.value != ''){

        const url = 'http://localhost:3030/jsonstore/collections/students';
        
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            })
        }

        const res = await fetch(url, options);

        const data = await res.json();

        onLoad();
    }

    firstName.value = '';
    lastName.value = '';
    facultyNumber.value = '';
    grade.value = '';
}

attachEvents();