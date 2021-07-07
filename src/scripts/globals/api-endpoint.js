import CONFIG from './config';

const API_ENDPOINT = {
  DAFTAR_RESTORAN: `${CONFIG.BASE_URL}list`,
  CARI: (query) => `${CONFIG.BASE_URL}search?q=${query}`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  REVIEW: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
