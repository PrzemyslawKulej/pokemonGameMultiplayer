const pokedex = document.getElementById('pokedex');

let limit = 20;
let i = 0;

// Fetching data from API and cooldown button during the fetching

const fetchPokemon = () => {

    buttonCooldown();
    const promises = [];
    for(let j = 1; j <= 1; j++) {
        for (let i = 1; i <= limit; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
    i += 20;
    limit +=20;
    }

    // Function that map results from fetched json

    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

// Function that creates pokemon cards 

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

// Creating button 


let btn = document.createElement("button");
document.body.appendChild(btn);
btn.innerHTML = "Load More";
btn.setAttribute('id','load-more');
btn.onclick = fetchPokemon;

// Function to cooldown button after clicking

const buttonCooldown = () => {
    document.getElementById("load-more").disabled = true;
    setTimeout(function() {document.getElementById("load-more").disabled = false;}, 800);
}

// Creating logo img

let img = document.createElement('img');
img.src = "./images/logo.png";
document.body.appendChild(img); 
img.setAttribute('id','logo');




fetchPokemon();


