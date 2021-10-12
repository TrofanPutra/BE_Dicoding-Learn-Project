const {
    tambahBook,
    ambilBuku,
    ambilBukuById,
    editBukuById,
    hapusBukuById,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: tambahBook,
    },
    {
      method: 'GET',
      path: '/books',
      handler: ambilBuku,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: ambilBukuById,
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: editBukuById,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: hapusBukuById,
    },
  ];
  
  module.exports = routes;