import * as model from './module.js';
import recipeViews from '../js/views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import ResultView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
// if (model.hot) {
//   model.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeViews.renderSpinner();
    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // 2) Loading recipe
    await model.recipeRender(id);
    // 3) Rendering recipe
    recipeViews.render(model.state.recipe);
  } catch (err) {
    recipeViews.renderError(err);
    console.log(err);
  }
};

const controlSearchResults = async function() {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    ResultView.renderSpinner();
    // 2) Load search results
    await model.loadSearchResult(query);
    // 3) Render results
    ResultView.render(model.getSearchResultsPage());
    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
}
const controlPagination = function(goToPage) {
  // 3) Render NEW results
  ResultView.render(model.getSearchResultsPage(goToPage));
  // 4) Render NEW initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update servings recipe (in a state)
  model.updateServings(newServings);
  // Update view
  recipeViews.update(model.state.recipe)
}

const controlAddBookmark = function() {
  // Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id)
  // Update recipe view
  recipeViews.update(model.state.recipe);
  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = function(newRecipe) {
  console.log(newRecipe);
}

// Publisher-subscriber pattern
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeViews.addHandlerRender(controlRecipes);
  recipeViews.addHandlerAddBookmark(controlAddBookmark);
  recipeViews.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();

const clearBookmarks = function() {
  localStorage.clear('bookmarks');
}
// clearBookmarks();



