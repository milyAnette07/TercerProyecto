class SearchView {
    #parentEl = document.querySelector('.search');
    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput(); // Limpia el campo después de obtener el valor
        return query;
    }
    #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler){
    this.#parentEl.addEventListener('submit',function(e){
        e.preventDefault();
        handler();
    });
  }
}
export default new SearchView();