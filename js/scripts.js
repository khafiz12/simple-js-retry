let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=100";

  function add(pokemon) {
      pokemonList.push(pokemon);
  }

  function getAll() {
      return pokemonList;
  }

  function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
          showModal(pokemon);
      });
  }

  function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let button = document.createElement("button");
      let listPokemon = document.createElement("li");
      listPokemon.classList.add("list-group-item", "col-12", "col-md-6");
      pokemonList.appendChild(listPokemon);
      button.innerText = pokemon.name;
      button.setAttribute("data-id", "i++");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#exampleModal");
      button.classList.add("btn-primary", "btn-lg");
      listPokemon.appendChild(button);
      button.addEventListener("click", function() {
          showDetails(pokemon);
      });
  }

  function loadList() {
      return fetch(apiUrl).then(function(response) {
          return response.json();
      }).then(function(json) {
          json.results.forEach(function(item) {
              let pokemon = {name: item.name, detailsUrl: item.url};
              add(pokemon);
          });
      }).catch(function(e) {
          console.error(e);
      });
  }

  function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(function(response) {
          return response.json();
      }).then(function(details) {
          pokemon.height = details.height;
          pokemon.imageUrl = details.sprites.front_default;
          let typeArr = [];
          details.types.forEach((type) => typeArr.push(type.type.name));
          pokemon.type = typeArr.join(",");
      }).catch(function(e) {
          console.error(e);
      });
  }

  function showModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      modalTitle.empty();
      modalBody.empty();
      let nameElement = $('<h1>' + pokemon.name + '</h1>');
      let imageElement = $('<img class="modal-img">');
      imageElement.attr('src', pokemon.imageUrl);
      let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
      let pokemonTypes = $('<p>' + 'Type: ' + pokemon.type + '</p>');
      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(pokemonTypes);
  }

  // Added filterPokemon function
  function filterPokemon(searchQuery) {
      let filteredList = pokemonList.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      let pokemonListContainer = document.querySelector(".pokemon-list");
      pokemonListContainer.innerHTML = '';
      filteredList.forEach((pokemon) => {
          addListItem(pokemon);
      });
  }

  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
      filterPokemon: filterPokemon // Added filterPokemon to return
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });

  // Added event listener for search input
  let searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', function() {
      let searchQuery = searchInput.value;
      pokemonRepository.filterPokemon(searchQuery);
  });
});