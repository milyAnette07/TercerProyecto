import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// Crear objeto state que, tendrá dentro de él un objeto recipe vacío.
export const state = {
    recipe: {},       // Receta actual cargada desde la API
    search: {
        query:'',
        results:[],
    },       // Resultados de búsqueda (se implementará más adelante)
    bookmarks: [],    // Recetas guardadas por el usuario (se implementará más adelante)
};

//Crea la función asíncrona loadRecipe y pasa la variable id.
export async function loadRecipe(id) {
     try {
        const data = await getJSON(`${API_URL}${id}`);

        const { recipe } = data.data; // Para visualizar los datos que se necesitan desplegar en la pantalla. 
        console.log('Receta:', recipe);

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

        console.log('Receta despues de Desestructuracion:', state.recipe);
    }
    catch (err) {

        console.log(`${err} 💥💥💥💥`);
        throw err;
    }
}
export const loadSearchResults = async function name(query) {
    try {
        const data = await getJSON(`${API_URL}/?search=${query}`);
        // // 🧠 Transformamos y almacenamos los resultados en el estado global
         state.search.query = query;
         state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
    }
    catch (err) {
        console.log(`${err} 💥💥💥💥`);
    }

}