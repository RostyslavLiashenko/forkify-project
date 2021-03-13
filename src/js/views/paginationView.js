import View from './View.js';
import icons from '../../img/icons.svg';
import { state } from '../module.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage)
    })
  }

  refactorMarkup(currPage, sign) {
    const arrow = sign === `next` ? `right` : `left`;
    const result = sign === `next` ? ++currPage : --currPage;
    return `
      <button data-goto="${result}" class="btn--inline pagination__btn--${sign}">
        ${arrow === `right` ? `<span>Page ${result}</span>` : ''}
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${arrow}"></use>
        </svg>
        ${arrow === `right` ? `` : `<span>Page ${result}</span>`}
      </button>
    `
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
  // Page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this.refactorMarkup(currPage, `next`);
    }
  // Last page
    if (currPage === numPages && numPages > 1) {
      return this.refactorMarkup(currPage, `prev`)
    }
  // Other pages
    if (currPage < numPages) {
      const firstBlock = this.refactorMarkup(currPage, `prev`);
      const secondBlock = this.refactorMarkup(currPage, `next`);
      return firstBlock + secondBlock
    }
  // Page 1 and there are No other page
    return ``
  }
}
export default new PaginationView();
