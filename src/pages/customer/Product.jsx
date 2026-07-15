import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useCart } from "../../context/CartContext";

import ProductHero from "../../components/customer/product/ProductHero";
import ProductGallery from "../../components/customer/product/ProductGallery";
import ProductInfo from "../../components/customer/product/ProductInfo";
import ProductVariants from "../../components/customer/product/ProductVariants";
import Addons from "../../components/customer/product/Addons";
import QuantitySelector from "../../components/customer/product/QuantitySelector";
import Reviews from "../../components/customer/product/Reviews";
import AddToCartBar from "../../components/customer/product/AddToCartBar";

import { getProduct } from "../../api/customerApi";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItem } = useCart();

  // =========================
  // State
  // =========================

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [selectedVariant, setSelectedVariant] =
    useState(null);

  const [selectedAddons, setSelectedAddons] =
    useState([]);

  // =========================
  // Fetch Product
  // =========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await getProduct(id);

        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // Default Variant
  // =========================

  useEffect(() => {
    if (
      product?.variants &&
      product.variants.length > 0
    ) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // =========================
  // Toggle Addon
  // =========================

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find(
        (item) => item.id === addon.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== addon.id
        );
      }

      return [...prev, addon];
    });
  };

  // =========================
  // Total Price
  // =========================
const itemPrice = useMemo(() => {
  const basePrice = Number(
    selectedVariant?.price ?? product?.price ?? 0
  );

  const addonPrice = selectedAddons.reduce(
    (sum, addon) => sum + Number(addon.price ?? 0),
    0
  );

  return basePrice + addonPrice;
}, [
  product,
  selectedVariant,
  selectedAddons,
]);

const totalPrice = itemPrice * quantity;
  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  // =========================
  // Product Not Found
  // =========================

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-slate-600">
          Product not found.
        </h2>
      </div>
    );
  }  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="space-y-6"
    >
      <div
        className="
          w-full
          min-w-0
          max-w-[1760px]
          space-y-6
          pb-32
          px-1
          sm:px-2
          lg:px-10
        "
      >
        {/* Hero */}

        <ProductHero
          image={product.image}
          name={product.name}
          onBack={() => navigate(-1)}
        />

        {/* Gallery */}

        {/* <ProductGallery
          images={
            product.gallery?.length
              ? product.gallery
              : [product.image]
          }
        /> */}

        <div className="space-y-8 px-4 lg:px-6">

          {/* Product Info */}

          <ProductInfo
            product={product}
          />

          {/* Choose Size */}

          {product.variants?.length > 0 && (
            <ProductVariants
              variants={product.variants}
              selected={
                selectedVariant
                  ? [selectedVariant.id]
                  : []
              }
              onChange={(ids) => {
                const variant =
                  product.variants.find(
                    (item) =>
                      item.id === ids[0]
                  );

                setSelectedVariant(
                  variant
                );
              }}
            />
          )}

          {/* Addons */}

          {product.addons?.length > 0 && (
            <Addons
              addons={product.addons}
              selectedAddons={
                selectedAddons
              }
              onToggle={toggleAddon}
            />
          )}

          {/* Quantity */}

          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
          />

          {/* Reviews */}

          <Reviews
            product={product}
          />

        </div>

        {/* Sticky Cart */}

    <AddToCartBar
  quantity={quantity}
  total={totalPrice}
  onQuantityChange={setQuantity}
  onAddToCart={() => {
    addItem({
      ...product,
      quantity,
      selectedVariant,
      selectedAddons,
      itemPrice,
      totalPrice,
    });

    navigate("/customer/cart");
  }}
/>

      </div>
    </motion.div>
  );
};

export default Product;