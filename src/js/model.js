// Crear objeto state que, tendrá dentro de él un objeto recipe vacío.
export const state = {
    recipe: {},
};
//Crea la función asíncrona loadRecipe y pasa la variable id.
export async function loadRecipe(id) {
    try {
        // la declaracion de res y data
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();
        // La validación del estado de res
        // const { recipe } = data.data;
        //Declara como const el objeto recipe
        const recipe = data.data.recipe;

        // Desestructuración de recipe
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
        // La impresion de recipe
        // y  también registra a recipe como objeto de state.recipe
        console.log('Receta despues de Desestructuracion:',state.recipe);
    } catch (err) {
        // enviar la alerta de error.
        console.error('Error al cargar la receta:', err);
        throw err;
    }
}