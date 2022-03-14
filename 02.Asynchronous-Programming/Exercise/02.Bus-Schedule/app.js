function solve() {

    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const label = document.getElementById('info');
    let stop = {
        next: 'depot'
    }
    
    async function depart() {

        try{
            departBtn.disabled = true;
            let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

            const res = await fetch(url);
            const data = await res.json();
            
    
            label.textContent = `Next stop ${data.name}`;
    
            stop = data;
            arriveBtn.disabled = false;

        }catch{
            label.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }

    }

    async function arrive() {

        label.textContent = `Arriving at ${stop.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();