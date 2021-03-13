import icons from '../../img/icons.svg';

export default class View {
  _data;

    /**
     * @param { Object | Object[] } data The data to be rendered
     * @param { boolean } [render=true] If it's false then create markup, or instead render to the DOM
     * @returns {undefined | string*} A markup string is returned if it's render=false
     * @this { Object } View instance
     * @offer Jonas Schmedtmann
     * @todo Finish implementation
   */
  render(data, render = true) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    const markUp = this._generateMarkup();
    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
      }
    })
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markUp = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(message = this._errorMessage) {
    this._clear();
    const markUp = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._message) {
    this._clear();
    const markUp = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}