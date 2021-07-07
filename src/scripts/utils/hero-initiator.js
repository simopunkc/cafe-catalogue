import { createHeroTemplate } from '../views/templates/template-creator';

const HeroInitiator = {
  async init({ heroContainer }) {
    this._heroContainer = heroContainer;

    await this._renderHero();
  },

  async _renderHero() {
    this._heroContainer.innerHTML = createHeroTemplate();
  },
};

export default HeroInitiator;
