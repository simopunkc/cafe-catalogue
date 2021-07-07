import { itActsAsFavoriteCafeModel } from './contract/favoriteCafeContract';

let favoriteCafes = [];

const FavoriteCafeArray = {
  getCafe(id) {
    if (!id) {
      return;
    }

    return favoriteCafes.find((cafe) => cafe.id === id);
  },

  getAllCafes() {
    return favoriteCafes;
  },

  putCafe(cafe) {
    if (!cafe.hasOwnProperty('id')) {
      return;
    }

    if (this.getCafe(cafe.id)) {
      return;
    }

    favoriteCafes.push(cafe);
  },

  deleteCafe(id) {
    favoriteCafes = favoriteCafes.filter((cafe) => cafe.id !== id);
  },

  searchCafes(query) {
    return this.getAllCafes()
      .filter((cafe) => {
        const loweredCaseCafeTitle = (cafe.name || '-').toLowerCase();
        const jammedCafeTitle = loweredCaseCafeTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedCafeTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Cafe Array Contract Test Implementation', () => {
  afterEach(() => favoriteCafes = []);

  itActsAsFavoriteCafeModel(FavoriteCafeArray);
});
