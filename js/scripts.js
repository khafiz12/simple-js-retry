   
   
   let pokemonReprository = (function() {
   let pokemonList= [];
   let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    
        function add(pokemon) {
        if (
           typeof pokemon === "object" &&
           "name" in pokemon &&
           "height" in pokemon &&
           "type" in pokemon &&
           "detailsUrl" in pokemon &&
           "image" in pokemon
         ) 
         {
           pokemonList.push(pokemon);
         } else {
           console.log("pokemon is not correct");
         }}

       function getAll() {
         return pokemonList;
         }

       function addListItem(pokemon){
         let pokemonItem = document.querySelector(".pokemon-list");
         let listPokemon = document.createElement("li");
         let button = document.createElement("button");
         button.innerText = pokemon.name;
         button.classList.add("button-class");
         listPokemon.appendChild(button);
         pokemonItem.appendChild(listPokemon);
         button.addEventListener( "click", function showDetail() {
         console.log(pokemon)
         }
         )}

         function loadList(pokemon) {
         return fetch(apiUrl).then(function(response)
         {return response.json();}).then(function(json){
         json.results.forEach(function(item){
         let pokemon= {name:item.name,
                       detailsUrl:item.url,
                       height:item.height,
                       type: item.type,
                       image: item.image}; 
          
         add(pokemon);
         console.log(pokemon);
         });}).catch(function(e){console.error(e);})}
            
         function loadDetails(pokemon) {
         return fetch(apiUrl).then(function(response){
         return response.json ();}).then(function(details){
         pokemon.height=  details.height;
         pokemon.imageUrl= details.sprites.front_default;
         pokemon.type= details.type;
        }) 
        }

        function showDetail(pokemon) {pokemonReprository.loadDetails(pokemon).then(function()
        {console.log(pokemon)})} 

        function showModal(title,text) {
        
        let modalContainer= document.querySelector("#modal-container"); 
         modalContainer.innerHTML='';
        
        let modal=document.createElement("div");
        modal.classList.add("modal");
        
        let closeButtonElement= document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText= "Close";
        closeButtonElement.addEventListener("click",hideModal);

        let titleElement=document.createElement("h1");
        titleElement.innerText= title;

        let contentElement= document.createElement("p");
        contentElement.innerText= text;
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");
       } 

       function hideModal() {
       let modalContainer= document.querySelector("#modal-container");
       modalContainer.classList.remove("is-visible");
       if (dialogPromiseReject){dialogPromiseReject();
       dialogPromiseReject=null;}
       }  
       
       function showDialog(title,text) {
       showModal(title,text); 
       let modalContainer= document.querySelector("#modal-container");
       let modal= modalContainer.querySelector(".modal");
       let confirmButton= document.createElement("button");
       confirmButton.classList.add("modal-confirmation")  
       confirmButton.innerText= "Confirm";
       let cancelButton= document.createElement("button");
       cancelButton.classList.add("modal-cancel");
       cancelButton.innerText="Cancel"
       modal.appendChild(confirmButton);
       modal.appendChild(cancelButton);
       confirmButton.focus();
       return new Promise((resolve,reject)=>{cancelButton.addEventListener("click",()=>{
       hideModal();
       reject(); 
       });confirmButton.addEventListener("click",()=>{
       dialogPromiseReject=null; 
       hideModal();
       resolve(); 
       })
       dialogPromiseReject=reject;
       });
       } 

       {window.addEventListener("keydown",(e)=>{
       let modalContainer= document.querySelector("#modal-container"); 
       if(e.key === "Escape" && modalContainer.classList.contains("is-visible")) {hideModal();} })
       }

       document.querySelector("#show-dialog").addEventListener("click",()=>{showDialog("Confirm action", "Are you sure you want to do this?")
       .then(function(){alert("confirmed!");},()=>{alert("not confirmed");});});
       document.querySelector("#show-modal").addEventListener("click",()=>{showModal("Modal title","This is a modal");});   


       return {
       add: add,
       getAll: getAll,
       addListItem: addListItem,
       showDetail:showDetail,
       loadList:loadList,
       loadDetails:loadDetails,
        
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

     
    





   

   
    




    //if(pokemonList.height>10) 
     //    {result="wow it is tall";}
      //   else{result="wow it is small";} 
       

//for (let i= 0; i<pokemonList.length; i++) { document.write ("<p>" + pokemonList[i].name + "<p>")  }; 

//for(let i=0; i<pokemonList.length; i++) { document.write("<p>" + pokemonList[i].type + "</p>" ) ;} 

//for(let i=0; i<pokemonList.length; i++) {document.write("<p>" + pokemonList[i].height + "<p>" );}

//for(let i=0; i<pokemonList.length; i++) {document.write ( "<p>" + pokemonList[i].weight +  "<p>" );}               

