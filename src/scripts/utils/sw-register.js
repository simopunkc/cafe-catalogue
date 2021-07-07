const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Pendaftaran ServiceWorker berhasil');
      }).catch(() => {
        console.log('Pendaftaran ServiceWorker gagal');
      });
    });
  } else {
    console.log('Service worker tidak didukung browser ini.');
  }
};

export default swRegister;
