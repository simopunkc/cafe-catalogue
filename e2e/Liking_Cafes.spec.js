const assert = require('assert');

Feature('Liking Cafes');

Before(({ I }) => {
  I.amOnPage('/#/suka');
});

Scenario('showing empty liked cafes', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada cafe untuk ditampilkan', '.cafe-item__not__found');
});

Scenario('liking one cafe', async ({ I }) => {
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
});

Scenario('searching cafes', async ({ I }) => {
  I.see('Tidak ada cafe untuk ditampilkan', '.cafe-item__not__found');

  I.amOnPage('/');

  I.seeElement('.cafe__title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.cafe__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.cafe__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/suka');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingCafes = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedCafes = await I.grabNumberOfVisibleElements('.cafe-item');
  assert.strictEqual(matchingCafes.length, visibleLikedCafes);

  matchingCafes.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.cafe__title a').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
