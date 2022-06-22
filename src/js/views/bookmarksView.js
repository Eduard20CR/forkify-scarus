import View from './View';
import previewView from './previewView';
import icons from 'url:./../../img/icons.svg';

class BookmarksView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.bookmarks__list');
    this._data;
    this._errorMessage = 'You dont have any bookmarked recipe! 😉';
    this._message = 'You dont have any bookmarked recipe! 😁';
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(recipe => {
        return previewView.render(recipe, false);
      })
      .join('');
  }
}

export default new BookmarksView();
