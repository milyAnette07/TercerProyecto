const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};



///////////////////////////////////////
async function showRecipe() {
  try {
    // URL Correcta
    const resp = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
    // URL INcorrecta.
  //  const resp = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzz');
    const data = await resp.json();// aqui convierte  la respuesta a jason, para ello se delcara una constante data y no olvidar usar el await
    console.log('Respuesta:', resp); // enviar la consol la constante resp.
    console.log('Data:', data);  // enviar a la consola la constante data.

    const recipe = data.data.recipe; // Para visualizar los datos que se necesitan desplegar en la pantalla. 
    console.log('Receta:', recipe);

  } catch (err) {
    alert('Error: ' + err);// en caso de error, enviar mensaje en alert
  }
}

showRecipe();// Invocar la funcion showRecipe.