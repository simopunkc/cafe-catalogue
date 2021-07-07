const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    const data1 = { resource: urlsSplits[1] || null };
    let mergeObj = data1;
    if (urlsSplits[1] === 'detail') {
      mergeObj = {
        ...data1,
        id: urlsSplits[2] || null,
      };
    } else if (urlsSplits[1] === 'search') {
      mergeObj = {
        ...data1,
        query: urlsSplits[2] || null,
      };
    }
    return mergeObj;
  },

  _urlCombiner(splitedUrl) {
    let depanURL = (splitedUrl.resource ? `/${splitedUrl.resource}` : '/');
    if (depanURL === '/detail' && splitedUrl.id) {
      depanURL += '/:id';
    } else if (depanURL === '/search' && splitedUrl.query) {
      depanURL += '/:query';
    }
    return depanURL;
  },
};

export default UrlParser;
