let filmfilmNameH1;
let episodeSpan;
let releasedSpan;
let directorsSpan;
let characterDiv;
let homeworldDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  filmNameH1 = document.querySelector("h1#name");
  episodeSpan = document.querySelector("span#episode");
  directorsSpan = document.querySelector("span#director");
  releasedSpan = document.querySelector("span#release-date");
  characterDiv = document.querySelector("span#character");
  homeworldDiv = document.querySelector("span#homeworld");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.homeworld = await fetchHomeworld(film);
    //we stopped here on 01/23
    console.log(film.homeworld);
    film.characters = await fetchCharacters(film);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchHomeworld(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const homeworld = await fetch(url).then((res) => res.json());
  console.log(homeworld);
  return homeworld;
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.title}`; // Just to make the browser tab say their name
  filmNameH1.textContent = film?.title;
  releasedSpan.textContent = film?.release_date;
  directorsSpan.textContent = film?.producer;
  episodeSpan.textContent = film?.episode_id;
  const homeworldList = film?.homeworld?.map(
    (planet) => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`
  );
  homeworldDiv.innerHTML = homeworldList.join("");
  const characterList = film?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${characters.id}">${character.name}</li>`
  );
  characterDiv.innerHTML = characterList.join("");
};
