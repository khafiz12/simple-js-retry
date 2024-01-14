   
   
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
         let listPokemon = document.createElement("li");
         let button = document.createElement("button");
         button.innerText = pokemon.name;
         button.classList.add("button-class");
         listPokemon.appendChild(button);
         pokemonList.appendChild(listPokemon);
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
        
        let modalContainer= document.querySelector("#modal-container"); 
         modalContainer.innerHTML='';
        
        let modal=document.createElement("div");
        modal.classList.add("modal");
        
        let closeButtonElement= document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText= "Close";
        closeButtonElement.addEventListener("click",hideModal);

        let titleElement=document.createElement("h1");
        titleElement.innerText= pokemon.name;

        let contentElement= document.createElement("p");
        contentElement.innerText= "Height:" + " "+ pokemon.height;

        let imageElement = document.createElement("img");
        imageElement.src = pokemon.imageUrl; 

        
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");
       } 

       function hideModal() {
       let modalContainer= document.querySelector("#modal-container");
       modalContainer.classList.remove("is-visible");

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
      
      
       
       


       return {
       add: add,
       getAll: getAll,
       addListItem: addListItem,
       loadList:loadList,
       loadDetails:loadDetails,
       showModal:showModal,
        
       };

       })();

     //console.log(pokemonReprository.getAll());
     //pokemonReprository.add ({name: "smart", type: "gas" ,height: 15});
     //console.log(pokemonReprository.getAll());
     
     
     pokemonReprository.loadList().then(function () {
     pokemonReprository.getAll().forEach(function(pokemon) { 
     pokemonReprository.addListItem(pokemon);

     
    
   });
   });

