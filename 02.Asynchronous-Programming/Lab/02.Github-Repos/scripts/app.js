function loadRepos() {
	
	const repos = document.getElementById('repos');

	const username = document.getElementById('username').value;
	
	const url = `https://api.github.com/users/${username}/repos`;

	
	fetch(url)
	.then(resolve => {
		if (resolve.ok == false) {
			throw new Error(`${resolve.statusText}`)
		}
		return resolve.json()
	})
	.then(eventHadler)
	.catch(errorHadler)
	
	function eventHadler(data) {
		
		
		repos.innerHTML = '';
		for (let repo of data) {
			let li = document.createElement('li');
			li.innerHTML = `<a href="${repo.html_url}">
			${repo.full_name}
			</a>`
			
			repos.appendChild(li)
		}
		
	}

	function errorHadler (error){
		repos.innerHTML = '';
		const liel = document.createElement('li');
		li.textContent = `${error.statusText}`
		repos.appendChild(li)
	}
}