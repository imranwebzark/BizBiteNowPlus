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

export const getCurrentOrders = (
  customerId
) =>
  API.get(
    `/orders/current/${customerId}`
  );

export const getOrderHistory = (
  customerId
) =>
  API.get(
    `/orders/history/${customerId}`
  );

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