import MenuGrid from "./MenuGrid";
import ProductCard from "./ProductCard";

const ProductList = ({
  sections = [],
  cart = {},
  favourites = [],
  onProductClick,
  onFavourite,
  onAdd,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28"
        >
          {/* Section Header */}

          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {section.title}
              </h2>

              {section.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {section.description}
                </p>
              )}
            </div>

            <span
              className="
                rounded-full
                bg-slate-100
                px-4
                py-2
                text-sm
                font-medium
                text-slate-600
              "
            >
              {section.products.length} Items
            </span>
          </div>

          {/* Products */}

          <MenuGrid>
            {section.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                isFavourite={favourites.includes(product.id)}
                onClick={() => onProductClick?.(product)}
                onFavourite={() => onFavourite?.(product)}
                onAdd={() => onAdd?.(product)}
                onIncrease={() => onIncrease?.(product)}
                onDecrease={() => onDecrease?.(product)}
              />
            ))}
          </MenuGrid>
        </section>
      ))}
    </div>
  );
};

export default ProductList;