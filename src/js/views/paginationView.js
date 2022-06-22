import icons from 'url:./../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.pagination');
  }

  _generateMarkup() {
    const pageNumber = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // PAGE 1 --- MORE PAGES
    if (this._data.pageNumber === 1 && pageNumber > 1) {
      return `
          <button class="btn--inline pagination__btn--next" data-goto="${
            this._data.pageNumber + 1
          }">
               <span>Page ${this._data.pageNumber + 1}</span>
               <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
               </svg>
          </button>
      `;
    }

    // PAGE FINAL
    if (this._data.pageNumber === pageNumber && pageNumber > 1) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        this._data.pageNumber - 1
      }">
           <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
           </svg>
           <span>Page ${this._data.pageNumber - 1}</span>
      </button>
  `;
    }

    // MIDEL PAGE
    if (this._data.pageNumber > 1 && this._data.pageNumber < pageNumber) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        this._data.pageNumber - 1
      }">
           <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
           </svg>
           <span>Page ${this._data.pageNumber - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next" data-goto="${
        this._data.pageNumber + 1
      }">
           <span>Page ${this._data.pageNumber + 1}</span>
           <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
           </svg>
      </button>
  `;
    }

    // PAGE 1 --- NO MORE PAGES
    if (pageNumber === 1) {
      return ``;
    }
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      if (e.target.classList.contains('pagination')) return;

      const clickedButton = Number(
        e.target.closest('.btn--inline').dataset.goto
      );
      handler(clickedButton);
    });
  }
}

export default new PaginationView();
