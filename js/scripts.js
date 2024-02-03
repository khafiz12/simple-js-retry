   /* stylelint-disable */
   let pokemonReprository= (function() {
   let pokemonList= [];
   let apiUrl= "https://pokeapi.co/api/v2/pokemon/?limit=100";

    
       function add(pokemon) {
        return pokemonList.push(pokemon);
         } 

       function getAll() {
         return pokemonList;
          }
        
       function showDetails(pokemon) {
            loadDetails(pokemon).then(function(){
            showModal(pokemon); 
         }
         
          ); 
           }

   //append pokemon-list to created button and li //
       function addListItem(pokemon){     
         let pokemonList = document.querySelector(".pokemon-list");
         let button = document.createElement("button");
         let listPokemon = document.createElement("li");
         listPokemon.classList.add("list-group-item");
         listPokemon.classList.add("col-12");
         listPokemon.classList.add("col-md-6");
         pokemonList.appendChild(listPokemon);
         button.innerText=pokemon.name
         button.setAttribute("data-id", "i++")
         button.setAttribute("data-toggle", "modal");
         button.setAttribute("data-target", "#exampleModal");
         button.classList.add("btn-primary",)
         button.classList.add("btn-lg");
         listPokemon.appendChild(button);
         button.addEventListener( "click", function () {
         showDetails(pokemon)
         }
          );
           }

        //load pokemon list from apiURL using json //
         function loadList() {
         return fetch(apiUrl).then(function(response)
         {return response.json();}).then(function(json){
         json.results.forEach(function(item){
         let pokemon= {name: item.name,
                       detailsUrl: item.url,}
                      
         add(pokemon);
         });}).catch(function(e){console.error(e);})
          }

           //Load pokemon-list details // 
         function loadDetails(pokemon) {
         let url= pokemon.detailsUrl;
         return fetch(url).then(function(response){
         return response.json ();}).then(function(details){
         pokemon.height=  details.height;
         pokemon.imageUrl= details.sprites.front_default;
        //need to understand how to pull strings from an api//
         typeArr = [];
         details.types.forEach((type) => typeArr.push(type.type.name));
         typeString = typeArr.join(",");
         pokemon.type = typeString;

        }).catch(function(e){console.error(e)})
         }

        //load modal from bootstrap and append variables//
        function showModal(pokemon) { 
          let modalBody = $('.modal-body');
          let modalTitle = $('.modal-title');
          let modalHeader = $('.modal-header');
          // clear existing content of the modal//
          modalTitle.empty();
          modalBody.empty();
          // creating element for name in modal content//
          let nameElement = $('<h1>' + pokemon.name + '</h1>');
          // creating img in modal content//
          let imageElement = $('<img class="modal-img">');
            imageElement.attr('src', pokemon.imageUrl);
          // creating element for height in modal content//
          let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');
          // creating element for weight in modal content//
          let pokemonTypes = $('<p>' + 'Type : ' + pokemon.type + '</p>');
          
          modalTitle.append(nameElement);
          modalBody.append(imageElement);
          modalBody.append(heightElement);
          modalBody.append(pokemonTypes);
       ;} 

         return {
         add: add,
         getAll: getAll,
         addListItem: addListItem,
         loadList:loadList,
         loadDetails:loadDetails,
         showModal:showModal,
       };
        })();

     pokemonReprository.loadList().then(function () {
     pokemonReprository.getAll().forEach(function(pokemon) { 
     pokemonReprository.addListItem(pokemon);

      });
       });

/* stylelint-enable */