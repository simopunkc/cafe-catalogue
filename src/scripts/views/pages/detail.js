import UrlParser from '../../routes/url-parser';
import TheKafeDbSource from '../../data/thecafedb-source';
import { createSkeletonThumbnail, createKafeDetailTemplate, createLoader } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteCafeIdb from '../../data/favorite-cafe-idb';
import ReviewInitiator from '../../utils/review-initiator';

const Detail = {
  async render() {
    return `
      <div id="cafe" class="cafe hidden-tab"></div>
      <div id="skeleton"></div>
    `;
  },

  async afterRender() {
    let timer;
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const cafeContainer = document.querySelector('#cafe');
    const skeletonContainer = document.querySelector('#skeleton');
    cafeContainer.innerHTML = createLoader();
    skeletonContainer.innerHTML = createSkeletonThumbnail();
    const cafe = await TheKafeDbSource.detailKafe(url.id);
    if (cafe !== '{}') {
      cafeContainer.innerHTML = createKafeDetailTemplate(cafe);
    } else {
      cafeContainer.innerHTML = 'gagal ambil data';
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      cafeContainer.classList.remove('hidden-tab');
      skeletonContainer.innerHTML = '';
    }, 1000);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteCafes: FavoriteCafeIdb,
      cafe: {
        id: cafe.id,
        name: cafe.name,
        description: cafe.description,
        pictureId: cafe.pictureId,
        rating: cafe.rating,
        city: cafe.city,
      },
    });

    ReviewInitiator.init({
      reviewContainer: document.querySelector('#daftarReview'),
      json: cafe,
    });
  },
};

export default Detail;
