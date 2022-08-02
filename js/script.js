const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

//iniciar em um numero

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200 ) {
        const data = await APIResponse.json();
        return data;
    }

    //caso o que for digitado não seja valido if

}

    //isso é uma promise então precisamos esperar a resposta, para isso usamos o await e async
    //para aparecer os datos é preciso extrair o jason da api 

const renderPokemon = async (pokemon) => {
    
    const data = await fetchPokemon(pokemon);

    if(data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
   
    input.value = '';
    searchPokemon = data.id;
    //vai lipar o que estiver na busca é melhor ser inserido dentro da função busca
    //se o id não for valido naõ retorna nada
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }

}

    //como saber que é data.name, pois na api o elemento se chama nome 
    //imagem exportada conforme caminho na api 

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
     searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }

})
buttonNext.addEventListener('click', () => {
    searchPokemon +=1;
    renderPokemon(searchPokemon);
})

//o evento que a gente vai ouvir desse formulário é o submit o que a pessoa escreveu vai executar uma função
//tolowercase transforma todos os caracteres minusculos

renderPokemon(searchPokemon);