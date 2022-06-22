// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// IMPORTS PROJECT FILES
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';

// IMPORTS LIBRARY
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner
    recipeView.renderSpiner();

    // update searchs
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // Fetch recipe
    await model.loadRecipe(id);

    // Render recipe

    recipeView.render(model.state.recipe);
  } catch (error) {
    // console.error(error);
    recipeView.renderError();
    console.log(error);
  }
};

const controlSearchresults = async function () {
  try {
    // 1) Get search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);
    searchView.clearInput();

    // 3) Render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (pageNum) {
  resultsView.render(model.getSearchResultsPage(pageNum));

  // render pagination buttons
  paginationView.render(model.state.search);
};

const controlService = function (newServingsValue) {
  // Update servings data
  model.updateServings(newServingsValue);
  // Update View
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarks) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpiner();

    await model.uploadRecipe(newRecipe);

    await recipeView.render(model.state.recipe);

    addRecipeView.toggleOverlay();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (error) {
    addRecipeView.renderError(error);
  }
};

// init
const init = function () {
  bookmarksView.addHandlerRender(controBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchresults);

  paginationView.addHandlerClick(controlPagination);

  recipeView.addHandlerServings(controlService);

  addRecipeView.addHandlerSubmitForm(controlAddRecipe);
  console.log('hell');
};
init();
