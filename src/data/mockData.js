export const initialUsers = [
  {
    id: "u1",
    email: "admin@demo.com",
    password: "123", /* Thường thì password sẽ được băm (hash), fake để demo */
    role: "admin",
    name: "Quản trị viên",
    phone: "0123456789",
  },
  {
    id: "u2",
    email: "staff@demo.com",
    password: "123",
    role: "staff",
    name: "Nhân viên Bán hàng",
    phone: "0987654321",
  },
  {
    id: "u3",
    email: "customer@demo.com",
    password: "123",
    role: "customer",
    name: "Nguyễn Văn Khách Hàng",
    phone: "0988888888",
    address: "123 Đường Điện Biên Phủ, Hà Nội",
  },
];

export const initialCategories = [
  { id: "c1", name: "Điện thoại", slug: "dien-thoai" },
  { id: "c2", name: "Laptop", slug: "laptop" },
  { id: "c3", name: "Phụ kiện", slug: "phu-kien" },
];

export const initialProducts = [
  {
    id: "p1",
    categoryId: "c1",
    name: "iPhone 15 Pro Max 256GB",
    price: 34990000,
    originalPrice: 38990000,
    image: "https://images.unsplash.com/photo-1696446702183-cbd011c03e91?auto=format&fit=crop&q=80&w=800",
    description: "iPhone 15 Pro Max với thiết kế titan đẳng cấp, chip A17 Pro mạnh mẽ và camera xuất sắc.",
    stock: 50,
    rating: 4.8,
    reviews: [
      { id: "r1", userId: "u3", userName: "Nguyễn Văn Khách Hàng", rating: 5, comment: "Máy mượt, chụp ảnh đẹp" }
    ]
  },
  {
    id: "p2",
    categoryId: "c2",
    name: "MacBook Pro 14 M3",
    price: 39990000,
    originalPrice: 42990000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    description: "Laptop viền mỏng, chip M3 siêu mạnh dành cho dân đồ hoạ.",
    stock: 30,
    rating: 4.9,
    reviews: []
  },
  {
    id: "p3",
    categoryId: "c3",
    name: "Tai nghe AirPods Pro 2",
    price: 5990000,
    originalPrice: 6500000,
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=800",
    description: "Tai nghe chống ồn chủ động xuất sắc từ Apple.",
    stock: 120,
    rating: 4.7,
    reviews: []
  },
  {
    id: "p4",
    categoryId: "c1",
    name: "Samsung Galaxy S24 Ultra",
    price: 33990000,
    originalPrice: 38000000,
    image: "https://images.unsplash.com/photo-1621330396167-8fa82b5e2da8?auto=format&fit=crop&q=80&w=800",
    description: "Điện thoại Android cao cấp với Spen thông minh và Camera 200MP.",
    stock: 40,
    rating: 4.6,
    reviews: []
  }
];

export const initialOrders = [
  {
    id: "ORD-1001",
    userId: "u3",
    items: [
      { productId: "p1", name: "iPhone 15 Pro Max 256GB", price: 34990000, quantity: 1, image: "https://images.unsplash.com/photo-1696446702183-cbd011c03e91?auto=format&fit=crop&q=80&w=800" }
    ],
    totalAmount: 34990000,
    shippingFee: 30000,
    totalPayment: 35020000,
    status: "pending", // pending, processing, shipping, completed, cancelled
    shippingStatus: "Chờ lấy hàng", // Viettel Post placeholder
    shippingMethod: "viettel_post",
    paymentMethod: "cod", // cod, vnpay
    paymentStatus: "unpaid",
    customerInfo: {
      name: "Nguyễn Văn Khách Hàng",
      phone: "0988888888",
      address: "123 Đường Điện Biên Phủ, Hà Nội"
    },
    createdAt: new Date().toISOString()
  }
];

export const initDB = () => {
  if (!localStorage.getItem('ec_users')) {
    localStorage.setItem('ec_users', JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem('ec_categories')) {
    localStorage.setItem('ec_categories', JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem('ec_products')) {
    localStorage.setItem('ec_products', JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem('ec_orders')) {
    localStorage.setItem('ec_orders', JSON.stringify(initialOrders));
  }
};
