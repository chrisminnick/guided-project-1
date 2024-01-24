let nameH1;
let terrainSpan;
let populationSpan;
let climateSpan;
let filmsDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  terrainSpan = document.querySelector("span#terrain");
  climateSpan = document.querySelector("span#climate");
  populationSpan = document.querySelector("span#population");
  characterSpan = document.querySelector("span#character");
  filmsSpan = document.querySelector("span#film");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    planet.characters = await fetchCharacters(planet);
    planet.films = await fetchFilms(planet);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}
async function fetchPlanet(id) {
  let characterUrl = `${baseUrl}/planets/${id}`;
  return await fetch(characterUrl).then((res) => res.json());
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planet/${planet?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderPlanet = (planet) => {
  console.log(planet);
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  populationSpan.textContent = planet?.population;
  terrainSpan.textContent = planet?.terrain;

  const characterLis = planet?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  characterSpan.innerHTML = characterLis.join("");
  const filmsLis = planet?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsSpan.innerHTML = filmsLis.join("");
};
