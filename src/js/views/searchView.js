class SearchView {
  constructor() {
    this._parentElement = document.querySelector('.search');
  }
  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  clearInput() {
    return (this._parentElement.querySelector('.search__field').value = '');
  }
}

export default new SearchView();
