function attachEvents() {
    document.getElementById('submit').addEventListener('click', postMessage);
    document.getElementById('refresh').addEventListener('click', loadMessage);
}

attachEvents();


async function postMessage() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    
    const list = document.getElementById('messages');
    const name = document.querySelector('[name="author"]').value.trim();
    const comment = document.querySelector('[name="content"]').value.trim();
    
    const option = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: name,
            content: comment
        })
    }

    const res = await fetch(url, option);
    const result = await res.json();
    
    list.value += `\n${result.author}: ${result.content}`;
    
    document.querySelector('[name="content"]').value = '';
    //console.log(result);
}

async function loadMessage() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    
    const res = await fetch(url);
    const data = await res.json();
    
    const messages = Object.values(data);
    
    const list = document.getElementById('messages');
    
    list.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
}