class FavoriteCafeShowPresenter {
  constructor({ view, favoriteCafes }) {
    this._view = view;
    this._favoriteCafes = favoriteCafes;

    this._showFavoriteCafes();
  }

  async _showFavoriteCafes() {
    const cafes = await this._favoriteCafes.getAllCafes();
    this._displayCafes(cafes);
  }

  _displayCafes(cafes = []) {
    this._view.showFavoriteCafes(cafes);
  }
}

export default FavoriteCafeShowPresenter;
