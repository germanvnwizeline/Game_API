const fetch = require("node-fetch");
/*

let result = fetch("https://swapi.dev/api/people")
  .then((result) => result.json())
  .then((data) => console.log(data));
*/

starwars_world = [];

async function fetchWorld(URL) {
  let result = await fetch(URL);
  let data = await result.json();
  return data.name;
}

async function fetchStarWarsApi() {
  try {
    let result = await fetch("https://swapi.dev/api/people");
    let data = result.json();
    data.results.forEach((person, index) => {
      starwars_world.push({
        name: person.name,
        height: person.height,
        gender: person.gender,
        homeworld: fetch("http://swapi.dev/api/planets/1/")
          .then((result) => result.json().name)
          .then((data) => data),
      });
    });
  } catch (err) {
    console.log(err);
  }
}

async function printResults() {
  await fetchStarWarsApi();
  console.log(starwars_world);
}

printResults();

//fetchWorld("http://swapi.dev/api/planets/1/");
