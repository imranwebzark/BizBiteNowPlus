const router = require("express").Router();

const {
  getMenu,
  getCategories,
  getProductById,
  getProductBySku,
  getProductsByCategory,
  getFeaturedProducts,
  getBestSellerProducts,
  getRecommendedProducts,
  searchMenu,
} = require("../data/menu");

// =======================================
// Full Menu
// =======================================

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: getMenu(),
  });
});

// =======================================
// Categories
// =======================================

router.get("/categories", (req, res) => {
  res.json({
    success: true,
    data: getCategories(),
  });
});

// =======================================
// Featured
// =======================================

router.get("/featured", (req, res) => {
  res.json({
    success: true,
    data: getFeaturedProducts(),
  });
});

// =======================================
// Best Sellers
// =======================================

router.get("/bestsellers", (req, res) => {
  res.json({
    success: true,
    data: getBestSellerProducts(),
  });
});

// =======================================
// Recommended
// =======================================

router.get("/recommended", (req, res) => {
  res.json({
    success: true,
    data: getRecommendedProducts(),
  });
});

// =======================================
// Search
// =======================================

router.get("/search", (req, res) => {
  const { q = "" } = req.query;

  res.json({
    success: true,
    data: searchMenu(q),
  });
});

// =======================================
// Category Products
// =======================================

router.get("/category/:category", (req, res) => {
  res.json({
    success: true,
    data: getProductsByCategory(
      req.params.category
    ),
  });
});

// =======================================
// Product By SKU
// =======================================

router.get("/sku/:sku", (req, res) => {
  const product = getProductBySku(
    req.params.sku
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

// =======================================
// Product By ID
// =======================================

router.get("/:id", (req, res) => {
  const product = getProductById(
    req.params.id
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

module.exports = router;