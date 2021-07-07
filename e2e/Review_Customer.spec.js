const assert = require('assert');

Feature('Review Customer');

Scenario('add customer review', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.cafe__title a');

  const firstFilm = locate('.cafe__title a').first();
  I.click(firstFilm);

  I.seeElement('#data-nama');
  I.seeElement('#data-isi');
  const tombolSubmit = locate('#submitReview');

  const userReview = 'pebolang';
  const addReview = 'terserah dah';

  I.fillField('#data-nama', userReview);
  I.fillField('#data-isi', addReview);
  I.click(tombolSubmit);

  locate('.review-item__header b').withText(userReview);
  locate('.review-item__content p').withText(addReview);
});
