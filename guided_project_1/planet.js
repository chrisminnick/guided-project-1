let nameH1;
let filmsDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  homeworldSpan = document.querySelector("span#character");
  filmsSpan = document.querySelector("span#film");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchCharacters(id);
    planet.homeworld = await fetchHomeworld(planet);
    planet.films = await fetchFilms(planet);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderCharacter(planet);
}
async function fetchPlanet(id) {
  let characterUrl = `${baseUrl}/characters/${id}`;
  return await fetch(characterUrl).then((res) => res.json());
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/character`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planet/${planet?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  nameH1.textContent = character?.name;
  //   heightSpan.textContent = character?.height;
  //   massSpan.textContent = character?.mass;
  //   birthYearSpan.textContent = character?.birth_year;
  homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const filmsLis = character?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsUl.innerHTML = filmsLis.join("");
};
