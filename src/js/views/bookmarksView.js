import View from './View.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmarks it`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data.map(bookmarks => previewView.render(bookmarks, false)).join('');
  }
}

export default new bookmarksView();