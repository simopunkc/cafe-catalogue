class FavoriteCafeSearchPresenter {
  constructor({ favoriteCafes, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteCafes = favoriteCafes;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchCafes(latestQuery);
    });
  }

  async _searchCafes(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundCafes;
    if (this._latestQuery.length > 0) {
      foundCafes = await this._favoriteCafes.searchCafes(this._latestQuery);
    } else {
      foundCafes = await this._favoriteCafes.getAllCafes();
    }

    this._showFoundCafes(foundCafes);
  }

  async _showFoundCafes(cafes = []) {
    this._view.showFavoriteCafes(cafes);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteCafeSearchPresenter;
