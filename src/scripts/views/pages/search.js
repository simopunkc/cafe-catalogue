import UrlParser from '../../routes/url-parser';
import SearchInitiator from '../../utils/search-initiator';

const Pencarian = {
  async render() {
    return `
    <div class="content">
        <h2 tabindex="0" class="content__heading">Pencarian Restoran</h2>
        <div id="formSearch" class="hidden-tab"></div>
        <div id="cafes" class="cafes hidden-tab"></div>
        <div id="skeleton"></div>
    </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const formContainer = document.querySelector('#formSearch');
    const cafesContainer = document.querySelector('#cafes');
    const skeleton = document.querySelector('#skeleton');
    skeleton.innerHTML = '';
    cafesContainer.innerHTML = '';

    SearchInitiator.init({
      link: url,
      formSeach: formContainer,
      searchContainer: cafesContainer,
      skeletonContainer: skeleton,
    });
  },
};

export default Pencarian;
