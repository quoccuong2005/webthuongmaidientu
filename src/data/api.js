import { v4 as uuidv4 } from 'uuid';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Users
export const loginAPI = async (email, password) => {
  await delay(500);
  const users = JSON.parse(localStorage.getItem('ec_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Email hoặc mật khẩu không đúng');
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const registerAPI = async (userData) => {
  await delay(500);
  const users = JSON.parse(localStorage.getItem('ec_users') || '[]');
  if (users.find(u => u.email === userData.email)) throw new Error('Email đã tồn tại');
  const newUser = { id: uuidv4(), ...userData, role: 'customer' };
  users.push(newUser);
  localStorage.setItem('ec_users', JSON.stringify(users));
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Products & Categories
export const getProductsAPI = async () => {
  await delay(300);
  return JSON.parse(localStorage.getItem('ec_products') || '[]');
};

export const getProductByIdAPI = async (id) => {
  await delay(200);
  const products = JSON.parse(localStorage.getItem('ec_products') || '[]');
  return products.find(p => p.id === id);
};

export const getCategoriesAPI = async () => {
  await delay(200);
  return JSON.parse(localStorage.getItem('ec_categories') || '[]');
};

// Orders
export const createOrderAPI = async (orderData) => {
  await delay(800);
  const orders = JSON.parse(localStorage.getItem('ec_orders') || '[]');
  const newOrder = {
    id: `ORD-${Math.floor(Math.random() * 10000)}`,
    ...orderData,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  localStorage.setItem('ec_orders', JSON.stringify(orders));
  
  // Update stock
  const products = JSON.parse(localStorage.getItem('ec_products') || '[]');
  orderData.items.forEach(item => {
    const p = products.find(p => p.id === item.productId);
    if(p) p.stock -= item.quantity;
  });
  localStorage.setItem('ec_products', JSON.stringify(products));

  return newOrder;
};

export const getUserOrdersAPI = async (userId) => {
  await delay(400);
  const orders = JSON.parse(localStorage.getItem('ec_orders') || '[]');
  return orders.filter(o => o.userId === userId).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getAllOrdersAPI = async () => {
  await delay(400);
  return JSON.parse(localStorage.getItem('ec_orders') || '[]');
};

export const updateOrderStatusAPI = async (orderId, updates) => {
  await delay(300);
  let orders = JSON.parse(localStorage.getItem('ec_orders') || '[]');
  const index = orders.findIndex(o => o.id === orderId);
  if(index > -1) {
    orders[index] = { ...orders[index], ...updates };
    if(updates.status === 'shipping') {
        orders[index].shippingStatus = 'Đang giao hàng (Viettel Post)';
    }
    localStorage.setItem('ec_orders', JSON.stringify(orders));
    return orders[index];
  }
  throw new Error('Order not found');
};

export const addReviewAPI = async (productId, reviewData) => {
    await delay(300);
    const products = JSON.parse(localStorage.getItem('ec_products') || '[]');
    const product = products.find(p => p.id === productId);
    if (product) {
        const newReview = { id: uuidv4(), ...reviewData };
        product.reviews = product.reviews || [];
        product.reviews.push(newReview);
        
        // update average rating
        const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
        product.rating = totalRating / product.reviews.length;

        localStorage.setItem('ec_products', JSON.stringify(products));
        return product;
    }
    throw new Error('Product not found');
}
