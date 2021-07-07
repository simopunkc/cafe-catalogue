import DaftarList from '../views/pages/list';
import Detail from '../views/pages/detail';
import Suka from '../views/pages/like';
import Pencarian from '../views/pages/search';

const routes = {
  '/': DaftarList, // default page
  '/list': DaftarList,
  '/detail/:id': Detail,
  '/suka': Suka,
  '/search': Pencarian,
  '/search/:query': Pencarian,
};

export default routes;
