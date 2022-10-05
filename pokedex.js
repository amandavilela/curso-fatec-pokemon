function fetchPokemons() {
    // faz requisição pra API retornar a lista de pokemons com nome e URL
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        // transforma a resposta da requisição em json
        .then(response => response.json())
        .then((allpokemon) => {
            // loop nos pokemons e chama a função fetchPokemonData enviando cada um dos pokemons
            allpokemon.results.forEach((pokemon) => fetchPokemonData(pokemon));
        });
}

function fetchPokemonData(pokemon) {
    // recebe o pokemon e salva a url do pokemon na variável url
    const url = pokemon.url;
    // faz requisição na url recebida, por exemplo https://pokeapi.co/api/v2/pokemon/1/
    fetch(url)
        // transforma a resposta em json
        .then(response => response.json())
        // pega as informações do pokemon e envia para a função renderPokemonCard
        .then((pokeData) => renderPokemonCard(pokeData));
}

function renderPokemonCard(pokeData) {
    /* interpola as informações do pokemon no template e salva em uma variável
       a função renderTypes é chamada dentro do template enviando os tipos do pokemon
    */
    const template = `<li class="card">
        <h2 class="card-title">${pokeData.name}</h2>
        <p>#${pokeData.id}</p>
        <img class="card-image" src="${pokeData.sprites.other.home.front_default}" />
        <ul>
            ${renderTypes(pokeData.types)}
        </ul>
    </li>`;

    // seleciona a lista e insere a li dentro dela
    const pokedex = document.querySelector('.pokedex');
    pokedex.insertAdjacentHTML("beforeend", template);
}

/* função que recebe os tipos de pokemon
   faz loop entre eles e retorna cada tipo dentro de uma li
*/
function renderTypes(types) {
    let template = '';

    types.forEach(function(type) {
        template += `<li>${type.type.name}</li>`;
    });

    return template;
}

fetchPokemons();
