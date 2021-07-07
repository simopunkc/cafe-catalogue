import TheKafeDbSource from '../data/thecafedb-source';
import { createReviewItemTemplate, createFormReviewTemplate, createNoReviewTemplate } from '../views/templates/template-creator';

const ReviewInitiator = {
  async init({ reviewContainer, json }) {
    this._reviewContainer = reviewContainer;
    this._cafe = json;

    await this._renderDaftarReview();
  },

  async _renderDaftarReview() {
    const { id, customerReviews } = this._cafe;

    if (customerReviews.length) {
      this._reviewContainer.innerHTML = '';
      customerReviews.forEach((reviewer) => {
        this._reviewContainer.innerHTML += createReviewItemTemplate(reviewer);
      });
    } else {
      this._renderNotExist();
    }
    this._renderFormReview(id);
  },

  _renderFormReview(id) {
    const reviewElement = document.querySelector('#reviewContainer');
    reviewElement.innerHTML = createFormReviewTemplate(id);
    this._renderReviewButton(id);
  },

  async _renderReviewButton(id) {
    const reviewButton = document.querySelector('#submitReview');
    const statusKirim = document.querySelector('#statusPengiriman');
    reviewButton.addEventListener('click', async () => {
      const idReview = document.querySelector('#data-id').value;
      const namaReview = document.querySelector('#data-nama').value;
      const isiReview = document.querySelector('#data-isi').value;
      statusKirim.innerHTML = 'sedang mengrim data';
      const newReview = await TheKafeDbSource.addReviewKafe({
        unik: idReview,
        nama: namaReview,
        isi: isiReview,
      });
      if (newReview !== '{}') {
        this._reviewContainer.innerHTML = '';
        newReview.forEach((reviewer) => {
          this._reviewContainer.innerHTML += createReviewItemTemplate(reviewer);
        });
        this._renderFormReview(id);
      } else {
        statusKirim.innerHTML = 'gagal mengirim data';
      }
    });
  },

  _renderNotExist() {
    this._reviewContainer.innerHTML = createNoReviewTemplate();
  },
};

export default ReviewInitiator;
