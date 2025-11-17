const icons = new URL('../../img/icons.svg', import.meta.url).href; // 

export default class View {
    _data;

    _clear() {
        this._parentEl.innerHTML = '';
    }
    render(data) {

        if (!data || (Array.isArray(data) && data.length === 0) )
        {
          console.log("View.js-> entra a renderError");
            return this.renderError();
        }
          

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        console.log("View.js-> Salir de funcion  render");
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
       // 
    }


    // Función para renderizar el spinner Av1_23
    renderSpinner() {
        console.log("Views.js-> iniciando renderSpinner");
        const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  console.log("Views.js-> iniciando renderSpinner-> _parentEl.valor=",this._parentEl);
         this._parentEl.innerHTML = ''; // 23c. Limpiar el contenido previo
        this._parentEl.insertAdjacentHTML('afterbegin', markup); // 23b. Insertar el spinner
    }

    renderError(message = this._errorMessage) {
      console.log ("View.js-> entro a renderError");
        const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
        return markup;
    }


    renderMessage(message = this._message) {
        const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }
}

