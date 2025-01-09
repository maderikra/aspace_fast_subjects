const input = document.getElementById('search-input');
const resultsDiv = document.getElementById('search-results');
const queryIndex = document.getElementById('queryIndex');


//run lookup function when more than 3 characters have been typed
input.addEventListener('input', function() {
	const query = input.value.trim();
	if (query.length > 3) {
		fetchResults(query);
	} else {
		resultsDiv.style.display = 'none';
	}
});

//lookup function
async function fetchResults(query) {
	const url = `https://fast.oclc.org/searchfast/fastsuggest?&query=${encodeURIComponent(query)}&queryIndex=${queryIndex.value}&queryReturn=suggestall%2Cidroot%2Cauth%2Ctag%2Ctype%2Craw%2Cbreaker%2Cindicator&suggest=fastapps-db/assignFAST`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		displayResults(data.response.docs);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

function displayResults(results) {
	resultsDiv.innerHTML = '';
	const maxResults = 10;
	results.slice(0, maxResults).forEach(result => {
		const div = document.createElement('div');
		div.className = 'result-item';

        //the api may return several forms of a term: alt, auth, and raw
        //alt=alternate (invalid); format result to indicate a different preferred term
		if (result.type === 'alt') {
			div.innerHTML = `${result.suggestall} (<em>USE</em>: <b>${result.auth}</b>)`;
        //auth=authority (valid); 
		} else if (result.type === 'auth') {
			div.innerHTML = `<b>${result.suggestall}</b>`;
        //just in case
		} else {
			div.textContent = result.suggestall;
		}

		div.addEventListener('click', () => {
            //when clicking a search result, fill in the field with the raw form if it exists (raw includes the MARC breaker)
            //if no MARC breaker needed, use auth
			input.value = result.raw || result.auth;
			resultsDiv.style.display = 'none'; // Hide results after selection
            //append result to url and reload page
			const url = `${window.location.origin}/subjects/new?=${result.tag}%20%20${result.indicator}7$a${input.value}$2fast$0(OCoLC)${result.idroot[0]}`;
			window.location.href = url;
		});

		resultsDiv.appendChild(div);
	});

	resultsDiv.style.display = results.length ? 'block' : 'none'; // Show results if any
}


document.addEventListener('click', (event) => {
	if (!event.target.closest('#search-results') && event.target !== input) {
		resultsDiv.style.display = 'none'; // Hide results on outside click
	}
});