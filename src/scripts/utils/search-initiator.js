import TheKafeDbSource from '../data/thecafedb-source';
import {
  createSkeletonThumbnail,
  createCafeItemTemplate,
  createFormSearchTemplate,
  createNoSearchTemplate,
  createLoader,
} from '../views/templates/template-creator';

const SearchInitiator = {
  async init({
    link, formSeach, searchContainer, skeletonContainer,
  }) {
    this._link = link;
    this._formSeach = formSeach;
    this._searchContainer = searchContainer;
    this._skeletonContainer = skeletonContainer;

    await this._renderDaftarSearch();
    await this._delayLoad();
  },

  async _delayLoad() {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this._formSeach.classList.remove('hidden-tab');
      this._searchContainer.classList.remove('hidden-tab');
      this._skeletonContainer.innerHTML = '';
    }, 1000);
  },

  async _renderDaftarSearch() {
    if (this._link.query) {
      this._skeletonContainer.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        this._skeletonContainer.innerHTML += createSkeletonThumbnail();
      }

      const cafes = await TheKafeDbSource.searchKafe(this._link.query);
      if (cafes !== '{}') {
        this._searchContainer.innerHTML = '';
        if (cafes.founded) {
          cafes.restaurants.forEach((cafe) => {
            this._searchContainer.innerHTML += createCafeItemTemplate(cafe);
          });
        } else {
          this._renderNotExist();
        }
      } else {
        this._searchContainer.innerHTML = 'gagal ambil data';
      }
    }
    this._renderFormSearch();
  },

  _renderFormSearch() {
    this._formSeach.innerHTML = createFormSearchTemplate();
    this._renderSearchButton();
  },

  async _renderSearchButton() {
    const searchButton = document.querySelector('#submitSearch');
    searchButton.addEventListener('click', async () => {
      const keySearch = document.querySelector('#data-keyword').value;

      this._skeletonContainer.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        this._skeletonContainer.innerHTML += createSkeletonThumbnail();
      }

      this._searchContainer.innerHTML = createLoader();
      const newSearch = await TheKafeDbSource.searchKafe(keySearch);
      if (newSearch !== '{}') {
        if (newSearch.founded) {
          this._searchContainer.innerHTML = '';
          newSearch.restaurants.forEach((search) => {
            this._searchContainer.innerHTML += createCafeItemTemplate(search);
          });
        } else {
          this._renderNotExist();
        }
      } else {
        this._searchContainer.innerHTML = 'gagal ambil data';
      }

      this._renderFormSearch();
    });
  },

  _renderNotExist() {
    this._searchContainer.innerHTML = createNoSearchTemplate();
  },
};

export default SearchInitiator;
