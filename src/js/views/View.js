import icons from 'url:./../../img/icons.svg';
export default class View {
  constructor() {
    this._data;
  }

  render(recipeData, render = true) {
    if (!recipeData || (Array.isArray(recipeData) && recipeData.length === 0))
      return this.renderError();

    this._data = recipeData;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(recipeData) {
    this._data = recipeData;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const [...newElements] = newDom.querySelectorAll('*');
    const [...actualElements] = this._parentElement.querySelectorAll('*');
    newElements.forEach((newEl, i) => {
      // UPDATE CHANGED TEXT
      const currentEl = actualElements[i];
      if (
        !currentEl.isEqualNode(newEl) &&
        currentEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }

      // UPDATE CHANGED ATTRIBUTES
      if (!currentEl.isEqualNode(newEl)) {
        [...newEl.attributes].forEach(att => {
          currentEl.setAttribute(att.name, att.value);
        });
      }
    });
  }

  renderSpiner() {
    const markUp = `
       <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
            </div>
            `;
    this._clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(errorMessage = this._errorMessage) {
    this._clearParent();
    const markup = `
     <div class="error">
       <div>
           <svg>
             <use href="${icons}#icon-alert-triangle"></use>
           </svg>
         </div>
         <p>${errorMessage}</p>
       </div>
     `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    this._clearParent();
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
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clearParent() {
    this._parentElement.innerHTML = '';
  }
}
