export const categories = [
  "All",
  "Pizza",
  "Burger",
  "Beverages",
  "Desserts",
  "Snacks",
];
export const products = [
  {
    id: 1,
    sku: "BRG-001",
    name: "Chicken Burger",
    description:
      "Juicy grilled chicken patty with fresh lettuce, tomatoes, onions, cheese, and signature sauce.",

    category: "Burger",

    price: 249,

    variants: [
      {
        id: 1,
        name: "Small",
        price: 199,
      },
      {
        id: 2,
        name: "Medium",
        price: 249,
      },
      {
        id: 3,
        name: "Large",
        price: 299,
      },
    ],

    addons: [
      {
        id: 1,
        name: "Extra Cheese",
        price: 30,
        available: true,
      },
      {
        id: 2,
        name: "Extra Chicken Patty",
        price: 80,
        available: true,
      },
      {
        id: 3,
        name: "Peri Peri Seasoning",
        price: 20,
        available: true,
      },
      {
        id: 4,
        name: "Garlic Mayo Dip",
        price: 25,
        available: true,
      },
      {
        id: 5,
        name: "BBQ Dip",
        price: 25,
        available: true,
      },
      {
        id: 6,
        name: "Coke 250ml",
        price: 40,
        available: true,
      },
    ],

    stock: 28,
    available: true,
    featured: true,
    combo: true,
    delivery: true,

    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },

  {
    id: 2,
    sku: "PZA-001",
    name: "Veg Supreme Pizza",

    description:
      "Loaded with fresh vegetables, mozzarella cheese, olives, capsicum, and sweet corn.",

    category: "Pizza",

    price: 399,

    variants: [
      {
        id: 1,
        name: "Regular",
        price: 399,
      },
      {
        id: 2,
        name: "Medium",
        price: 499,
      },
      {
        id: 3,
        name: "Large",
        price: 599,
      },
    ],

    addons: [
      {
        id: 1,
        name: "Extra Cheese",
        price: 60,
        available: true,
      },
      {
        id: 2,
        name: "Paneer",
        price: 70,
        available: true,
      },
      {
        id: 3,
        name: "Olives",
        price: 40,
        available: true,
      },
      {
        id: 4,
        name: "Sweet Corn",
        price: 35,
        available: true,
      },
      {
        id: 5,
        name: "Jalapeno",
        price: 40,
        available: true,
      },
      {
        id: 6,
        name: "Cheese Burst",
        price: 99,
        available: true,
      },
    ],

    stock: 15,
    available: true,
    featured: false,
    combo: false,
    delivery: true,

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
  },

  {
    id: 3,
    sku: "BEV-001",
    name: "Cold Coffee",

    description:
      "Creamy chilled coffee blended with milk, chocolate syrup, and vanilla ice cream.",

    category: "Beverages",

    price: 149,

    variants: [
      {
        id: 1,
        name: "Small",
        price: 149,
      },
      {
        id: 2,
        name: "Medium",
        price: 179,
      },
      {
        id: 3,
        name: "Large",
        price: 219,
      },
    ],

    addons: [
      {
        id: 1,
        name: "Extra Coffee Shot",
        price: 40,
        available: true,
      },
      {
        id: 2,
        name: "Whipped Cream",
        price: 30,
        available: true,
      },
      {
        id: 3,
        name: "Chocolate Syrup",
        price: 25,
        available: true,
      },
      {
        id: 4,
        name: "Caramel Syrup",
        price: 25,
        available: true,
      },
      {
        id: 5,
        name: "Vanilla Ice Cream",
        price: 40,
        available: true,
      },
    ],

    stock: 40,
    available: true,
    featured: false,
    combo: false,
    delivery: true,

    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
  },  {
    id: 4,
    sku: "SNK-001",
    name: "French Fries",

    description:
      "Golden crispy fries served with tomato ketchup and peri-peri seasoning.",

    category: "Snacks",

    price: 129,

    variants: [
      {
        id: 1,
        name: "Regular",
        price: 129,
      },
      {
        id: 2,
        name: "Medium",
        price: 169,
      },
      {
        id: 3,
        name: "Large",
        price: 219,
      },
    ],

    addons: [
      {
        id: 1,
        name: "Peri Peri Seasoning",
        price: 20,
        available: true,
      },
      {
        id: 2,
        name: "Cheese Dip",
        price: 35,
        available: true,
      },
      {
        id: 3,
        name: "Garlic Mayo",
        price: 25,
        available: true,
      },
      {
        id: 4,
        name: "BBQ Dip",
        price: 25,
        available: true,
      },
      {
        id: 5,
        name: "Tomato Ketchup",
        price: 10,
        available: true,
      },
    ],

    stock: 5,
    available: true,
    featured: true,
    combo: true,
    delivery: true,

    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600",
  },

  {
    id: 5,
    sku: "DST-001",
    name: "Chocolate Brownie",

    description:
      "Rich chocolate brownie served warm with chocolate drizzle.",

    category: "Desserts",

    price: 179,

    variants: [
      {
        id: 1,
        name: "Regular",
        price: 179,
      },
    ],

    addons: [
      {
        id: 1,
        name: "Vanilla Ice Cream",
        price: 60,
        available: true,
      },
      {
        id: 2,
        name: "Chocolate Syrup",
        price: 25,
        available: true,
      },
      {
        id: 3,
        name: "Whipped Cream",
        price: 30,
        available: true,
      },
      {
        id: 4,
        name: "Choco Chips",
        price: 20,
        available: true,
      },
    ],

    stock: 0,
    available: false,
    featured: false,
    combo: false,
    delivery: false,

    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
  },

  {
    id: 6,
    sku: "PZA-002",
    name: "Paneer Tikka Pizza",

    description:
      "Indian-style pizza topped with spicy paneer tikka, onions, capsicum, and mozzarella.",

    category: "Pizza",

    price: 449,

    variants: [
      {
        id: 1,
        name: "Regular",
        price: 449,
      },
      {
        id: 2,
        name: "Medium",
        price: 549,
      },
      {
        id: 3,
        name: "Large",
        price: 649,
      },
    ],

    addons: [
      {
        id: 1,
        name: "Extra Cheese",
        price: 60,
        available: true,
      },
      {
        id: 2,
        name: "Paneer Cubes",
        price: 70,
        available: true,
      },
      {
        id: 3,
        name: "Mushroom",
        price: 50,
        available: true,
      },
      {
        id: 4,
        name: "Black Olives",
        price: 45,
        available: true,
      },
      {
        id: 5,
        name: "Jalapeno",
        price: 40,
        available: true,
      },
      {
        id: 6,
        name: "Cheese Burst",
        price: 99,
        available: true,
      },
    ],

    stock: 12,
    available: true,
    featured: true,
    combo: false,
    delivery: true,

    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600",
  },  {
    id: 7,
    sku: "BRG-002",
    name: "Cheese Burger",

    description:
      "Double cheese burger with fresh vegetables and creamy mayo.",

    category: "Burger",

    price: 279,

    variants: [
      {
        id: 1,
        name: "Small",
        price: 229,
      },
      {
        id: 2,
        name: "Medium",
        price: 279,
      },
      {
        id: 3,
        name: "Large",
        price: 329,
      },
    ],

    addons: [
      {
        id: 1,
        name: "Extra Cheese",
        price: 30,
        available: true,
      },
      {
        id: 2,
        name: "Double Patty",
        price: 90,
        available: true,
      },
      {
        id: 3,
        name: "Peri Peri Seasoning",
        price: 20,
        available: true,
      },
      {
        id: 4,
        name: "Garlic Mayo",
        price: 25,
        available: true,
      },
      {
        id: 5,
        name: "BBQ Sauce",
        price: 25,
        available: true,
      },
      {
        id: 6,
        name: "French Fries",
        price: 70,
        available: true,
      },
    ],

    stock: 18,
    available: true,
    featured: false,
    combo: true,
    delivery: true,

    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
  },

  {
    id: 8,
    sku: "BEV-002",
    name: "Fresh Lime Soda",

    description:
      "Refreshing lime soda available in sweet or salted flavor.",

    category: "Beverages",

    price: 99,

    variants: [
      {
        id: 1,
        name: "Small",
        price: 99,
      },
      {
        id: 2,
        name: "Medium",
        price: 129,
      },
      {
        id: 3,
        name: "Large",
        price: 159,
      },
    ],

    addons: [
      {
        id: 1,
        name: "Mint Leaves",
        price: 15,
        available: true,
      },
      {
        id: 2,
        name: "Extra Lemon",
        price: 20,
        available: true,
      },
      {
        id: 3,
        name: "Ice Cream Scoop",
        price: 40,
        available: true,
      },
      {
        id: 4,
        name: "Ice Cubes",
        price: 10,
        available: true,
      },
    ],

    stock: 35,
    available: true,
    featured: false,
    combo: false,
    delivery: true,

    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600",
  },
];

export const productStats = {
  totalProducts: products.length,
  activeProducts: products.filter(
    (p) => p.available
  ).length,

  outOfStock: products.filter(
    (p) => !p.available
  ).length,

  categories: new Set(
    products.map((p) => p.category)
  ).size,
};