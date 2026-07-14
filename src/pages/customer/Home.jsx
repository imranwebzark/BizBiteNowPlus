import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useCart } from "../../context/CartContext";

import HeroBanner from "../../components/customer/hero/HeroBanner";
import StoreCard from "../../components/customer/hero/StoreCard";
import HeroActions from "../../components/customer/hero/HeroActions";

import MenuGrid from "../../components/customer/menu/MenuGrid";
import ProductCard from "../../components/customer/menu/ProductCard";

/* ---------- New Mobile Components ---------- */


import BannerCarousel from "../../components/customer/home/BannerCarousel";
import QROrderCard from "../../components/customer/home/QROrderCard";
import DeliveryChecker from "../../components/customer/home/DeliveryChecker";
import HorizontalSection from "../../components/customer/home/HorizontalSection";

import {
  getStore,
  getMenu,
  getFavorites,
  getCurrentOrders,
  toggleFavorite,
} from "../../api/customerApi";

const Home = () => {
  const navigate = useNavigate();
  

  const [store, setStore] = useState(null);

  const [menuData, setMenuData] = useState([]);

  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const [recentProducts, setRecentProducts] = useState([]);

  const [offerProducts, setOfferProducts] = useState([]);
  const { cartItems, addItem, updateItem, removeItem } = useCart();
  const increaseQuantity = (product) => {
    const item = cartItems.find(
      (cartItem) => cartItem.productId === product.id,
    );

    if (!item) {
      addItem(product);
      return;
    }

    updateItem(item.id, item.quantity + 1);
  };

  const decreaseQuantity = (product) => {
    const item = cartItems.find(
      (cartItem) => cartItem.productId === product.id,
    );

    if (!item) return;

    if (item.quantity === 1) {
      removeItem(item.id);
      return;
    }

    updateItem(item.id, item.quantity - 1);
  };
  const loadData = async () => {
    try {
      const [storeRes, menuRes, favRes, orderRes] = await Promise.all([
        getStore(),
        getMenu(),
        getFavorites("CUSTOMER_001"),
        getCurrentOrders("CUSTOMER_001"),
      ]);

      const menu = menuRes.data.data || [];

      setStore(storeRes.data.data);

      setMenuData(menu);

      const favourites = favRes.data.data || [];

      setFavoriteProducts(
        menu.filter((item) =>
          favourites.some((fav) => fav.productId === item.id),
        ),
      );

      const orderedIds =
        orderRes.data.data?.items?.map((item) => item.productId) || [];

      setRecentProducts(menu.filter((item) => orderedIds.includes(item.id)));

      setOfferProducts(menu.filter((item) => item.originalPrice > item.price));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const favouriteCount = useMemo(
    () => favoriteProducts.length,
    [favoriteProducts],
  );

  const recentCount = useMemo(() => recentProducts.length, [recentProducts]);

  const offerCount = useMemo(() => offerProducts.length, [offerProducts]);
  const handleFavourite = async (productId) => {
    try {
      await toggleFavorite({
        customerId: "CUSTOMER_001",
        productId,
        storeId: store?.id || "STORE_001",
      });

      setFavoriteProducts((prev) => {
        const exists = prev.some((item) => item.id === productId);

        if (exists) {
          return prev.filter((item) => item.id !== productId);
        }

        const product = menuData.find((item) => item.id === productId);

        return product ? [...prev, product] : prev;
      });
    } catch (err) {
      console.error(err);
    }
  };
const isRestaurantOpen =
  store?.timings?.status?.toLowerCase() === "open";

const mobileBanners = [
  {
    id: 1,
    image:
      store?.coverImage ||
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
    title: store?.name || "BizBiteNow Kitchen",
    subtitle:
      store?.tagline ||
      "Fresh Food • Great Taste • Fast Delivery",
    tag: isRestaurantOpen
      ? "Open"
      : "Closed",
    isOpen: isRestaurantOpen,
  },

  {
    id: 2,
    image:
      store?.bannerImages?.[0] ||
      store?.coverImage ||
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
    title: "Fresh Ingredients",
    subtitle: "Prepared with premium quality ingredients.",
    tag: isRestaurantOpen
      ? "Open"
      : "Closed",
    isOpen: isRestaurantOpen,
  },

  {
    id: 3,
    image:
      store?.bannerImages?.[1] ||
      store?.coverImage ||
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    title: "Fast Delivery",
    subtitle: "Delivered hot and fresh to your doorstep.",
    tag: isRestaurantOpen
      ? "Open"
      : "Closed",
    isOpen: isRestaurantOpen,
  },
];
return (
  <motion.div
    initial={{
      opacity: 0,
      y: 15,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
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
    pb-28

    px-1
    sm:px-2
    lg:px-10
  "
>
      {/* ========================================================= */}
{/* Mobile Home */}
{/* ========================================================= */}

<div className="space-y-5 lg:hidden">
 <div className="px-1">

  </div>
  <div className="px-1">
  <BannerCarousel
    banners={mobileBanners.map((banner) => ({
      ...banner,
      image: store?.coverImage || banner.image,
    }))}
  />
  </div>
 <div className="px-1">
  <QROrderCard
    tableNumber={store?.tableNumber}
    onScan={() =>
      navigate("/customer/scan-qr")
    }
  />
  </div>
 <div className="px-1">
  <HorizontalSection
    title="Today's Offers 🔥"
    subtitle="Save more today."
    buttonText="View All"
    onViewAll={() =>
      navigate("/customer/menu")
    }
    products={offerProducts}
    cartItems={cartItems}
    favouriteProducts={favoriteProducts}
    onProductClick={(product) =>
      navigate(`/customer/product/${product.id}`)
    }
    onFavourite={handleFavourite}
    onAdd={addItem}
    onIncrease={increaseQuantity}
    onDecrease={decreaseQuantity}
  />
  </div>
 <div className="px-1">
  <DeliveryChecker
    location={store?.address?.city}
    onCheck={() =>
      navigate("/customer/address")
    }
  />
  </div>
 

  <HorizontalSection
    title="Your Favorites ❤️"
    subtitle="Your favourite dishes."
    buttonText="View All"
    onViewAll={() =>
      navigate("/customer/favorites")
    }
    products={favoriteProducts}
    cartItems={cartItems}
    favouriteProducts={favoriteProducts}
    onProductClick={(product) =>
      navigate(`/customer/product/${product.id}`)
    }
    onFavourite={handleFavourite}
    onAdd={addItem}
    onIncrease={increaseQuantity}
    onDecrease={decreaseQuantity}
  />


  <HorizontalSection
    title="Recently Ordered"
    subtitle="Order again in one tap."
    buttonText="Orders"
    onViewAll={() =>
      navigate("/customer/orders")
    }
    products={recentProducts}
    cartItems={cartItems}
    favouriteProducts={favoriteProducts}
    onProductClick={(product) =>
      navigate(`/customer/product/${product.id}`)
    }
    onFavourite={handleFavourite}
    onAdd={addItem}
    onIncrease={increaseQuantity}
    onDecrease={decreaseQuantity}
  />
  <section className="px-1">
    <button
      onClick={() =>
        navigate("/customer/menu")
      }
      className="
        w-full
        rounded-3xl
        py-4
        text-lg
        font-semibold
        text-white
      "
      style={{
        background: "var(--primary)",
      }}
    >
      Browse Full Menu
    </button>
  </section>
</div>


        <div
  className="
    hidden
    space-y-8
    lg:block

  "
>
  <HeroBanner
          banner={
            store?.coverImage ||
            "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
          }
          logo={
            store?.logo ||
            "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=200&q=80"
          }
          name={store?.name || "BizBiteNow Kitchen"}
          tagline={store?.tagline}
          rating={store?.rating}
          reviews={store?.totalReviews}
          isOpen={store?.timings?.status === "Open"}
        />

        <StoreCard
          address={
            store?.address
              ? `${store.address.line1}, ${store.address.city}, ${store.address.state}`
              : "Loading..."
          }
          phone={store?.phone || ""}
          distance={store?.distance || "2.4 km"}
          deliveryTime={store?.delivery?.averageTime || "25-35 mins"}
          isOpen={store?.timings?.status === "Open"}
          onCall={() => store?.phone && window.open(`tel:${store.phone}`)}
          onDirections={() => window.open("https://maps.google.com", "_blank")}
          onShare={() => {
            if (navigator.share) {
              navigator.share({
                title: store?.name,
                text: store?.tagline,
              });
            }
          }}
          onFavorite={() => navigate("/customer/favorites")}
          onBookTable={() => navigate("/customer/book-table")}
        />

        {/* Recently Ordered */}

        {recentCount > 0 && (
          <section className="space-y-6 px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Recently Ordered
                </h2>

                <p className="mt-1 text-slate-500">
                  Order your favourites again in one tap.
                </p>
              </div>

              <button
                onClick={() => navigate("/customer/orders")}
                className="
                text-sm
                font-semibold
                transition
                hover:opacity-80
              "
                style={{
                  color: "var(--primary)",
                }}
              >
                View Orders
              </button>
            </div>

            <MenuGrid>
              {recentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={
                    cartItems.find((item) => item.productId === product.id)
                      ?.quantity || 0
                  }
                  isFavourite={favoriteProducts.some(
                    (item) => item.id === product.id,
                  )}
                  onAdd={() => addItem(product)}
                  onIncrease={() => increaseQuantity(product)}
                  onDecrease={() => decreaseQuantity(product)}
                  onFavourite={() => handleFavourite(product.id)}
                  onClick={() => navigate(`/customer/product/${product.id}`)}
                />
              ))}
            </MenuGrid>
          </section>
        )}
        {/* Favourite Items */}

        {favouriteCount > 0 && (
          <section className="space-y-6 px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Favorites ❤️
                </h2>

                <p className="mt-1 text-slate-500">
                  Dishes you've marked as favourites.
                </p>
              </div>

              <button
                onClick={() => navigate("/customer/favorites")}
                className="
                text-sm
                font-semibold
                transition
                hover:opacity-80
              "
                style={{
                  color: "var(--primary)",
                }}
              >
                View All
              </button>
            </div>

            <MenuGrid>
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={
                    cartItems.find((item) => item.productId === product.id)
                      ?.quantity || 0
                  }
                  isFavourite={favoriteProducts.some(
                    (item) => item.id === product.id,
                  )}
                  onAdd={() => addItem(product)}
                  onIncrease={() => increaseQuantity(product)}
                  onDecrease={() => decreaseQuantity(product)}
                  onFavourite={() => handleFavourite(product.id)}
                  onClick={() => navigate(`/customer/product/${product.id}`)}
                />
              ))}
            </MenuGrid>
          </section>
        )}
        {/* Today's Offers */}

        {offerCount > 0 && (
          <section className="space-y-6 px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Today's Offers 🔥
                </h2>

                <p className="mt-1 text-slate-500">
                  Save more with exclusive deals available today.
                </p>
              </div>

              <button
                onClick={() => navigate("/customer/menu")}
                className="
                text-sm
                font-semibold
                transition
                hover:opacity-80
              "
                style={{
                  color: "var(--primary)",
                }}
              >
                View All Offers
              </button>
            </div>

            <MenuGrid>
              {offerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={
                    cartItems.find((item) => item.productId === product.id)
                      ?.quantity || 0
                  }
                  isFavourite={favoriteProducts.some(
                    (item) => item.id === product.id,
                  )}
                  onAdd={() => addItem(product)}
                  onIncrease={() => increaseQuantity(product)}
                  onDecrease={() => decreaseQuantity(product)}
                  onFavourite={() => handleFavourite(product.id)}
                  onClick={() => navigate(`/customer/product/${product.id}`)}
                />
              ))}
            </MenuGrid>
          </section>
        )}

        {/* Browse Full Menu */}

        <section className="px-2 sm:px-4 lg:px-6 xl:px-8">
          <div
            className="
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            text-center
            shadow-sm
          "
          >
            <h2 className="text-3xl font-bold text-slate-900">
              Looking for something else?
            </h2>

            <p className="mt-3 text-slate-500">
              Explore our complete menu with all categories, latest dishes,
              combos and beverages.
            </p>

            <button
              onClick={() => navigate("/customer/menu")}
              className="
              mt-6
              rounded-2xl
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
            "
              style={{
                background: "var(--primary)",
              }}
            >
              Browse Full Menu
            </button>
          </div>
        </section>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
