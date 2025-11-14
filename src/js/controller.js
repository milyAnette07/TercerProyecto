import * as model from '../js/model.js';
import recipeView from './views/RecipeView.js'; //inciso C i: Importa recipeView desde ./view/recipeview.js
import searchView from './views/searchViews.js';
//Importa todas las funciones como model.

console.log(" valor:", recipeView);
const recipeContainer = document.querySelector('.recipe');



///////////////////////////////////////
async function controlRecipes() {
  try {

    const id = window.location.hash.slice(1);
    console.log('🔍 ID recibido:', id);
    if (!id)
      return;
    console.log("llamar render");
    recipeView.renderSpinner(); // 23d. Mostrar el spinner mientras carga
    console.log("Salir render");
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
    throw err;
  }
}
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if(!query) {
      console.log("no se ha ingresado un termino de busqueda.");
      return;
    }
    await model.loadSearchResults(query);
    console.log ("controlSearchResults=",model.state.search.results);
  }
  catch (err) {
    console.log ("error:",err);
  }
}
//controlRecipes();// Invocar la funcion showRecipe.
function init() {

  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();




