import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryTabs from "../../components/customer/menu/CategoryTabs";
import ProductFilters from "../../components/customer/menu/ProductFilters";
import VegToggle from "../../components/customer/menu/VegToggle";
import SortDropdown from "../../components/customer/menu/SortDropdown";
import MenuGrid from "../../components/customer/menu/MenuGrid";
import ProductCard from "../../components/customer/menu/ProductCard";
import { useCart } from "../../context/CartContext";
import {
  getMenu,
  getCategories,
  getFavorites,
  toggleFavorite,
} from "../../api/customerApi";


const Menu = () => {
const {
  cartItems,
  addItem,
} = useCart();
  const navigate = useNavigate();


  const [categories, setCategories] =
    useState([]);


  const [menuData, setMenuData] =
    useState([]);

const CUSTOMER_ID = "CUSTOMER_001";

const [favorites, setFavorites] =
  useState([]);

  const [cursor, setCursor] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  const [loadingMore, setLoadingMore] =
    useState(false);


  const loadMoreRef =
    useRef(null);



  const [activeCategory, setActiveCategory] =
    useState("all");


  const [vegType, setVegType] =
    useState("all");


  const [sortBy, setSortBy] =
    useState("featured");



  const [filters, setFilters] =
    useState({
      bestseller:false,
      offers:false,
      rating:false,
      available:true,
    });



  const loadMenu = async(
    reset = false
  ) => {

    try {

      if(reset){

        setLoading(true);

      }
      else{

        setLoadingMore(true);

      }


      const response =
        await getMenu({
          limit:12,
          cursor: reset ? "" : cursor,
        });


      const newProducts =
        response.data.data;


      if(reset){

        setMenuData(
          newProducts
        );

      }
      else{

        setMenuData(
          prev => [
            ...prev,
            ...newProducts,
          ]
        );

      }


      setCursor(
        response.data.nextCursor
      );


    }
    catch(error){

      console.log(
        "Menu Loading Error:",
        error
      );

    }
    finally{

      setLoading(false);

      setLoadingMore(false);

    }

  };



  useEffect(()=>{


    const loadInitial =
    async()=>{

      try{

        const categoryResponse =
          await getCategories();


        setCategories(
          categoryResponse.data.data
        );


        await loadMenu(true);
const favoriteResponse =
  await getFavorites(CUSTOMER_ID);

setFavorites(
  favoriteResponse.data.data.map(
    (item) => item.productId
  )
);

      }
      catch(error){

        console.log(
          "Initial Menu Error",
          error
        );

      }

    };


    loadInitial();


  },[]);
    useEffect(() => {

    if(!loadMoreRef.current)
      return;


    const observer =
      new IntersectionObserver(
        (entries)=>{

          if(
            entries[0].isIntersecting &&
            cursor &&
            !loadingMore
          ){

            loadMenu();

          }

        },
        {
          threshold:1,
        }
      );


    observer.observe(
      loadMoreRef.current
    );


    return()=>{

      observer.disconnect();

    };


  },[
    cursor,
    loadingMore,
  ]);




  const filteredProducts =
    useMemo(()=>{

      let products =
        [...menuData];



if (activeCategory !== "all") {
  products = products.filter((item) => {
    const productCategory =
      (item.category?.id ??
        item.category ??
        "")
        .toString()
        .toLowerCase();

    const selectedCategory =
      activeCategory
        .toString()
        .toLowerCase();

    return productCategory === selectedCategory;
  });
}



      if(
        vegType === "veg"
      ){

        products =
          products.filter(
            (item)=>
              item.isVeg === true
          );

      }



      if(
        vegType === "nonveg"
      ){

        products =
          products.filter(
            (item)=>
              item.isVeg === false
          );

      }




      if(
        filters.available
      ){

        products =
          products.filter(
            (item)=>
              item.available
          );

      }




      if(
        filters.bestseller
      ){

        products =
          products.filter(
            (item)=>
              item.bestseller
          );

      }





      if(
        filters.rating
      ){

products =
  products.filter(
    (item)=>
      (item.rating?.average ?? 0) >= 4
  );

      }




      if(
        filters.offers
      ){

        products =
          products.filter(
            (item)=>
              item.originalPrice
          );

      }




switch (sortBy) {
  case "price-low":
    products.sort((a, b) => a.price - b.price);
    break;

  case "price-high":
    products.sort((a, b) => b.price - a.price);
    break;

  case "rating":
    products.sort(
      (a, b) =>
        (b.rating?.average ?? 0) -
        (a.rating?.average ?? 0)
    );
    break;

  case "popular":
    products.sort(
      (a, b) =>
        (b.rating?.count ?? 0) -
        (a.rating?.count ?? 0)
    );
    break;

  case "fastest":
    products.sort(
      (a, b) =>
        parseInt(a.preparationTime) -
        parseInt(b.preparationTime)
    );
    break;

  case "recommended":
  default:
    products.sort(
      (a, b) =>
        (b.featured ? 1 : 0) -
        (a.featured ? 1 : 0)
    );
}



      return products;


    },[
      menuData,
      activeCategory,
      vegType,
      filters,
      sortBy,
    ]);
    const handleFavorite = async (
  product
) => {
  try {
    await toggleFavorite({
      customerId: CUSTOMER_ID,
      productId: product.id,
    });

    const exists =
      favorites.includes(product.id);

    setFavorites((prev) =>
      exists
        ? prev.filter(
            (id) => id !== product.id
          )
        : [...prev, product.id]
    );

    alert(
      exists
        ? "Removed from favourites"
        : "Added to favourites"
    );
  } catch (err) {
    console.log(err);
  }
};
const getCartItem = (productId) =>
  cartItems.find(
    (item) => item.productId === productId
  );
      return (
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
    pb-28

    px-1
    sm:px-2

  "
>

      {/* Categories */}

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />



      {/* Filters */}

      <div
        className="
          flex
          flex-col
          gap-5
          px-4
          lg:px-6
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <VegToggle
            value={vegType}
            onChange={setVegType}
          />


          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
          />

        </div>



        <ProductFilters
          filters={filters}
          onChange={setFilters}

        />

      </div>




      {/* Products */}

      <section
        className="
          w-full
          space-y-6
          px-4
          lg:px-6
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Our Menu
          </h2>


          <p
            className="
              mt-1
              text-slate-500
            "
          >
            {filteredProducts.length} items available
          </p>

        </div>



        {
          loading ? (

            <div
              className="
                py-20
                text-center
                text-slate-500
              "
            >
              Loading menu...
            </div>


          ) : filteredProducts.length === 0 ? (


            <div
              className="
                rounded-[28px]
                border-2
                border-dashed
                border-slate-300
                bg-white
                px-6
                py-16
                text-center
              "
            >

              <h3
                className="
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                No Products Found
              </h3>


              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Try changing your filters.
              </p>


            </div>


          ) : (


            <>

              <MenuGrid>

                {
                  filteredProducts.map(
                    (product)=>(

<ProductCard
  key={product.id}
  product={product}
  quantity={
    getCartItem(product.id)?.quantity ?? 0
  }
  isFavourite={favorites.includes(product.id)}
  onFavourite={() =>
    handleFavorite(product)
  }
  onAdd={() =>
    addItem(product, 1)
  }
  onIncrease={() =>
    addItem(product, 1)
  }
  onDecrease={() => {
    const item = getCartItem(product.id);

    if (item) {
      updateItem(
        item.id,
        item.quantity - 1
      );
    }
  }}
  onClick={() =>
    navigate(
      `/customer/product/${product.id}`
    )
  }
/>

                    )
                  )
                }

              </MenuGrid>



              {/* Cursor Loader */}

              {
                cursor && (

                  <div
                    ref={loadMoreRef}
                    className="
                      flex
                      justify-center
                      py-8
                    "
                  >

                    {
                      loadingMore ? (

                        <p
                          className="
                            text-sm
                            text-slate-500
                          "
                        >
                          Loading more items...
                        </p>

                      ) : (

                        <div
                          className="
                            h-6
                          "
                        />

                      )
                    }

                  </div>

                )
              }


            </>

          )

        }


      </section>


    </div>
    </motion.div>

  );

};


export default Menu;