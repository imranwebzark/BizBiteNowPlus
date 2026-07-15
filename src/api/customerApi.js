import API from "./axios";

// =======================================
// Store
// =======================================

export const getStore = () =>
  API.get("/store");

// =======================================
// Menu
// =======================================

export const getMenu = () =>
  API.get("/menu");

export const getCategories = () =>
  API.get("/menu/categories");

export const getFeaturedProducts = () =>
  API.get("/menu/featured");

export const getBestSellers = () =>
  API.get("/menu/bestsellers");

export const getRecommendedProducts = () =>
  API.get("/menu/recommended");

export const getProduct = (id) =>
  API.get(`/menu/${id}`);

export const searchMenu = (query) =>
  API.get(`/menu/search?q=${query}`);

// =======================================
// Search
// =======================================

export const globalSearch = (query) =>
  API.get(`/search?q=${query}`);

// =======================================
// Favorites
// =======================================

export const getFavorites = (customerId) =>
  API.get(`/favorites/${customerId}`);

export const checkFavorite = (
  customerId,
  productId
) =>
  API.get(
    `/favorites/${customerId}/${productId}`
  );

export const addFavorite = (data) =>
  API.post("/favorites", data);

export const toggleFavorite = (data) =>
  API.post("/favorites/toggle", data);

export const removeFavorite = (
  customerId,
  productId
) =>
  API.delete(
    `/favorites/${customerId}/${productId}`
  );

// =======================================
// Cart
// =======================================

export const getCart = () =>
  API.get("/cart");

export const addToCart = (item) =>
  API.post("/cart", item);

export const updateCartItem = (
  id,
  quantity
) =>
  API.patch(`/cart/${id}`, {
    quantity,
  });

export const removeFromCart = (id) =>
  API.delete(`/cart/${id}`);

export const clearCart = () =>
  API.delete("/cart");

// =======================================
// Orders
// =======================================

// export const getCurrentOrders = (
//   customerId
// ) =>
//   API.get(
//     `/orders/current/${customerId}`
//   );

// export const getOrderHistory = (
//   customerId
// ) =>
//   API.get(
//     `/orders/history/${customerId}`
//   );
export const getCurrentOrders = async () => {
  return {
    data: {
      data: [
        {
          id: "ORD-1001",
          restaurant: "Burger King",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
          date: "15 Jul 2026",
          time: "08:30 PM",
          items: 3,
          total: 549,
          status: "Ongoing",
          tracking: {
            currentStep: 2,
            steps: [],
          },
        },
        {
          id: "ORD-1002",
          restaurant: "Pizza Hut",
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
          date: "15 Jul 2026",
          time: "07:10 PM",
          items: 2,
          total: 699,
          status: "Ongoing",
          tracking: {
            currentStep: 1,
            steps: [],
          },
        },
        {
          id: "ORD-1003",
          restaurant: "KFC",
          image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=300",
          date: "14 Jul 2026",
          time: "09:15 PM",
          items: 4,
          total: 879,
          status: "Ongoing",
          tracking: {
            currentStep: 3,
            steps: [],
          },
        },
        {
          id: "ORD-1004",
          restaurant: "Domino's Pizza",
          image: "https://images.unsplash.com/photo-1548365328-9f547fb0953d?w=300",
          date: "14 Jul 2026",
          time: "06:45 PM",
          items: 1,
          total: 399,
          status: "Ongoing",
          tracking: {
            currentStep: 2,
            steps: [],
          },
        },
        {
          id: "ORD-1005",
          restaurant: "Subway",
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300",
          date: "13 Jul 2026",
          time: "01:20 PM",
          items: 2,
          total: 349,
          status: "Ongoing",
          tracking: {
            currentStep: 2,
            steps: [],
          },
        },
        {
          id: "ORD-1006",
          restaurant: "Biryani House",
          image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300",
          date: "13 Jul 2026",
          time: "08:05 PM",
          items: 5,
          total: 999,
          status: "Ongoing",
          tracking: {
            currentStep: 1,
            steps: [],
          },
        },
        {
          id: "ORD-1007",
          restaurant: "Starbucks",
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
          date: "12 Jul 2026",
          time: "05:40 PM",
          items: 3,
          total: 620,
          status: "Ongoing",
          tracking: {
            currentStep: 3,
            steps: [],
          },
        },
        {
          id: "ORD-1008",
          restaurant: "Taco Bell",
          image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=300",
          date: "12 Jul 2026",
          time: "09:50 PM",
          items: 2,
          total: 450,
          status: "Ongoing",
          tracking: {
            currentStep: 2,
            steps: [],
          },
        },
        {
          id: "ORD-1009",
          restaurant: "McDonald's",
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300",
          date: "11 Jul 2026",
          time: "07:30 PM",
          items: 4,
          total: 780,
          status: "Ongoing",
          tracking: {
            currentStep: 2,
            steps: [],
          },
        },
        {
          id: "ORD-1010",
          restaurant: "Wow Momo",
          image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300",
          date: "11 Jul 2026",
          time: "08:15 PM",
          items: 3,
          total: 510,
          status: "Ongoing",
          tracking: {
            currentStep: 1,
            steps: [],
          },
        },
      ],
    },
  };
};

export const getOrderHistory = async () => {
  return {
    data: {
      data: [
        {
          id: "ORD-10230",
          restaurant: "Pizza Hut",
          image:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200",
          date: "12 Jul 2026",
          time: "07:10 PM",
          items: [
            {
              name: "Veg Pizza",
              image:
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200",
            },
          ],
          total: 699,
          summary: {
            total: 699,
          },
          status: "Delivered",
        },
      ],
    },
  };
};

export const placeOrder = (
  orderData
) =>
  API.post(
    "/orders",
    orderData
  );

export const updateOrderStatus = (
  orderId,
  status
) =>
  API.patch(
    `/orders/${orderId}/status`,
    {
      status,
    }
  );

// =======================================
// Profile
// =======================================

export const getProfile = (
  customerId
) =>
  API.get(
    `/profile/${customerId}`
  );

export const getAddresses = (
  customerId
) =>
  API.get(
    `/profile/addresses/${customerId}`
  );

export const getPayments = (
  customerId
) =>
  API.get(
    `/profile/payments/${customerId}`
  );

// =======================================
// Rewards
// =======================================

export const getRewards = () =>
  API.get("/rewards");

export const getReward = (
  rewardId
) =>
  API.get(
    `/rewards/${rewardId}`
  );

export const getLoyalty = (
  customerId
) =>
  API.get(
    `/rewards/customer/${customerId}/loyalty`
  );

export const getCoupons = (
  customerId
) =>
  API.get(
    `/rewards/customer/${customerId}/coupons`
  );

export const redeemReward = (
  rewardId,
  customerId
) =>
  API.post(
    `/rewards/${rewardId}/redeem/${customerId}`
  );

export const applyCoupon = (
  customerId,
  couponId
) =>
  API.post(
    `/rewards/customer/${customerId}/coupons/${couponId}/apply`
  );

export const useCoupon = (
  customerId,
  couponId
) =>
  API.patch(
    `/rewards/customer/${customerId}/coupons/${couponId}/use`
  );

// =======================================
// Reviews
// =======================================

export const getRestaurantReviews = (
  storeId
) =>
  API.get(
    `/reviews/restaurant/${storeId}`
  );

export const getProductReviews = (
  productId
) =>
  API.get(
    `/reviews/product/${productId}`
  );

export const getCustomerReviews = (
  customerId
) =>
  API.get(
    `/reviews/customer/${customerId}`
  );

export const addReview = (
  data
) =>
  API.post(
    "/reviews",
    data
  );

export const updateReview = (
  id,
  data
) =>
  API.patch(
    `/reviews/${id}`,
    data
  );

export const deleteReview = (
  id
) =>
  API.delete(
    `/reviews/${id}`
  );

// =======================================
// Notifications
// =======================================

export const getNotifications = (
  customerId
) =>
  API.get(
    `/notifications/customer/${customerId}`
  );

export const getUnreadNotificationCount = (
  customerId
) =>
  API.get(
    `/notifications/customer/${customerId}/unread-count`
  );

export const markNotificationRead = (
  id
) =>
  API.patch(
    `/notifications/${id}/read`
  );

export const markAllNotificationsRead = (
  customerId
) =>
  API.patch(
    `/notifications/customer/${customerId}/read-all`
  );

export const deleteNotification = (
  id
) =>
  API.delete(
    `/notifications/${id}`
  );