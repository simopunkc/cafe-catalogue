import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class TheKafeDbSource {
  static async daftarRestoran() {
    let hasil;
    try {
      const response = await fetch(API_ENDPOINT.DAFTAR_RESTORAN);
      if (response.ok) {
        const responseJson = await response.json();
        hasil = responseJson.restaurants;
      } else {
        hasil = '{}';
      }
    } catch {
      hasil = '{}';
    }
    return hasil;
  }

  static async detailKafe(id) {
    let hasil;
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (response.ok) {
        const responseJson = await response.json();
        hasil = responseJson.restaurant;
      } else {
        hasil = '{}';
      }
    } catch {
      hasil = '{}';
    }
    return hasil;
  }

  static async searchKafe(query) {
    let hasil;
    try {
      const response = await fetch(API_ENDPOINT.CARI(query));
      if (response.ok) {
        hasil = await response.json();
      } else {
        hasil = '{}';
      }
    } catch {
      hasil = '{}';
    }
    return hasil;
  }

  static async addReviewKafe({ unik, nama, isi }) {
    let hasil;
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': CONFIG.KEY,
        },
        body: JSON.stringify({
          id: unik,
          name: nama,
          review: isi,
        }),
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      if (response.ok) {
        const responseJson = await response.json();
        hasil = responseJson.customerReviews;
      } else {
        hasil = '{}';
      }
    } catch {
      hasil = '{}';
    }
    return hasil;
  }
}

export default TheKafeDbSource;
