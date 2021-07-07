import CONFIG from '../../globals/config';

const createSkeletonThumbnail = () => `
  <div class="col-4">
    <div class="ph-item">
      <div class="ph-col-12">
        <div class="ph-picture"></div>
        <div class="ph-row">
          <div class="ph-col-6 big"></div>
          <div class="ph-col-4 empty big"></div>
          <div class="ph-col-12"></div>
          <div class="ph-col-12"></div>
        </div>
      </div>
    </div>
  </div>
`;

const createHeroTemplate = () => `
  <div class="hero">
    <picture>
      <source data-srcset="./images-responsif/hero-image_2-small.webp" type="image/webp" media="(max-width: 600px)">
      <source data-srcset="./images-responsif/hero-image_2-large.webp" type="image/webp" media="(min-width: 600px) and (max-width: 1200px)">
      <source data-srcset="./images/hero-image_2.webp" type="image/webp" media="(min-width: 1200px)">
      <source data-srcset="./images-responsif/hero-image_2-small.jpg" type="image/jpeg" media="(max-width: 600px)">
      <source data-srcset="./images-responsif/hero-image_2-large.jpg" type="image/jpeg" media="(min-width: 600px) and (max-width: 1200px)">
      <source data-srcset="./images/hero-image_2.jpg" type="image/jpeg" media="(min-width: 1200px)">
      <img tabindex="0" class="lazyload" data-src='./images/hero-image_2.jpg' alt="Gambar hero restaurant" width="100%" height="100%" src="./placeholder.png"></img>
    </picture>
    <div class="bungkus2">
      <h1 tabindex="0" class="hero-title">Kunjungi restoran dengan suasana kesukaanmu</h1>
      <p tabindex="0" class="hero-tagline">Segera pesan makanan, minuman, dan cemilan yang kamu suka di restoran favoritmu.<br/>Jangan sampai kehabisan stok ya :)</p>
    </div>
  </div>
`;

const createKafeDetailTemplate = (cafe) => `
  <h2 tabindex="0" class="cafe__title">${cafe.name}</h2>
  <picture>
    <source data-srcset="${cafe.pictureId ? CONFIG.BASE_IMAGE_URL + CONFIG.IMAGE_S + cafe.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" media="(max-width: 600px)">
    <source data-srcset="${cafe.pictureId ? CONFIG.BASE_IMAGE_URL + CONFIG.IMAGE_M + cafe.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" media="(min-width: 600px) and (max-width: 1200px)">
    <source data-srcset="${cafe.pictureId ? CONFIG.BASE_IMAGE_URL + CONFIG.IMAGE_L + cafe.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" media="(min-width: 1200px)">
    <img tabindex="0" class="cafe__poster lazyload" width="100%" height="100%" src="./placeholder.png" alt="${cafe.name}"
  data-src="${cafe.pictureId ? CONFIG.BASE_IMAGE_URL + CONFIG.IMAGE_M + cafe.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
  </picture>
  <div class="cafe__info">
  <h3 tabindex="0">Informasi</h3>
    <p tabindex="0">Kota: ${cafe.city}</p>
    <p tabindex="0">Rating: ${cafe.rating}</p>
    <p tabindex="0">Kategori: ${cafe.categories.map((kategori) => `${kategori.name}`).join(', ')}</p>
    <p tabindex="0">Alamat: ${cafe.address}</p>
  </div>
  <div class="cafe__overview">
    <h3 tabindex="0">Deskripsi</h3>
    <p tabindex="0">${cafe.description}</p><br/>
    <h3 tabindex="0">Daftar Menu</h3>
    <p tabindex="0">Makanan: <i>${cafe.menus.foods.map((food) => `${food.name}`).join(', ')}</i></p>
    <p tabindex="0">Minuman: <i>${cafe.menus.drinks.map((drink) => `${drink.name}`).join(', ')}</i></p>
  </div>
  <div id="likeButtonContainer"></div>
  <h3 tabindex="0"><div id="jumlah_review" class="inline-block">${cafe.customerReviews.length}</div> review dari netizen</h3>
  <div id="daftarReview"></div>
  <div id="reviewContainer"></div>
`;

const createCafeItemTemplate = (cafe) => `
  <div class="cafe-item">
    <div class="cafe-item__header">
        <picture>
          <source data-srcset="${cafe.pictureId ? CONFIG.BASE_IMAGE_URL + CONFIG.IMAGE_S + cafe.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" media="(max-width: 1200px)">
          <source data-srcset="${cafe.pictureId ? CONFIG.BASE_IMAGE_URL + CONFIG.IMAGE_M + cafe.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" media="(min-width: 1200px) and (max-width: 2560px)">
          <source data-srcset="${cafe.pictureId ? CONFIG.BASE_IMAGE_URL + CONFIG.IMAGE_L + cafe.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" media="(min-width: 2560px)">
          <img tabindex="0" class="cafe-item__header__poster lazyload" width="100%" height="100%" src="./placeholder.png" alt="${cafe.name || '-'}"
            data-src="${cafe.pictureId ? CONFIG.BASE_IMAGE_URL + CONFIG.IMAGE_S + cafe.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
        </picture>
        <div class="cafe-item__header__rating">
            <p tabindex="0">⭐️<span class="cafe-item__header__rating__score">${cafe.rating || '-'}</span></p>
        </div>
    </div>
    <div class="cafe-item__content">
        <h3 class="cafe__title" tabindex="0"><a href="${`/#/detail/${cafe.id}`}">${cafe.name || '-'}</a></h3>
        <p tabindex="0" class="city">Kota: ${cafe.city || '-'}</p>
        <p tabindex="0">${cafe.description || '-'}</p>
    </div>
  </div>
  `;

const createLikeCafeButtonTemplate = () => `
  <button tabindex="0" aria-label="suka dengan restoran ini" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeCafeButtonTemplate = () => `
  <button tabindex="0" aria-label="tidak suka dengan restoran ini" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createReviewItemTemplate = (review) => `
<div class="review-item">
  <div class="review-item__header">
    <b tabindex="0">${review.name}</b>
    <span tabindex="0" class="cafe-item__header__rating__score">${review.date}</span>
  </div>
  <div class="review-item__content">
    <p tabindex="0">${review.review}</p>
  </div>
</div>
`;

const createFormReviewTemplate = (id) => `
<div id="statusPengiriman"></div><br/>
<h4 tabindex="0">Tambah Review</h4>
<input tabindex="0" id="data-id" type="hidden" name="unik" value="${id}">
<input tabindex="0" id="data-nama" type="text" placeholder="Masukkan nama" name="nama">
<textarea tabindex="0" id="data-isi" name="review" placeholder="Tulis review"></textarea>
<button tabindex="0" aria-label="Kirim review baru" id="submitReview" type="submit" name="kirim">Kirim</button>
`;

const createNoReviewTemplate = () => `
<p tabindex="0">Belum ada review</p>
`;

const createFormSearchTemplate = () => `
<input tabindex="0" id="data-keyword" type="text" name="keyword" placeholder="Masukkan kata kunci">
<button tabindex="0" aria-label="Submit kata kunci pencarian cafe" id="submitSearch" type="submit" name="cari">Cari</button>
`;

const createNoSearchTemplate = () => `
<p tabindex="0">Kafe yang dicari tidak ditemukan</p>
`;

const createLoader = () => `
<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
`;

export {
  createSkeletonThumbnail,
  createHeroTemplate,
  createCafeItemTemplate,
  createKafeDetailTemplate,
  createLikeCafeButtonTemplate,
  createUnlikeCafeButtonTemplate,
  createReviewItemTemplate,
  createFormReviewTemplate,
  createNoReviewTemplate,
  createFormSearchTemplate,
  createNoSearchTemplate,
  createLoader,
};
