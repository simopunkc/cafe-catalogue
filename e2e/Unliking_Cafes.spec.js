const assert = require('assert');

Feature('Unliking Cafes');

Scenario('unliking one cafe', async ({ I }) => {
  I.amOnPage('/#/suka');
  I.see('Tidak ada cafe untuk ditampilkan', '.cafe-item__not__found');

  I.amOnPage('/');

  I.seeElement('.cafe__title a');

  const firstFilm = locate('.cafe__title a').first();
  const firstFilmTitle = await I.grabTextFrom(firstFilm);
  I.click(firstFilm);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/suka');
  I.seeElement('.cafe-item');
  const likedFilmTitle = await I.grabTextFrom('.cafe__title');

  assert.strictEqual(firstFilmTitle, likedFilmTitle);

  // unlike

  I.click(firstFilm);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/suka');
  I.see('Tidak ada cafe untuk ditampilkan', '.cafe-item__not__found');
});
