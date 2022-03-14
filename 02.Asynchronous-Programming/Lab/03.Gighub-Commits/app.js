async function loadCommits() {
    // Try it with Fetch API

    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;

    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    const commits = document.getElementById('commits');

    try{
        const res = await fetch(url);
        const data = await res.json();

        if(res.status != 200){
            throw new Error(`${res.status}`);
        }
        commits.innerHTML = '';
        for(let commite of data){
            const liEelement = document.createElement('li');
            liEelement.textContent = `${commite.commit.author.name}: ${commite.commit.message}`;

            commits.appendChild(liEelement)
        }
    }catch{
        commits.innerHTML = '';
        const liEelement = document.createElement('li');
        liEelement.textContent = `Error: 404 (Not Found)`;
        commits.appendChild(liEelement)
    }
}