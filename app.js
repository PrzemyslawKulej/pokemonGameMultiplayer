const pokedex = document.getElementById('pokedex');



let limit = 20;
let i = 0;

// Object of types and colors to style the cards depends on pokemons type 

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

// Fetching data from API and cooldown button during the fetching

const fetchPokemon = () => {

    buttonCooldown();
    buttonSpinnin();
    
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
            type: result.types.map((type) => type.type.name),
            id: result.id
        }));
        displayPokemon(pokemon);
        // const poke_types = pokemon.types.map(type => type.type.name);
        // const type = main_types.find(type => poke_types.indexOf(type) > -1);
	    // const pokemonEl = document.getElementsByClassName('card');
        // const color = colors[type];
        // (() => {
        //     pokemonEl.style.backgroundColor = color;
        // })

    // displayPokemon.log('good')
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


	
    (() => {
        pokemonEl.style.backgroundColor = color;
    })
	
};

// Creating button 


let btn = document.createElement("button");
document.body.appendChild(btn);
btn.classList.add('button');
btn.onclick = fetchPokemon; 


// Creating a span

let span = document.createElement('span');
span.innerHTML = "Load More"
btn.appendChild(span);
span.classList.add('button__text');

// Function to cooldown button after clicking

const buttonCooldown = () => {
    document.getElementsByClassName('button').disabled = true;
    setTimeout(function() {document.getElementsByClassName('button').disabled = false;}, 800);
}

// Function making button spinning during loading 

const buttonSpinnin = () => {
    btn.classList.add("button--loading");
    setTimeout(function() {btn.classList.remove("button--loading");}, 800);
}

// Creating logo img

let img = document.createElement('img');
img.src = "./images/logo.png";
document.body.appendChild(img); 
img.setAttribute('id','logo');




fetchPokemon();


