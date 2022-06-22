import View from './View';

class AddRecipeView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.upload');
    this._overlay = document.querySelector('.overlay');

    this._window = document.querySelector('.add-recipe-window');
    this._btnOpenModal = document.querySelector('.nav__btn--add-recipe');
    this._btnCloseModal = document.querySelector('.btn--close-modal');
    this._btnSubmit = document.querySelector('.upload__btn');
    this._addHandlerShowWinndow();
    //     this._addHandlerSubmitForm();
  }

  _addHandlerShowWinndow() {
    [this._btnCloseModal, this._btnOpenModal, this._overlay].forEach(el =>
      el.addEventListener('click', this.toggleOverlay.bind(this))
    );
  }

  addHandlerSubmitForm(handler) {
    [this._parentElement].forEach(el =>
      el.addEventListener('submit', function (e) {
        e.preventDefault();
        const formDataArray = [...new FormData(this)];
        const formData = Object.fromEntries(formDataArray);
        handler(formData);
      })
    );
  }

  toggleOverlay() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
