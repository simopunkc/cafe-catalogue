import FavoriteCafeIdb from '../../data/favorite-cafe-idb';
import FavoriteCafeSearchView from './liked-cafe/favorite-cafe-search-view';
import FavoriteCafeShowPresenter from './liked-cafe/favorite-cafe-show-presenter';
import FavoriteCafeSearchPresenter from './liked-cafe/favorite-cafe-search-presenter';

const view = new FavoriteCafeSearchView();

const Suka = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteCafeShowPresenter({ view, favoriteCafes: FavoriteCafeIdb });
    new FavoriteCafeSearchPresenter({ view, favoriteCafes: FavoriteCafeIdb });
  },
};

export default Suka;
