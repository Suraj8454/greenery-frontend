export const storage = {
  getUsers: () => JSON.parse(localStorage.getItem('cs_users') || '[]'),
  saveUsers: (users) => localStorage.setItem('cs_users', JSON.stringify(users)),

  getCurrentUser: () => JSON.parse(localStorage.getItem('cs_currentUser') || 'null'),
  setCurrentUser: (user) => {
    if (user) localStorage.setItem('cs_currentUser', JSON.stringify(user));
    else localStorage.removeItem('cs_currentUser');
  },

  getCart: () => JSON.parse(localStorage.getItem('cs_cart') || '[]'),
  saveCart: (cart) => localStorage.setItem('cs_cart', JSON.stringify(cart)),

  getFavorites: () => JSON.parse(localStorage.getItem('cs_favorites') || '[]'),
  saveFavorites: (fav) => localStorage.setItem('cs_favorites', JSON.stringify(fav)),

  getOrders: () => JSON.parse(localStorage.getItem('cs_orders') || '[]'),
  saveOrders: (orders) => localStorage.setItem('cs_orders', JSON.stringify(orders)),
};