const icons = new URL('../../img/icons.svg', import.meta.url).href; // Parcel v2
import Fraction from 'fraction.js';

class RecipeView {
  _errorMessage = 'We could not find that recipe. Please try another one!';
  #parentElement = document.querySelector('.recipe');
  #data;
  // 🖼️ Renderiza la receta en el DOM
  render(data) {
    console.log("entra valor", this.#parentElement);
    this.#data = data;           // Guarda los datos recibidos
    this.#clear();               // Limpia el contenido anterior
    const markup = this.#generateMarkup(); // Genera el nuevo HTML
    this.#parentElement.insertAdjacentHTML('afterbegin', markup); // Inserta en el DOM

  }
  // 🧹 Limpia el contenido del contenedor principal
  #clear() {
    this.#parentElement.innerHTML = '';
  }
  #generateMarkup() {
    console.log("entra a generateMarkup");
    return ` 
        <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
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
          ${this.#data.ingredients
        .map(ing => {
          return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ''}</div>
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
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
       `;
  }
  // Función para renderizar el spinner Av1_23
  renderSpinner() {
    console.log("iniciando render");
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
    this.#parentElement.innerHTML = ''; // 23c. Limpiar el contenido previo
    this.#parentElement.insertAdjacentHTML('afterbegin', markup); // 23b. Insertar el spinner
  }
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev =>
      window.addEventListener(ev, handler)
    );
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this.#clear();               // Limpia el contenido anterior
    this.#parentElement.insertAdjacentHTML('afterbegin', markup); // Inserta en el DOM
  }

  renderMessage(message=this._message) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this.#clear();               // Limpia el contenido anterior
    this.#parentElement.insertAdjacentHTML('afterbegin', markup); // Inserta en el DOM
  }
}
export default new RecipeView();