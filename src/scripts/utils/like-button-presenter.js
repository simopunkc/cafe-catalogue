import { createLikeCafeButtonTemplate, createUnlikeCafeButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteCafes: FavoriteCafeIdb, cafe }) {
    this._likeButtonContainer = likeButtonContainer;
    this._cafe = cafe;
    this._favoritecafes = FavoriteCafeIdb;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._cafe;

    if (await this._isKafeExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isKafeExist(id) {
    const cafe = await this._favoritecafes.getCafe(id);
    return !!cafe;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeCafeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoritecafes.putCafe(this._cafe);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeCafeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoritecafes.deleteCafe(this._cafe.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
