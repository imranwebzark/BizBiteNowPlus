import {
  Star,
  Clock3,
  Flame,
  Leaf,
  BadgePercent,
  ChefHat,
} from "lucide-react";

const ProductInfo = ({
  name,
  description,
  category,
  price,
  originalPrice,
  rating = 4.8,
  reviews = 0,
  preparationTime = "20-25 min",
  calories,
  isVeg = true,
  bestseller = false,
  available = true,
  tags = [],
}) => {
  const hasDiscount =
    Number(originalPrice) > Number(price);

  const discount = hasDiscount
    ? Math.round(
        ((originalPrice - price) / originalPrice) * 100
      )
    : 0;

  return (
    <section className="space-y-6">

      {/* Top */}

      <div className="flex flex-wrap items-start justify-between gap-4">

        <div className="flex-1">

          {/* Category */}

          <span
            className="
              inline-flex
              rounded-full

              bg-slate-100

              px-3
              py-1

              text-xs
              font-semibold

              text-slate-600
            "
          >
            {category}
          </span>

          {/* Title */}

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {name}
          </h1>

          {/* Description */}

          <p className="mt-3 leading-7 text-slate-600">
            {description}
          </p>

        </div>

        {/* Availability */}

        <div
          className="
            rounded-full

            px-4
            py-2

            text-sm
            font-semibold

            text-white
          "
          style={{
            background: available
              ? "var(--primary)"
              : "#DC2626",
          }}
        >
          {available ? "Available" : "Out of Stock"}
        </div>

      </div>

      {/* Stats */}

      <div className="flex flex-wrap gap-3">

        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">

          <Star
            size={16}
            fill="#FACC15"
            color="#FACC15"
          />

          <span className="font-semibold">
            {rating}
          </span>

          <span className="text-slate-500">
            ({reviews})
          </span>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">

          <Clock3 size={16} />

          {preparationTime}

        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">

          <Leaf
            size={16}
            color={isVeg ? "#16A34A" : "#DC2626"}
          />

          {isVeg ? "Veg" : "Non Veg"}

        </div>

        {calories && (
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">

            <Flame size={16} />

            {calories} kcal

          </div>
        )}

        {bestseller && (
          <div
            className="
              flex
              items-center
              gap-2

              rounded-full

              px-4
              py-2

              text-white
            "
            style={{
              background: "var(--primary)",
            }}
          >
            <ChefHat size={16} />

            Bestseller

          </div>
        )}

      </div>

      {/* Price */}

      <div className="flex flex-wrap items-end justify-between gap-5">

        <div>

          <div className="flex items-center gap-3">

            <span className="text-4xl font-bold text-slate-900">
              ₹{price}
            </span>

            {hasDiscount && (
              <span className="text-xl text-slate-400 line-through">
                ₹{originalPrice}
              </span>
            )}

          </div>

          {hasDiscount && (
            <div
              className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-white"
              style={{
                background: "var(--primary)",
              }}
            >
              <BadgePercent size={16} />

              {discount}% OFF
            </div>
          )}

        </div>

      </div>

      {/* Tags */}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3">

          {tags.map((tag) => (
            <div
              key={tag}
              className="
                rounded-full

                border
                border-slate-200

                bg-white

                px-4
                py-2

                text-sm
                font-medium

                text-slate-700
              "
            >
              {tag}
            </div>
          ))}

        </div>
      )}

    </section>
  );
};

export default ProductInfo;