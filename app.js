// REST COUNTRIES
const url = "https://restcountries.com/v3.1/region/europe";
const countriesList = document.getElementById("countries-list");
let data; 

fetchData(url);

function fetchData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((res) => {
      data = res;
      displayCountries(data);
    });
}

/* filtra per subregion */
function filterBySubregion(subregion) {
    const filteredData = data.filter(country => country.subregion === subregion);
    displayCountries(filteredData);
}

/* displayare le cards */
function displayCountries(countries) {
  countriesList.innerHTML = ""; // Pulisce la lista prima di inserire le nuove card

  countries.forEach((country) => {
    const countryName = country.name.common;
    const countryOfficialName = country.name.official;
    const countryCapital = country.capital[0] || "N/A";
    const countryRegion = country.region;
    const countrySubregion = country.subregion;
    const countryLanguages = Object.values(country.languages).join(", ");
    const countryPopulation = country.population;
    const countryFlag = country.flags.svg || "N/A";

    const cardHtml = `
            <div class="col">
                <div class="card">
                    <div class="card-body d-flex align-items-center" style="min-height: 300px">
                        <img src="${countryFlag}" alt="${countryName} Flag" style="width: 100px; height: auto;" class="me-3">
                        <div class="align-items-center">
                            <h5 class="card-title">${countryName} (${countryOfficialName})</h5>
                            <p class="card-text"><strong>Capital:</strong> ${countryCapital}</p>
                            <p class="card-text"><strong>Region:</strong> ${countryRegion}</p>
                            <p class="card-text"><strong>Subregion:</strong> ${countrySubregion}</p>
                            <p class="card-text"><strong>Languages:</strong> ${countryLanguages}</p>
                            <p class="card-text"><strong>Population:</strong> ${countryPopulation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    countriesList.innerHTML += cardHtml;
  });
}

/* ordina by name > common */
    function orderByName() {
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    displayCountries(data);
    }

/* ordina by population */
    function orderByPopulation() {
    data.sort((a, b) => b.population - a.population);
    displayCountries(data);
    }

/* resetto i filtri dopo averli attivati*/
    function resetFilters() {
    fetchData(url); 
    }

/* mostra/nasconde il bottone in base allo scroll */

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    var topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}