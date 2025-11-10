import * as model from './model.js';
//Importa todas las funciones como model.

const recipeContainer = document.querySelector('.recipe');
import icons from '../img/icons.svg';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

async function showRecipe() {
  try {
    // ponerlo despues del try y pasarle el parametro recipeContainer
    // llamar la funcion renderSpinner en el punto 23 inciso D
    renderSpinner(recipeContainer);

    // URL Correcta
    const resp = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`); // inciso 4D pasar variable.
    // URL INcorrecta.
    //  const resp = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzz');
    const data = await resp.json();// aqui convierte  la respuesta a jason, para ello se delcara una constante data y no olvidar usar el await
    console.log('Respuesta:', resp); // enviar la consol la constante resp.
    console.log('Data:', data);  // enviar a la consola la constante data.

    let recipe = data.data.recipe; // Para visualizar los datos que se necesitan desplegar en la pantalla. 
    console.log('Receta:', recipe);

    //  // Desestructuración
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log('Receta despues de Desestructuracion:', recipe);
    const markup = ` 
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
        .map(ing => {
          return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
              </div>
              </li>
              `;
        }).join('')}
         

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
       `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
    // punto 4 inciso A, Declarar una variable id y asignar el meotdo window.location.hash
    let id = window.location.hash.slice(1); // se agrego slice(1) inciso 4C
    console.log("Imprimir id:", id);
    if (!id) return; // punto 6.


  } catch (err) {
    alert('Error: ' + err);// en caso de error, enviar mensaje en alert
  }
}

// Borrar punto 2 -> showRecipe();// Invocar la funcion showRecipe.

// Crear una funcion que se llame renderSpinner.
function renderSpinner(parentEI) {
  console.log("Entro en la funcion renderSpinner");
  let markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use> 
          </svg>
        </div>`; // importante cambiar el url src/img/icons.svg
  parentEI.innerHTML = ''; // punto 23 c
  parentEI.insertAdjacentHTML('afterbegin', markup); // igual a la linea 133, punto 23 inciso b
}
// Avance 2
// crear el evento con addEventListener
// aqui recibe los parametros hashchange y showRecipe
// punto 1.
// window.addEventListener("hashchange", showRecipe); 
// // punto 5 agregar parametro Load y showRecipe
// window.addEventListener("load",showRecipe);
// crear arreglo, para OPTIMIZAR los elementos‘haschange’,’load’ 
const eventos = ['hashchange', 'load'];
// aplicar el metodo foreach, recibe el parámetro una función flecha que,recibe el evento (ev)
eventos.forEach(ev => window.addEventListener(ev, showRecipe));

