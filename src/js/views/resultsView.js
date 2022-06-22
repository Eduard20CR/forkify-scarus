import View from './View';
import previewView from './previewView';
import icons from 'url:./../../img/icons.svg';

class ResultsView extends View {
  constructor() {
    super();
    this._parentElement = document.querySelector('.results');
    this._data;
    this._errorMessage =
      'No recipes found with that word! Please try another! 😉';
    this._message =
      'Start by searching for a recipe or an ingredient. Have fun!';
  }

  _generateMarkup() {
    return this._data
      .map(recipe => {
        return previewView.render(recipe, false);
      })
      .join('');
  }
}

export default new ResultsView();
