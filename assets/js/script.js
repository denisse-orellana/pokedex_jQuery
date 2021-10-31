$(document).ready(function() {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    fetchData();

    // function click (id: nextPage) will led to the next url (next 20 pokemon API)
    $('#nextPage').click(function(event) {
        event.preventDefault();
        $('#cardPokemon').html('');
        fetchData();
    })

    function fetchData() {
        $.ajax({
            url: url,
            dataType: 'json',
            method: 'GET',
            success: function(response) {
                // To check the data from the api in the console
                console.log(response);
                url = response.next;
                // To iterate each element of the response (forEach)
                response.results.forEach(function(pokemon) {
                    // let newPokemon = `<li>${pokemon.name}</li>`;
                    // $('#cardPokemon').append(newPokemon);

                    // Adding Bootstrap Card

                    // Pokemon id
                    let id = pokemon.url.split('/')[6];

                    let pokeCard = 
                    `
                    <div id="card" class="card" col-4>
                        <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${pokemon.name}</h5>
                            <a id="${pokemon.name}" href="#" class="btn btn-success">¡Quiero saber más de este pokémon!</a>
                        </div>
                    </div>
                    `
                    // Inserting the card to the end of the elements (append)
                    $('#cardPokemon').append(pokeCard);

                    // Adding the Bootstrap modal

                    let pokeModal = 
                    `
                    <div id="modalPokemon" class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <img id="imgModal" class="card-img-top" width="50%" src="..." alt="Card image cap">
                        <div class="modal-header">
                            <h3 class="modal-title"></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3 id="pokeName"></h3>
                            <div class="container">
                                <h6>Characteristics:</h6>
                                <p id="abilities"></p>
                                <p id="types"></p>
                                <p id="generation"></p>
                                <p>First five moves: </p>
                                <div class="container">
                                    <ul id="moves"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    `

                    // Function to add the modal at the click event
                    $('#' + (pokemon.name)).click(function(event) {
                        event.preventDefault;
                        $('#cardPokemon').append(pokeModal);
                        $('#modalPokemon').modal('show');

                        // Adding name to the modal body
                        $('#pokeName').html('Name: ' + pokemon.name);

                        fetchPokemonInfo();

                        // Getting the url of each pokemon
                        // console.log(pokemon.url)
                        urlPoke = pokemon.url;

                        // To fetch information of each pokemon through the url
                        function fetchPokemonInfo() {
                            $.ajax({
                                url: pokemon.url,
                                dataType: 'json',
                                method: 'GET',
                                success: function(response) {
                                    // To see the information of each pokemon after clicked the modal
                                    console.log(response);

                                    // Adding type, generation, abilities and 5 first movements to the modal body 
                                    $('#types').html(pokemonType(response));
                                    // $('#generation').html(pokemonGeneration(response));
                                    $('#abilities').html(pokemonAbilities(response));
                                    $('#moves').html(fiveFirstMoves(response));

                                    // Adding images to the modal
                                    // $('#img').html(`<img src='${response.sprites.front_default}'>`);
                                    $('#imgModal').attr("src", response.sprites.front_shiny);
                                }
                            })
                        }

                    })

                    
                })
            }
        })
    }
    
    function pokemonType(response) {
        let allTypes = 'Types: ';
        response.types.forEach(function(type, index) {
            allTypes += (index + 1) + ') ' + type.type.name +  ' ';
        })
        return allTypes;
    }

    // function pokemonGeneration(response) {
    //     let allGenerations = 'Generations: ';
    //     response.sprites.versions.forEach(function(generation, index) {
    //         allGenerations += (index + 1) + ') ' + generation.version['generation-i'] +  ' ';
    //     })
    //     return allGenerations;
    // }

    function pokemonAbilities(response) {
        let allAbilities = 'Abilitites: '
        response.abilities.forEach(function(ability, index) {
            allAbilities += (index + 1) + ') ' + ability.ability.name + ' ';
        }) 
        console.log(allAbilities);
        return allAbilities;
    }

    function fiveFirstMoves(response) {
        let fiveMoves = "";
        response.moves.forEach(function(move, index) {
            if (index <= 4) {
                fiveMoves += (index + 1) + ') ' + move.move.name + ' ';
            }
        })
        return fiveMoves;
    }

})



/*
BRINGING THE ID FROM THE API I
In the console:
* url =  'https://pokeapi.co/api/v2/pokemon/1/';
* id = url.split('/')
    (8) ['https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '']
    0: "https:"
    1: ""
    2: "pokeapi.co"
    3: "api"
    4: "v2"
    5: "pokemon"
!   6: "1"
    7: ""
    length: 8
* id = url.split('/')[6]
    '1'
*/

/* 
url = https://pokeapi.co/api/v2/pokemon/2/

"abilities": [
                {
                "ability": { "name": "overgrow", "url": "https://pokeapi.co/api/v2/ability/65/" },
                "is_hidden": false,
                "slot": 1
                },
                {
                "ability": { "name": "chlorophyll", "url": "https://pokeapi.co/api/v2/ability/34/" },
                "is_hidden": true,
                "slot": 3
                }
            ],
*/