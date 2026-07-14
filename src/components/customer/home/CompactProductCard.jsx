import { Heart, Plus, Minus, Star } from "lucide-react";

const CompactProductCard = ({
  product,
  quantity = 0,
  isFavourite = false,
  onFavourite,
  onAdd,
  onIncrease,
  onDecrease,
  onClick,
}) => {
  if (!product) return null;

  const {
    image,
    name,
    price,
    originalPrice,
    rating,
    isVeg,
    available,
  } = product;

  return (
<div
  className="
    flex
    h-[320px]
    w-[170px]
    flex-shrink-0
    flex-col
    overflow-hidden
    rounded-[14px]
    border
    border-slate-200
    bg-white
    shadow-sm
    transition-all
    hover:shadow-md
  "
>
      {/* Image */}

      <div
        className="relative h-40 cursor-pointer bg-slate-100"
        onClick={onClick}
      >
        <img
          src={
            image ||
            "https://via.placeholder.com/400x300?text=Food"
          }
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/400x300?text=Food";
          }}
        />

        {/* Favourite */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite?.();
          }}
          className="
            absolute
            right-0
            top-0
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-transparent
                      "
        >
<Heart
  size={18}
  fill={isFavourite ? "#ff0000" : "#ffffff"}
  stroke={isFavourite ? "#ff0000" : "#ffffff"}
  style={{
    transition: "fill 0.2s ease, stroke 0.2s ease",
  }}
/>
        </button>

        {/* Veg */}

        <div
          className="
            absolute
            left-2
            top-2
            rounded-[10px]
            bg-white/90
            px-2
            py-1
            backdrop-blur
          "
        >
<div
  className={`w-3.5 h-3.5 flex items-center justify-center rounded-[2px] border ${
    isVeg ? "border-green-600" : "border-red-600"
  }`}
>
  <div
    className={`w-2 h-2 rounded-full ${
      isVeg ? "bg-green-600" : "bg-red-600"
    }`}
  />
</div>
        </div>
      </div>

      {/* Body */}

      <div className="flex flex-1 flex-col p-3">
<h3
  onClick={onClick}
  className="
    h-10
    line-clamp-2
    cursor-pointer
    text-sm
    font-semibold
    text-slate-900
  "
>
          {name}
        </h3>

        {/* Rating */}

        <div className="mt-3 flex h-5 items-center gap-1 text-xs">
          <Star
            size={14}
            fill="#FACC15"
            color="#FACC15"
          />
          <span className="font-medium">
            {rating?.average ?? 0}
          </span>
          <span className="text-slate-400">
            ({rating?.count ?? 0})
          </span>
        </div>

        {/* Bottom */}

        <div className="mt-auto flex items-center justify-between pt-3">
          <div>
            <div className="font-bold text-slate-900">
              ₹{price}
            </div>

            {originalPrice > price && (
              <div className="text-xs text-slate-400 line-through">
                ₹{originalPrice}
              </div>
            )}
          </div>

          {!available ? (
            <span className="text-xs font-semibold text-red-500">
              Out
            </span>
          ) : quantity > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onDecrease}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-slate-100
                "
              >
                <Minus size={14} />
              </button>

              <span className="w-4 text-center text-sm font-semibold">
                {quantity}
              </span>

              <button
                onClick={onIncrease}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-white
                "
                style={{
                  background: "var(--primary)",
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              className="
                rounded-xl
                px-3
                py-2
                text-xs
                font-semibold
                text-white
              "
              style={{
                background: "var(--primary)",
              }}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactProductCard;