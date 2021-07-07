import FavoriteCafeSearchView from '../src/scripts/views/pages/liked-cafe/favorite-cafe-search-view';
import FavoriteCafeIdb from '../src/scripts/data/favorite-cafe-idb';
import FavoriteCafeShowPresenter from '../src/scripts/views/pages/liked-cafe/favorite-cafe-show-presenter';

describe('Showing all favorite cafes', () => {
  let view;
  const renderTemplate = () => {
    view = new FavoriteCafeSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no cafes have been liked', () => {
    it('should ask for the favorite cafes', () => {
      const favoriteCafes = spyOnAllFunctions(FavoriteCafeIdb);

      new FavoriteCafeShowPresenter({
        view,
        favoriteCafes,
      });

      expect(favoriteCafes.getAllCafes).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no cafes have been liked', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated', () => {
        expect(document.querySelectorAll('.cafe-item__not__found').length)
          .toEqual(1);

        done();
      });

      const favoriteCafes = spyOnAllFunctions(FavoriteCafeIdb);
      favoriteCafes.getAllCafes.and.returnValues([]);

      new FavoriteCafeShowPresenter({
        view,
        favoriteCafes,
      });
    });
  });

  describe('When favorite cafes exist', () => {
    it('should show the cafes', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated', () => {
        expect(document.querySelectorAll('.cafe-item').length).toEqual(2);
        done();
      });

      const favoriteCafes = spyOnAllFunctions(FavoriteCafeIdb);
      favoriteCafes.getAllCafes.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, description: 'Sebuah cafe A',
        },
        {
          id: 22, name: 'B', rating: 4, description: 'Sebuah cafe B',
        },
      ]);

      new FavoriteCafeShowPresenter({
        view,
        favoriteCafes,
      });
    });
  });
});
