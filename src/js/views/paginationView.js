import View from './View.js'; //Importa la clase View
const icons = new URL('../../img/icons.svg', import.meta.url).href; // Parcel v2 // Importa los iconos

//Crea la clase PaginationView como hija de la clase Vista 
class paginationView extends View {
    
    //Declara al elemento padre (_parentEl) como privado
    _parentEl = document.querySelector('.pagination');

    //Crea el método addHandlerClick por encima del método _generaMarkup. 
    addHandlerClick(handler) {
        console.log("PaginacionView.js-> Entra a addHandlerClick.");
        // Utiliza el método addEventListener de this._parentEl
        // y Una función anónima con el evento(e)  
       
        this._parentEl.addEventListener('click', function (e) {

            // (e.target), sobre este utilizar el método closest y pasarle como parámetro la clase del botón ('.btn--inline')
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            // Crea la constante goToPage y asígnale la expresión btn.dataset.goto;
            const goToPage = btn.dataset.goto;
            console.log("PaginacionView.js-> Imprime valor goToPage:", goToPage);
            handler(goToPage);

        });
    }
    // Crea el método privado _generateMarkup 
    _generateMarkup() {
        console.log('PaginacionView.js-> Entrando a _generateMarkup.', this._data);

        // Declara la constante página actual (curPage) que será igual a this._data.page
        const curPage = this._data.page;
        // la constante numPages de la siguiente manera:
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log("paginationView.js-> valor numPages=", numPages);

        // Valida si la página es igual a 1 y si el número de páginas es mayor a 1. 
        if (curPage === 1 && numPages > 1) {
            console.log("paginationView.js->Entra condicion (curPage === 1 && numPages > 1)");
            return `

            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
        // Valida si curPage es igual al número depáginas, es > 1
        if (curPage === numPages && numPages > 1) {
            console.log("paginationView.js->Entra condicion (curPage === numPages && numPages > 1)");
            return `
                    <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                        <span>Page${curPage - 1}</span>
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                    </button>
            `;
        }

        // Estando en cualquier página diferente a la página 1 y diferente a la ultima página. 
        if (curPage < numPages && curPage !== 1)
        {
            return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <span>Page${curPage - 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
            </button>

            `;
        }

        // Estando en la página 1 y no existen más páginas. 
        if (curPage === 1 && numPages === 1)
        return '';
    }

}

export default new paginationView();