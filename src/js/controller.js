import * as model from '../js/model.js';
import recipeView from './views/RecipeView.js'; //inciso C i: Importa recipeView desde ./view/recipeview.js
import searchView from './views/searchViews.js';
import resultsView from './views/ResultsView.js'; // Importa la clase ResultsView

//Importa todas las funciones como model.


const recipeContainer = document.querySelector('.recipe');
console.log(" valor:", recipeContainer);

async function controlRecipes() {
  try {

    const id = window.location.hash.slice(1);
    console.log(' ID recibido:', id);
    if (!id)
      return;
    console.log("llamar render");
    resultsView.renderSpinner(); // 23d. Mostrar el spinner mientras carga
    console.log("Salir render");
    await model.loadRecipe(id);
     resultsView.render(model.state.search.results);
   //resultsView.render(model.getSearchResultsPage());


  } catch (err) {
    resultsView.renderError(err);
    throw err;
  }
}
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) {
      console.log("no se ha ingresado un termino de busqueda.");
      return;
    }
     // resetear página a 1 al iniciar nueva búsqueda
 model.state.search.page = 1;
    //  llama al método  resultsView.renderSpinner()
    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    console.log("Antes de controlSearchResults=", model.getSearchResultsPage());
    // render paginado (usa la función creada en model)
    resultsView.render(model.getSearchResultsPage());


  }
  catch (err) {
    console.log("error:", err);
     resultsView.renderError('Hubo un error buscando recetas');
  }
}
//controlRecipes();// Invocar la funcion showRecipe.
function init() {
console.log("Entra Init");
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  console.log("Sale Init");
}

init();




