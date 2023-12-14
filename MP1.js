const countries = [
    { name: 'United States', code: 1 },
    { name: 'Canada', code: 2 },
    { name: 'United Kingdom', code: 3 },
    { name: 'France', code: 4 },
    { name: 'Germany', code: 5 },
    { name: 'Morocco', code: 6 }
];

// 1
console.log('Q1');

let Total = countries.reduce((accumulator, place) => {
    return accumulator + place.code;
}, 0);
console.log(Total);

//2
console.log('');
console.log('Q2');

console.log(countries.filter(country => country.code >= 3));

//3
console.log('');
console.log('Q3');

console.log(countries.map(country => country.name));

//4
console.log('');
console.log('Q4');

console.log(countries.sort((a, b) => b.code - a.code));

//5
console.log('');
console.log('Q5');

let filteredP = countries.filter(country => country.name.startsWith('U'));
let totalU= filteredP.reduce((accumulator, country) => {
    return accumulator + country.code;
}, 0);
console.log(totalU);

//6
console.log('');
console.log('Q6');

let newcount = { name: 'Japan', code: 7 };
countries.push(newcount);

console.log(countries);

//7
console.log('');
console.log('Q7');

console.log(countries.pop());

//8
console.log('');
console.log('Q8');

let item = countries.findIndex(country => country.code === 4);
if (item !== -1) {
    let remove = countries.splice(item, 1);
    console.log(remove);
} else {
    console.log('there is no country with code 4');
}

console.log(countries);

//9
console.log('');
console.log('Q9');

console.log(countries.slice(0, 3));

//console.log(countries);

//10
console.log('');
console.log('Q10');

console.log(countries.find(country => country.code === 2));

//11
console.log('');
console.log('Q11');

console.log(countries.some(country => country.code >= 5));

//12
console.log('');
console.log('Q12');

console.log(countries.every(country => country.name.length >= 3));


//13
console.log('');
console.log('Q13');

console.log(countries.some(country => country.name === 'Canada'));

//14
console.log('');
console.log('Q14');

let espace = countries.map(country => ({
    ...country,
    name: country.name.trim()
}));

console.log(espace);

//15
console.log('');
console.log('Q15');

countries.sort((a, b) => a.name.localeCompare(b.name));
console.log(countries);

//16
console.log('');
console.log('Q16');

console.log(countries[2]);

//17
console.log('');
console.log('Q17');

for (let country of countries) {
    console.log(country.name);
}


//18
console.log('');
console.log('Q18');

let pays = [
    { name: 'Australia', code: 7 },
    { name: 'China', code: 8 }
];

console.log(countries.concat(pays));

//19
console.log('');
console.log('Q19');

console.log(countries.map(country => country.name).join(', '));

//20
console.log('');
console.log('Q20');

let countryString = 'Italy, Spain, Portugal';
let nomPays = countryString.split(',').map(name => name.trim());
let places = nomPays.map((name, index) => ({ name, code: countries.length + 1 + index }));

console.log(countries.concat(places));

//21
console.log('');
console.log('Q21');

console.log(countries.shift());
// console.log(countries);

//22
console.log('');
console.log('Q22');

let nouvel = { name: 'KSA', code: 7 };
countries.unshift(nouvel);

console.log(nouvel);
// console.log(countries);


//23
console.log('');
console.log('Q23');

let combinaison = countries
    .filter(country => country.code > 5)
    .map(country => ({ name: country.name, code: country.code }))
    .sort((a, b) => b.code - a.code);

console.log(combinaison);

// 24

let displayTable = document.querySelector('#paysTable tbody');

countries.forEach(country => {
    const row = displayTable.insertRow();
    const nameCell = row.insertCell(0);
    const codeCell = row.insertCell(1);
    nameCell.textContent = country.name;
    codeCell.textContent = country.code;
});

// 25 - 26 Methode Fetch
function displayCountries(countries) {
    const countriesList = document.getElementById('paysList');
    const first10Countries = countries.slice(0, 10);
    first10Countries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country.name.common;
        countriesList.appendChild(listItem);
    });
}

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => displayCountries(data))
    .catch(error => console.error('Error:', error));


// 25 - 26 methode axios
function displayCountries(countries) {
    const countriesList = document.getElementById('paysList');

    countries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country.name.common;
        countriesList.appendChild(listItem);
    });
}

axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
        const first10Countries = response.data.slice(0, 10);
        displayCountries(first10Countries);
    })
    .catch(error => console.error('Error:', error));

// 27
const inputFileds = [
    document.getElementById("nomPays"),
    document.getElementById("code-contry")
]

let countriesArray = [];
const nameField = document.getElementById("nomPays");
const codeField = document.getElementById("codePays");
const inputButton = document.getElementById("ajouter");
const countryList = document.getElementById("paysList");

inputButton.addEventListener("click", function () {
    let newCountryName = nameField.value.trim();
    let newCodeAdd = codeField.value.trim();

    if (newCountryName !== "" && newCodeAdd !== "") {
        countriesArray.push({ name: newCountryName, code: newCodeAdd });
        saveCountriesToLocalStorage();
        clearInputFields();
        renderCountries();
    }
});


function saveCountriesToLocalStorage() {
    localStorage.setItem("countriesArray", JSON.stringify(countriesArray));
}

function loadCountriesFromLocalStorage() {
    let storedCountries = localStorage.getItem("countriesArray");
    countriesArray = JSON.parse(storedCountries) || [];
    renderCountries();
    //console.log("stored", countriesArray)
}

function renderCountries() {
    countryList.innerHTML = "";
    for (let i = 0; i < countriesArray.length; i++) {
        let country = countriesArray[i];
        let newElementAdded = `<li>${country.name} (code: ${country.code})</li>`;
        countryList.innerHTML += newElementAdded;
    }
}
loadCountriesFromLocalStorage();

function clearInputFields() {
    nameField.value = "";
    codeField.value = "";
}