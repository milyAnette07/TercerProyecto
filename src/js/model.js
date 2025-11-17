import { API_URL } from './config.js';
import { RES_PER_PAGE } from './config.js'; //   Importa la constante RES_PER_PAGE
import { getJSON } from './helpers.js';

// Crear objeto state que, tendrá dentro de él un objeto recipe vacío.
export const state = {
    recipe: {},       // Receta actual cargada desde la API
    search: {
        query: '',
        results: [],
        page: 1, // Page con el valor 1 por defecto.
        resultsPerPage: RES_PER_PAGE, // resultsPerPage asígnale el valor de la constante RES_PER_PAGE.
    },       // Resultados de búsqueda (se implementará más adelante)
    bookmarks: [],    // Recetas guardadas por el usuario (se implementará más adelante)
};

//Crea la función asíncrona loadRecipe y pasa la variable id.
export async function loadRecipe(id) {
    try {
        console.log('Modelo.js ->Entra loadRecipe y si ID es:', id);
        const data = await getJSON(`${API_URL}${id}`);
        console.log('Modelo.js -> valor del data:', data);

        const { recipe } = data.data; // Para visualizar los datos que se necesitan desplegar en la pantalla. 
        console.log('Modelo.js -> Receta:', recipe);



        //  // Desestructuración
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };

        console.log('Modelo.js-> despues de Desestructuracion:', state.recipe);
    }
    catch (err) {

        console.log(`${err} 💥💥💥💥`);
        throw err;
    }
}
export const loadSearchResults = async function name(query) {
    try 
    {
        console.log("modelo.js -> Funcion loadSearchResults", state.search.results);
        const data = await getJSON(`${API_URL}/?search=${query}`);
        
        state.search.query = query;
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
         console.log("Funcion loadSearchResults", state.search.results);
    }
    catch (err) {
        console.log(`${err} 💥💥💥💥`);
    }

}
//  la parte final del archivo crea una función expresada
export const getSearchResultsPage = function (page = state.search.page) {
    console.log("Modelo.js -> Entrar a getSearchResultsPage");
    state.search.page = page;
    console.log("Modelo.js -> resultado del page: ", page);

    const start = (page - 1) * state.search.resultsPerPage;
    console.log("Modelo.js -> resultado del start: ", start);
    const end = page * state.search.resultsPerPage;
    console.log("Modelo.js -> resultado del end: ", end);


    return state.search.results.slice(start, end);
};
