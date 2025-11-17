import View from './View.js';
const icons = new URL('../../img/icons.svg', import.meta.url).href; 

// declarar ResultView como hija
class ResultsView extends View {
    _parentEl = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query';
    _message = ''; // mensaje vacío

    _generateMarkupPreview(result) {
        console.log("ResultsView.js-> Entra a  funcion _generateMarkupPreview ");
        return `
      <li class="preview">
            <a class="preview__link" href="#${ result.id}">
              <figure class="preview__fig">
                <img src="${ result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
    }
    
    _generateMarkup() {
        // Cada receta se convierte en un preview pequeño
        return this._data.map(result => this._generateMarkupPreview(result)).join('');
    }
 
}

export default new ResultsView();