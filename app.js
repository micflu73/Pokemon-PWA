const pokemonList = document.querySelector("#pokemonList");

const defaultPokemon = "https://pokeapi.co/api/v2/pokemon/1/";
const pokemonCard = document.querySelector("#pokemonCard");

window.addEventListener("load", (e) => {
    // on load
    getPokemonList().then(() => {
        showPokemonCard(defaultPokemon);
    });
    // on change of dropdown
    pokemonList.addEventListener("change", (e) => {
        showPokemonCard(e.target.value);
    })  
    
    registerServiceWorker();
});

async function getPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=35");
    const json = await response.json();

    console.log(json);

    pokemonList.innerHTML = json.results.map(
        (result) => `<option value="${result.url}">${result.name}</option>`
    );

}

function createCard(pokemon) {
    return `
        <div class="class-header">
            <h2>#${pokemon.id}</h2>
        </div>
        <img src="${pokemon.sprites.other.dream_world.front_default}" 
            class="card-img-top"
            width="150"
            height="150">
        <div class="card-body">
            <h5 class="card-title" style="text-transform:capitalize">${pokemon.name}</h5>
            <div class="badge badge-warning">Height: ${pokemon.height}</div>
            <div class="badge badge-danger">Weight: ${pokemon.weight}</div>
        </div>
    `;
}

async function showPokemonCard(url) {
    const response = await fetch(url)
    const json = await response.json();

    pokemonCard.innerHTML = createCard(json);
}

async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("sw.js");
        } catch (error) {
            console.log("Failed: ", error);
        }
    }
}

