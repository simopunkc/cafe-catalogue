import TheKafeDbSource from '../../data/thecafedb-source';
import { createSkeletonThumbnail, createCafeItemTemplate, createLoader } from '../templates/template-creator';
import HeroInitiator from '../../utils/hero-initiator';

const DaftarList = {
  async render() {
    return `
      <div id="heros"></div>
      <div class="content">
        <h2 tabindex="0" tabindex="0" class="content__heading">Daftar cafe terbaik</h2>
        <div id="cafes" class="cafes hidden-tab"></div>
        <div id="skeleton"></div>
      </div>
    `;
  },

  async afterRender() {
    let timer;
    HeroInitiator.init({
      heroContainer: document.querySelector('#heros'),
    });
    const cafesContainer = document.querySelector('#cafes');
    const skeletonContainer = document.querySelector('#skeleton');
    cafesContainer.innerHTML = createLoader();
    skeletonContainer.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      skeletonContainer.innerHTML += createSkeletonThumbnail();
    }
    const cafes = await TheKafeDbSource.daftarRestoran();
    if (cafes !== '{}') {
      cafesContainer.innerHTML = '';
      cafes.forEach((cafe) => {
        cafesContainer.innerHTML += createCafeItemTemplate(cafe);
      });
    } else {
      cafesContainer.innerHTML = 'gagal ambil data';
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      cafesContainer.classList.remove('hidden-tab');
      skeletonContainer.innerHTML = '';
    }, 2000);
  },
};

export default DaftarList;
