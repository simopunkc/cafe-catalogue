import FavoriteCafeSearchPresenter from '../src/scripts/views/pages/liked-cafe/favorite-cafe-search-presenter';
import FavoriteCafeIdb from '../src/scripts/data/favorite-cafe-idb';
import FavoriteCafeSearchView from '../src/scripts/views/pages/liked-cafe/favorite-cafe-search-view';

let presenter;
let favoriteCafes;
let view;

const searchCafes = (query) => {
  const queryElement = document.getElementById('query');
  queryElement.value = query;
  queryElement.dispatchEvent(new Event('change'));
};

const setCafeSearchContainer = () => {
  view = new FavoriteCafeSearchView();
  document.body.innerHTML = view.getTemplate();
};

const constructPresenter = () => {
  favoriteCafes = spyOnAllFunctions(FavoriteCafeIdb);
  presenter = new FavoriteCafeSearchPresenter({
    favoriteCafes,
    view,
  });
};

describe('Searching cafes', () => {
  beforeEach(() => {
    setCafeSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchCafes('cafe a');

      expect(presenter.latestQuery).toEqual('cafe a');
    });

    it('should ask the model to search for liked cafes', () => {
      searchCafes('cafe a');

      expect(favoriteCafes.searchCafes)
        .toHaveBeenCalledWith('cafe a');
    });

    it('should show the found cafes', () => {
      presenter._showFoundCafes([{ id: 1 }]);

      expect(document.querySelectorAll('.cafe-item').length)
        .toEqual(1);

      presenter._showFoundCafes(
        [{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }],
      );

      expect(document.querySelectorAll('.cafe-item').length)
        .toEqual(2);
    });

    it('should show the name of the found cafes', () => {
      presenter._showFoundCafes([{ id: 1, name: 'Satu' }]);
      expect(document.querySelectorAll('.cafe__title').item(0).textContent)
        .toEqual('Satu');
    });

    it('should show - when the cafe returned does not contain a name', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated', () => {
        const cafeTitles = document.querySelectorAll('.cafe__title');
        expect(cafeTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteCafes.searchCafes.withArgs('cafe a').and.returnValues([
        { id: 444 },
      ]);

      searchCafes('cafe a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchCafes(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchCafes('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchCafes('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchCafes('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite cafes', () => {
      searchCafes('    ');

      expect(favoriteCafes.getAllCafes)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite cafes could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated', () => {
        expect(document.querySelectorAll('.cafe-item__not__found').length).toEqual(1);
        done();
      });

      favoriteCafes.searchCafes.withArgs('cafe a').and.returnValues([]);

      searchCafes('cafe a');
    });

    it('should not show any cafe', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated', () => {
        expect(document.querySelectorAll('.cafe-item').length).toEqual(0);
        done();
      });

      favoriteCafes.searchCafes.withArgs('cafe a').and.returnValues([]);

      searchCafes('cafe a');
    });
  });
});
