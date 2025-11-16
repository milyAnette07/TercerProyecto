import View from './View.js';
import icons from 'url:../../img/icons.svg';

// declarar ResultView como hija
class ResultsView extends View {
    _parentEl = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query';
    _message = ''; // mensaje vacío

    _generateMarkup() {
        // Cada receta se convierte en un preview pequeño
        return this._data.map(result => this._generateMarkupPreview(result)).join('');
    }
    _generateMarkupPreview(result) {
        console.log("Entra a funcion _generateMarkupPreview ");
        return `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>
    `;
        console.log("Sale a funcion _generateMarkupPreview ");

    }
 
}

export default new ResultsView();