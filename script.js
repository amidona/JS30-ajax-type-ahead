const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))
// blob because it returns a blob of data. JSON is an argument that fetch will return, so running blob.json() will convert it to the data

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        //here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi')
        //g for global, i for insensitive (meaning regardless of upper or lower case)
        return place.city.match(regex) || place.state.match(regex)
    });
}

//a function to add the correct commas to a large number
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        //above adds highlight in the results based on what the user is typing
        return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population"> ${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');
    //.join('') changes it from an array of multiple items to a string
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
