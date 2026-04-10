// ─── PRODUCTS ───────────────────────────────────────────────────────────────
export const products = [
  {
    _id: "p1",
    name: "AirMax Pro Sneakers",
    description: "Ultra-lightweight running shoes engineered for peak performance. Breathable mesh upper, responsive foam midsole, and durable rubber outsole for all-terrain grip.",
    category: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1585232350744-d9d7c77a9b41?w=600&q=80",
    ],
    price: 129.99,
    stock: 45,
    reviews: ["r1", "r2"],
    rating: 4.5,
    reviewCount: 128,
  },
  {
    _id: "p2",
    name: "Minimal Leather Watch",
    description: "Timeless minimalist design with genuine Italian leather strap and sapphire crystal glass. Water resistant up to 50m. Available in silver and gold tones.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d4b7f?w=600&q=80",
    ],
    price: 249.99,
    stock: 20,
    reviews: ["r3"],
    rating: 4.8,
    reviewCount: 87,
  },
  {
    _id: "p3",
    name: "Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with industry-leading active noise cancellation, 30-hour battery life, and Hi-Res Audio certification. Foldable design for portability.",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80",
    ],
    price: 349.99,
    stock: 15,
    reviews: [],
    rating: 4.7,
    reviewCount: 214,
  },
  {
    _id: "p4",
    name: "Structured Blazer",
    description: "Sharp tailored blazer in premium wool-blend fabric. Single-breasted, notch lapel, with twin back vents. Perfect for business or smart-casual outings.",
    category: "Clothing",
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
      "https://images.unsplash.com/photo-1512353087810-25dfcd100962?w=600&q=80",
    ],
    price: 189.99,
    stock: 30,
    reviews: [],
    rating: 4.3,
    reviewCount: 56,
  },
  {
    _id: "p5",
    name: "Wireless Mechanical Keyboard",
    description: "Compact 75% wireless mechanical keyboard with hot-swappable switches, RGB per-key lighting, and up to 40h battery. Compatible with Mac and Windows.",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&q=80",
    ],
    price: 159.99,
    stock: 25,
    reviews: [],
    rating: 4.6,
    reviewCount: 173,
  },
  {
    _id: "p6",
    name: "Leather Crossbody Bag",
    description: "Hand-crafted full-grain leather crossbody bag with adjustable strap, gold hardware, and spacious interior with multiple pockets.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b3b3f?w=600&q=80",
    ],
    price: 119.99,
    stock: 18,
    reviews: [],
    rating: 4.4,
    reviewCount: 92,
  },
  {
    _id: "p7",
    name: "Smart Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitor, GPS, sleep tracking, 7-day battery, and 50m water resistance. Compatible with iOS and Android.",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
      "https://images.unsplash.com/photo-1617247949960-b4fa2abe30c3?w=600&q=80",
    ],
    price: 89.99,
    stock: 60,
    reviews: [],
    rating: 4.2,
    reviewCount: 305,
  },
  {
    _id: "p8",
    name: "Oversized Graphic Hoodie",
    description: "Premium 400gsm heavyweight cotton fleece hoodie with a bold front graphic. Relaxed oversized fit, kangaroo pocket, and ribbed cuffs.",
    category: "Clothing",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
    ],
    price: 69.99,
    stock: 80,
    reviews: [],
    rating: 4.1,
    reviewCount: 441,
  },
  {
    _id: "p9",
    name: "Scented Soy Candle Set",
    description: "Set of 3 hand-poured soy wax candles in luxury glass vessels. Fragrances: Cedarwood & Vanilla, Ocean Breeze, Lavender Dreams. 40h burn time each.",
    category: "Home & Living",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    ],
    price: 44.99,
    stock: 100,
    reviews: [],
    rating: 4.9,
    reviewCount: 678,
  },
  {
    _id: "p10",
    name: "Ergonomic Office Chair",
    description: "Fully adjustable ergonomic chair with lumbar support, breathable mesh back, 4D armrests, and 5-year warranty. Supports up to 150kg.",
    category: "Home & Living",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    ],
    price: 399.99,
    stock: 12,
    reviews: [],
    rating: 4.6,
    reviewCount: 89,
  },
  {
    _id: "p11",
    name: "Polarized Aviator Sunglasses",
    description: "Classic aviator sunglasses with polarized UV400 lenses, stainless steel frame, and spring hinges. Includes premium hard case.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    ],
    price: 79.99,
    stock: 35,
    reviews: [],
    rating: 4.3,
    reviewCount: 162,
  },
  {
    _id: "p12",
    name: "Running Shorts",
    description: "Lightweight 2-in-1 running shorts with built-in liner, zippered back pocket, and stretch fabric. Reflective details for low-light safety.",
    category: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1562886877-6f5699f3f8e8?w=600&q=80",
    ],
    price: 39.99,
    stock: 75,
    reviews: [],
    rating: 4.0,
    reviewCount: 203,
  },
];

export const categories = ["All", "Electronics", "Clothing", "Footwear", "Accessories", "Home & Living"];

// ─── REVIEWS ────────────────────────────────────────────────────────────────
export const reviews = [
  {
    _id: "r1",
    product: "p1",
    user: { _id: "u2", name: "Alex Johnson", profileImage: "https://i.pravatar.cc/40?img=11" },
    rating: 5,
    comment: "Absolutely love these sneakers! Super comfortable for long runs and they look amazing. Highly recommend.",
    createdAt: "2024-03-15T10:22:00Z",
  },
  {
    _id: "r2",
    product: "p1",
    user: { _id: "u3", name: "Sarah Chen", profileImage: "https://i.pravatar.cc/40?img=5" },
    rating: 4,
    comment: "Great quality and fast delivery. They run a bit small so size up. Otherwise perfect.",
    createdAt: "2024-03-10T14:05:00Z",
  },
  {
    _id: "r3",
    product: "p2",
    user: { _id: "u4", name: "Michael Torres", profileImage: "https://i.pravatar.cc/40?img=7" },
    rating: 5,
    comment: "Elegant, minimal, and exactly as described. The leather strap is premium quality. Gift-worthy.",
    createdAt: "2024-02-28T09:30:00Z",
  },
];

// ─── ADDRESSES ───────────────────────────────────────────────────────────────
export const addresses = [
  {
    _id: "a1",
    user: "u1",
    street: "42 Maple Avenue, Apartment 3B",
    city: "New York",
    state: "New York",
    pinCode: 10001,
    phone: 9876543210,
  },
  {
    _id: "a2",
    user: "u1",
    street: "7 Ocean Drive",
    city: "Miami",
    state: "Florida",
    pinCode: 33101,
    phone: 9876543210,
  },
];

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export const orders = [
  {
    _id: "o1",
    user: "u1",
    items: [
      { product: products[0], quantity: 2 },
      { product: products[2], quantity: 1 },
    ],
    totalAmount: 609.97,
    address: addresses[0],
    status: "delivered",
    createdAt: "2024-03-01T08:00:00Z",
  },
  {
    _id: "o2",
    user: "u1",
    items: [
      { product: products[1], quantity: 1 },
    ],
    totalAmount: 249.99,
    address: addresses[0],
    status: "shipped",
    createdAt: "2024-03-20T12:30:00Z",
  },
  {
    _id: "o3",
    user: "u1",
    items: [
      { product: products[4], quantity: 1 },
      { product: products[7], quantity: 2 },
    ],
    totalAmount: 299.97,
    address: addresses[1],
    status: "processing",
    createdAt: "2024-04-01T16:45:00Z",
  },
  {
    _id: "o4",
    user: "u1",
    items: [
      { product: products[8], quantity: 3 },
    ],
    totalAmount: 134.97,
    address: addresses[0],
    status: "pending",
    createdAt: "2024-04-05T09:15:00Z",
  },
  {
    _id: "o5",
    user: "u1",
    items: [
      { product: products[3], quantity: 1 },
    ],
    totalAmount: 189.99,
    address: addresses[1],
    status: "cancelled",
    createdAt: "2024-02-15T11:20:00Z",
  },
];

// ─── CURRENT USER ────────────────────────────────────────────────────────────
export const currentUser = {
  _id: "u1",
  name: "Jordan Smith",
  email: "jordan.smith@email.com",
  profileImage: "https://i.pravatar.cc/80?img=3",
  role: "user",
};

// ─── ADMIN STATS ─────────────────────────────────────────────────────────────
export const adminStats = {
  totalRevenue: 128450.75,
  totalOrders: 1842,
  totalUsers: 9320,
  totalProducts: products.length,
  recentOrders: orders.slice(0, 4),
};
