let filmfilmNameH1;
let episodeSpan;
let releasedSpan;
let directorsSpan;
let characterDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api/films/`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  filmNameH1 = document.querySelector("h1#name");
  episodeSpan = document.querySelector("span#episode");
  directorsSpan = document.querySelector("span#director");
  releasedSpan = document.querySelector("span#release-date");
  characterDiv = document.querySelector("span#character");
  planetDiv = document.querySelector("#planets>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.planets = await fetchHomeworld(film);
    film.films = await fetchFilms(film);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderCharacter(film);
}
async function fetchFilm(id) {
  let characterUrl = `${baseUrl}/films/${id}`;
  return await fetch(characterUrl).then((res) => res.json());
}

async function fetchHomeworld(film) {
  const url = `${baseUrl}/planets/${film?.planets}`;
  const planet = await fetch(url).then((res) => res.json());
  return planet;
}

async function fetchFilms(film) {
  const url = `${baseUrl}/characters/${film?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderCharacter = (film) => {
  document.title = `SWAPI - ${film?.name}`; // Just to make the browser tab say their name
  filmNameH1.textContent = film?.name;
  releasedSpan.textContent = film?.height;
  directorsSpan.textContent = film?.mass;
  episodeSpan.textContent = film?.birth_year;
  characterDiv.innerHTML = `<a href="/planet.html?id=${film?.planets.id}">${film?.planets.name}</a>`;
  const filmsLis = film?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  planetDiv.innerHTML = filmsLis.join("");
};
