const STORE_ID = "STORE_001";
const SELLER_ID = "SELLER_001";

const categories = [
  {
    id: "all",
    name: "All",
    icon: "🍽️",
    image: "",
    available: true,
    sortOrder: 0,
  },
  {
    id: "Pizza",
    name: "Pizza",
    icon: "🍕",
    image: "",
    available: true,
    sortOrder: 1,
  },
  {
    id: "Burgers",
    name: "Burgers",
    icon: "🍔",
    image: "",
    available: true,
    sortOrder: 2,
  },
  {
    id: "Pasta",
    name: "Pasta",
    icon: "🍝",
    image: "",
    available: true,
    sortOrder: 3,
  },
  {
    id: "Drinks",
    name: "Drinks",
    icon: "🥤",
    image: "",
    available: true,
    sortOrder: 4,
  },
  {
    id: "Desserts",
    name: "Desserts",
    icon: "🍰",
    image: "",
    available: true,
    sortOrder: 5,
  },
  {
    id: "Snacks",
    name: "Snacks",
    icon: "🍟",
    image: "",
    available: true,
    sortOrder: 6,
  },
];

const menu = [
  {
    id: "ITEM_001",
    sku: "PIZ-001",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Margherita Pizza",

    description:
      "Fresh mozzarella cheese with rich tomato sauce and herbs.",

    category: "Pizza",

    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 299,
    originalPrice: 349,

    tax: 5,

    stock: 120,

    available: true,

    preparationTime: 20,

    isVeg: true,

    featured: true,
    bestseller: true,
    recommended: true,

    rating: {
      average: 4.8,
      count: 281,
    },

    calories: 510,

    tags: [
      "Italian",
      "Cheesy",
      "Popular",
    ],

    variants: [
      {
        id: "VAR001",
        name: "Regular",
        price: 299,
      },
      {
        id: "VAR002",
        name: "Medium",
        price: 449,
      },
      {
        id: "VAR003",
        name: "Large",
        price: 599,
      },
    ],

    addons: [
      {
        id: "ADD001",
        name: "Extra Cheese",
        price: 50,
      },
      {
        id: "ADD002",
        name: "Olives",
        price: 35,
      },
    ],
  },

  {
    id: "ITEM_002",

    sku: "PIZ-002",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Farmhouse Pizza",

    description:
      "Loaded with onion, capsicum, tomatoes, mushrooms and sweet corn.",

    category: "Pizza",

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 449,
    originalPrice: 499,

    tax: 5,

    stock: 90,

    available: true,

    preparationTime: 22,

    isVeg: true,

    featured: true,
    bestseller: true,
    recommended: false,

    rating: {
      average: 4.9,
      count: 196,
    },

    calories: 640,

    tags: [
      "Veg",
      "Premium",
    ],

    variants: [
      {
        id: "VAR004",
        name: "Regular",
        price: 449,
      },
      {
        id: "VAR005",
        name: "Large",
        price: 699,
      },
    ],

    addons: [
      {
        id: "ADD003",
        name: "Cheese Burst",
        price: 99,
      },
    ],
  },

  {
    id: "ITEM_003",

    sku: "BUR-001",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Classic Chicken Burger",

    description:
      "Grilled chicken patty with lettuce, tomato and mayo.",

    category: "Burgers",

    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 249,
    originalPrice: 279,

    tax: 5,

    stock: 100,

    available: true,

    preparationTime: 15,

    isVeg: false,

    featured: true,
    bestseller: true,
    recommended: true,

    rating: {
      average: 4.7,
      count: 158,
    },

    calories: 560,

    tags: [
      "Chicken",
      "Burger",
    ],

    variants: [],

    addons: [
      {
        id: "ADD004",
        name: "French Fries",
        price: 99,
      },
      {
        id: "ADD005",
        name: "Cheese Slice",
        price: 30,
      },
    ],
  },

  {
    id: "ITEM_004",

    sku: "PAS-001",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Creamy Alfredo Pasta",

    description:
      "Creamy white sauce pasta with herbs and parmesan cheese.",

    category: "Pasta",

    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 279,
    originalPrice: 329,

    tax: 5,

    stock: 60,

    available: true,

    preparationTime: 18,

    isVeg: true,

    featured: false,
    bestseller: true,
    recommended: true,

    rating: {
      average: 4.6,
      count: 104,
    },

    calories: 480,

    tags: [
      "Creamy",
      "Italian",
    ],

    variants: [],

    addons: [
      {
        id: "ADD006",
        name: "Garlic Bread",
        price: 79,
      },
    ],
  },

  {
    id: "ITEM_005",

    sku: "DRK-001",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Cold Coffee",

    description:
      "Rich cold coffee blended with ice cream.",

    category: "Drinks",

    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 149,

    originalPrice: 179,

    tax: 5,

    stock: 250,

    available: true,

    preparationTime: 5,

    isVeg: true,

    featured: false,
    bestseller: true,
    recommended: false,

    rating: {
      average: 4.8,
      count: 317,
    },

    calories: 260,

    tags: [
      "Cold",
      "Coffee",
    ],

    variants: [
      {
        id: "VAR006",
        name: "Regular",
        price: 149,
      },
      {
        id: "VAR007",
        name: "Large",
        price: 199,
      },
    ],

    addons: [
      {
        id: "ADD007",
        name: "Whipped Cream",
        price: 20,
      },
    ],
  },

  {
    id: "ITEM_006",

    sku: "DES-001",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Chocolate Lava Cake",

    description:
      "Warm chocolate cake with a gooey molten chocolate center.",

    category: "Desserts",

    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 179,

    originalPrice: 219,

    tax: 5,

    stock: 80,

    available: true,

    preparationTime: 12,

    isVeg: true,

    featured: true,
    bestseller: true,
    recommended: true,

    rating: {
      average: 4.9,
      count: 214,
    },

    calories: 390,

    tags: [
      "Dessert",
      "Chocolate",
    ],

    variants: [],

    addons: [],
  },

  {
    id: "ITEM_007",

    sku: "DRK-002",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Mango Shake",

    description:
      "Fresh Alphonso mango shake blended with premium vanilla ice cream.",

    category: "Drinks",

    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 199,

    originalPrice: 229,

    tax: 5,

    stock: 150,

    available: true,

    preparationTime: 6,

    isVeg: true,

    featured: false,
    bestseller: false,
    recommended: true,

    rating: {
      average: 4.7,
      count: 121,
    },

    calories: 290,

    tags: [
      "Shake",
      "Summer",
    ],

    variants: [],

    addons: [],
  },

  {
    id: "ITEM_008",

    sku: "BUR-002",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Veg Loaded Burger",

    description:
      "Crispy veg patty with fresh vegetables and signature sauce.",

    category: "Burgers",

    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 199,

    originalPrice: 249,

    tax: 5,

    stock: 95,

    available: true,

    preparationTime: 15,

    isVeg: true,

    featured: false,
    bestseller: false,
    recommended: false,

    rating: {
      average: 4.5,
      count: 88,
    },

    calories: 430,

    tags: [
      "Veg",
      "Burger",
    ],

    variants: [],

    addons: [
      {
        id: "ADD008",
        name: "Extra Cheese",
        price: 35,
      },
    ],
  },

  {
    id: "ITEM_009",

    sku: "PIZ-003",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "Chicken Tikka Pizza",

    description:
      "Loaded with spicy chicken tikka, onions and mozzarella cheese.",

    category: "Pizza",

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 549,

    originalPrice: 649,

    tax: 5,

    stock: 70,

    available: true,

    preparationTime: 24,

    isVeg: false,

    featured: true,
    bestseller: true,
    recommended: true,

    rating: {
      average: 4.9,
      count: 302,
    },

    calories: 720,

    tags: [
      "Chicken",
      "Spicy",
    ],

    variants: [
      {
        id: "VAR008",
        name: "Regular",
        price: 549,
      },
      {
        id: "VAR009",
        name: "Large",
        price: 799,
      },
    ],

    addons: [
      {
        id: "ADD009",
        name: "Cheese Burst",
        price: 99,
      },
    ],
  },

  {
    id: "ITEM_010",

    sku: "SNK-001",

    storeId: STORE_ID,
    sellerId: SELLER_ID,

    name: "French Fries",

    description:
      "Golden crispy fries served with peri-peri seasoning.",

    category: "Snacks",

    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80",

    gallery: [],

    price: 129,

    originalPrice: 159,

    tax: 5,

    stock: 220,

    available: true,

    preparationTime: 8,

    isVeg: true,

    featured: false,
    bestseller: true,
    recommended: false,

    rating: {
      average: 4.6,
      count: 173,
    },

    calories: 340,

    tags: [
      "Fries",
      "Snacks",
    ],

    variants: [
      {
        id: "VAR010",
        name: "Regular",
        price: 129,
      },
      {
        id: "VAR011",
        name: "Large",
        price: 179,
      },
    ],

    addons: [
      {
        id: "ADD010",
        name: "Cheese Dip",
        price: 30,
      },
      {
        id: "ADD011",
        name: "Peri Peri Seasoning",
        price: 20,
      },
    ],
  },
];

const getMenu = () => menu;

const getCategories = () => categories;

const getProductById = (id) =>
  menu.find((item) => item.id === id);

const getProductBySku = (sku) =>
  menu.find((item) => item.sku === sku);

const getProductsByCategory = (category) =>
  menu.filter(
    (item) =>
      item.category.toLowerCase() ===
      category.toLowerCase()
  );

const getFeaturedProducts = () =>
  menu.filter(
    (item) =>
      item.featured && item.available
  );

const getBestSellerProducts = () =>
  menu.filter(
    (item) =>
      item.bestseller && item.available
  );

const getRecommendedProducts = () =>
  menu.filter(
    (item) =>
      item.recommended && item.available
  );

const searchMenu = (query = "") => {
  const keyword = query.toLowerCase();

  return menu.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(keyword)
      )
  );
};

module.exports = {
  categories,
  menu,
  getMenu,
  getCategories,
  getProductById,
  getProductBySku,
  getProductsByCategory,
  getFeaturedProducts,
  getBestSellerProducts,
  getRecommendedProducts,
  searchMenu,
};
