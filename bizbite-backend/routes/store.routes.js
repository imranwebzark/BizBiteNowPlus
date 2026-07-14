const router = require("express").Router();

const {
  getStore,
  updateStore,
} = require("../data/store");

// =======================================
// Get Store
// =======================================

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: getStore(),
  });
});

// =======================================
// Update Store
// =======================================

router.patch("/", (req, res) => {
  const store = updateStore(req.body);

  res.json({
    success: true,
    message: "Store updated successfully.",
    data: store,
  });
});

// =======================================
// Store Status
// =======================================

router.get("/status", (req, res) => {
  const store = getStore();

  res.json({
    success: true,
    data: {
      isOpen: store.isOpen,
      averageDeliveryTime: store.averageDeliveryTime,
      rating: store.rating,
      reviews: store.reviews,
    },
  });
});

// =======================================
// Contact Details
// =======================================

router.get("/contact", (req, res) => {
  const store = getStore();

  res.json({
    success: true,
    data: store.contact,
  });
});

// =======================================
// Address
// =======================================

router.get("/address", (req, res) => {
  const store = getStore();

  res.json({
    success: true,
    data: store.address,
  });
});

module.exports = router;