async function getInfo() {
    
    const stopID = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;

    const stopName = document.getElementById('stopName');
    const busesUl = document.getElementById('buses');

    try{
        const res = await fetch(url);
        const data = await res.json();

        
        busesUl.innerHTML = '';
        stopName.textContent = 'Loading..'
        
        if(res.status != 200){
            throw new Error;
        }
        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const busesLi = document.createElement('li');
            busesLi.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            busesUl.appendChild(busesLi)
        });
    }catch{
        busesUl.innerHTML = '';
        stopName.textContent = 'Error';
    }


}