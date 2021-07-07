import { createCafeItemTemplate } from '../../templates/template-creator';

class FavoriteCafeSearchView {
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text" placeholder="Masukkan nama cafe yang ingin dicari">
        <br/><h2 class="content__heading">Daftar cafe yang Anda sukai</h2><br/>
        <div id="cafes" class="cafes"></div>
      </div>
   `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showCafes(cafes) {
    this.showFavoriteCafes(cafes);
  }

  showFavoriteCafes(cafes = []) {
    let html;
    if (cafes.length) {
      html = cafes.reduce((carry, cafe) => carry.concat(createCafeItemTemplate(cafe)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }
    document.getElementById('cafes').innerHTML = html;

    document.getElementById('cafes').dispatchEvent(new Event('cafes:updated'));
  }

  _getEmptyMovieTemplate() {
    return '<div class="cafe-item__not__found">Tidak ada cafe untuk ditampilkan</div>';
  }
}

export default FavoriteCafeSearchView;
