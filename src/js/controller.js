import * as model from '../js/model.js';
import recipeView from './views/RecipeView.js'; //inciso C i: Importa recipeView desde ./view/recipeview.js
import searchView from './views/searchViews.js';
import resultsView from './views/ResultsView.js'; // Importa la clase ResultsView
import paginationView from './views/paginationView.js'; // Importa la clase PaginationView
//Importa todas las funciones como model.


const recipeContainer = document.querySelector('.recipe');
console.log("Controller.js-> valor:", recipeContainer);

async function controlRecipes() {
  try {

    const id = window.location.hash.slice(1);
    console.log('Controller.js-> ID recibido:', id);
    if (!id)
      return;
    console.log("Controller.js-> llamar renderSpinner");
    recipeView.renderSpinner(); // 23d. Mostrar el spinner mientras carga
    console.log("Controller.js-> Salir renderSpinner");
    console.log("Controller.js-> Entrar a model.loadRecipe con id:",id);
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);


  } catch (err) {
    resultsView.renderError(err);
    throw err;
  }
}
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) {
      console.log("Controller.js-> no se ha ingresado un termino de busqueda.");
      return;
    }
    // resetear página a 1 al iniciar nueva búsqueda
    model.state.search.page = 1;
    //  llama al método  resultsView.renderSpinner()
    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    console.log("Controller.js-> Antes de controlSearchResults=", model.getSearchResultsPage());
    // render paginado (usa la función creada en model)
    resultsView.render(model.getSearchResultsPage());
    // después del render de los resultados,
    // pasa como parámetro el objeto de búsqueda (model.state.search)
    paginationView.render(model.state.search);

  }
  catch (err) {
    console.log("error:", err);
    resultsView.renderError('Hubo un error buscando recetas');
  }
}
function controlPagination(goToPage) {
  console.log('Controller.js-> Inicio de controlPagination:', goToPage);

  const page = +goToPage;  // ← convertir a numero
  console.log("Controller.js-> entra funcion controlPagination y su valor page=", page);
  // Renderiza los resultados de la página solicitada
  resultsView.render(model.getSearchResultsPage(page));

  // Actualizar el estado
  model.state.search.page = page;

  // Renderiza los nuevos botones de paginación
  paginationView.render(model.state.search);
}

//controlRecipes();// Invocar la funcion showRecipe.
function init() {
  console.log(" Controller.js-> Entra Init");
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  console.log("Controller.js-> Sale Init");
}

init();




