window.addEventListener('load', async () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', onLogin);
});

async function onLogin(event) {
    const url = 'http://localhost:3030/users/login';
    
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if(res.ok != true){
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        const token = data.accessToken;

        window.location = '/index.html';   
        localStorage.setItem('token', token)
    } catch (err) {
        alert(err.message)
    }
}