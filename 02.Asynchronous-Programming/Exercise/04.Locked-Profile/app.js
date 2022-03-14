async function lockedProfile() {
    
    const showBtn = document.querySelector('button');
    const mainProfile = document.getElementById('main')

    showBtn.addEventListener('click', profile);

    const url = `http://localhost:3030/jsonstore/advanced/profiles`;

    const res = await fetch(url);
    const data = await res.json();

    profile(Object.values(data));
    
    function profile(details){
        mainProfile.innerHTML = '';
        let counter = 0;
        for(let item of details){
            counter++;
            const divProfile = document.createElement('div');
            divProfile.className = 'profile';
            
            divProfile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${counter}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${counter}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user1Username" value="${item.username}" disabled readonly />
            <div id="user${counter}HiddenFields">
                <hr>
                <label>Email:</label>
                <input type="email" name="user${counter}Email" value="${item.email}" disabled readonly />
                <label>Age:</label>
                <input type="email" name="user${counter}Age" value="${item.age}" disabled readonly />
            </div>
            <button>Show more</button>`;
        
            mainProfile.appendChild(divProfile);
        };
    }

    const people = document.querySelectorAll('.profile button');
    let counter2 = 0;

    for(let buttons of people){
        counter2++;
        buttons.addEventListener('click', (e) => {
            let lockCheck = buttons.parentElement.querySelectorAll('input')[0];
            let showMore = e.target;
            let hiddenField = e.target.parentElement.querySelector('div');

            
            if(lockCheck.checked == true){
                return
            }

            showMore.textContent = showMore.textContent == 'Show more' ? 'Hide it' : 'Show more';
            hiddenField.style.display = hiddenField.style.display == 'block' ? 'none' : 'block';

        });
    }
    
}
