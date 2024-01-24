   
   
   let pokemonReprository = (function() {
   let pokemonList= [];
   let apiUrl= "https://pokeapi.co/api/v2/pokemon/?limit=20";

    
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

       function addListItem(pokemon){
         let pokemonList = document.querySelector(".pokemon-list");
         pokemonList.classList.add("list-item");
         let listPokemon = document.createElement("li");
         listPokemon.classList.add("list-group-item");
         let button = document.createElement("button");
         button.classList.add("btn-primary")
         button.classList.add("btn-lg");
         button.innerText = pokemon.name;
         pokemonList.appendChild(listPokemon);
         listPokemon.appendChild(button);
         button.addEventListener( "click", function () {
         showDetails(pokemon)
         }
          );
        }

         function loadList() {
         return fetch(apiUrl).then(function(response)
         {return response.json();}).then(function(json){
         json.results.forEach(function(item){
         let pokemon= {name: item.name,
                       detailsUrl: item.url,
                       height: item.height,}; 
          
         add(pokemon);
         });}).catch(function(e){console.error(e);})
        }
            
         function loadDetails(pokemon) {
         let url= pokemon.detailsUrl;
         return fetch(url).then(function(response){
         return response.json ();}).then(function(details){
         pokemon.height=  details.height;
         pokemon.imageUrl= details.sprites.front_default;
         pokemon.type= details.type;
        }).catch(function(e){console.error(e)})
        }

        function showModal(pokemon) {
        
        let modalBody= document.querySelector(".modal-body");
        let modalTitle = document.querySelector(".modal-title");
        let modalHeader = document.querySelector(".modal-header");   
         
        modalTitle.empty();
        modalBody.empty();
        modalHeader.empty();
        // mute modalContainer for now. test to see if task 1.10 work
        //let modalContainer= document.querySelector("#modal-container"); 
        //modalContainer.innerHTML=''

        let titleElement=document.createElement("h1");
        titleElement.innerText= pokemon.name;

        let contentElement= document.createElement("p");
        contentElement.innerText= "Height:" + " "+ pokemon.height;

        let imageElement = document.createElement("img");
        imageElement.src = pokemon.imageUrl; 
        
        modalTitle.appendChild(titleElement);
        modalBody.appendChild(contentElement);
        modalBody.appendChild(imageElement);
        //need to add the body class missing in the HTML. maybe the reason why things arent working.//
        //modalContainer.appendChild(modalBody);
                    

        modalContainer.classList.add("is-visible");
        
        window.addEventListener("keydown", (e) =>{
        let modalContainer = document.querySelector("#modal-container");
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) 
        {hideModal()};
     
        modalContainer.addEventListener("click",(e)=>{
        let target = e.target;
        if (target === modalContainer) {hideModal();} 
         })
           })

       } 

       function hideModal() {
       let modalContainer= document.querySelector("#modal-container");
       modalContainer.classList.remove("is-visible");
       
       }

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

