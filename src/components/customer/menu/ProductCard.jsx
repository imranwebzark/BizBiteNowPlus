import { motion } from "framer-motion";
import {
  Star,
  Clock3,
  Heart,
  Plus,
  Minus,
  Leaf,
} from "lucide-react";

import Card from "../common/Card";
import Badge from "../common/Badge";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";

const ProductCard = ({
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
  description,
  category,
  price,
  originalPrice,
  rating,
  preparationTime,
  isVeg,
  bestseller,
  available,
} = product;

  return (
    <Card
      padding="none"
      className="group"
    >
      {/* Image */}

{/* Image */}

<div
  onClick={onClick}
  className="
    relative
    h-56
    cursor-pointer
    overflow-hidden
    rounded-t-[28px]
    bg-slate-100
  "
>

  <img
    src={
      image ||
      "https://via.placeholder.com/600x400?text=Food+Image"
    }
    alt={name || "Food Item"}
    onError={(e) => {
      e.currentTarget.src =
        "https://via.placeholder.com/600x400?text=Image+Not+Found";
    }}
    className="
      h-full
      w-full
      object-cover
      transition
      duration-500
      group-hover:scale-105
    "
  />


  {/* Image Overlay */}

  <div
    className="
      absolute
      inset-0
      bg-gradient-to-t
      from-black/20
      via-transparent
      to-transparent
    "
  />

                {/* Favourite */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavourite?.();
          }}
          className="
            absolute
            right-4
            top-4

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-2xl

            bg-white/90

            backdrop-blur

            shadow-md

            transition

            hover:scale-105
          "
        >
          <Heart
            size={20}
            fill={isFavourite ? "currentColor" : "none"}
            style={{
              color: isFavourite
                ? "#EF4444"
                : "#64748B",
            }}
          />
        </button>

        {/* Bestseller */}

        {bestseller && (
          <Badge
            variant="premium"
            className="absolute left-4 top-4"
          >
            Bestseller
          </Badge>
        )}

        {/* Veg / Non Veg */}

        <div className="absolute bottom-4 left-4">
          <Badge
            icon={false}
            className="bg-white/90 text-slate-700 backdrop-blur"
          >
            <div className="flex items-center gap-2">
              <Leaf
                size={15}
                color={
                  isVeg
                    ? "#16A34A"
                    : "#DC2626"
                }
              />

              <span>
                {isVeg
                  ? "Veg"
                  : "Non Veg"}
              </span>
            </div>
          </Badge>
        </div>

      </div>
            {/* Body */}

      <div className="space-y-4 p-5">

        {/* Category */}

        <Badge
          variant="info"
          icon={false}
          className="w-fit"
        >
          {category}
        </Badge>

        {/* Name */}

        <h3
          onClick={onClick}
          className="
            cursor-pointer

            text-xl
            font-bold

            text-slate-900

            transition-colors

            hover:text-[var(--primary)]
          "
        >
          {name}
        </h3>

        {/* Description */}

        <p
          className="
            line-clamp-2

            text-sm

            leading-6

            text-slate-500
          "
        >
          {description}
        </p>

        {/* Rating */}

<div className="flex flex-wrap items-center gap-4">

  <div className="flex items-center gap-1">

    <Star
      size={16}
      fill="#FACC15"
      color="#FACC15"
    />

    <span className="font-semibold">
      {rating?.average ?? 0}
    </span>

    <span className="text-sm text-slate-500">
      ({rating?.count ?? 0})
    </span>

  </div>

  <div className="flex items-center gap-2 text-sm text-slate-500">

    <Clock3 size={15} />

    <span>{preparationTime}</span>

  </div>

</div>
              {/* Price & Cart */}

      <div
        className="
          flex
          items-end
          justify-between
          gap-4

          border-t
          border-slate-100

          p-5
        "
      >
        {/* Price */}

        <div>

          <div className="flex items-center gap-2">

            <span className="text-2xl font-bold text-slate-900">
              ₹{price}
            </span>

            {originalPrice && originalPrice > price && (
              <span className="text-sm text-slate-400 line-through">
                ₹{originalPrice}
              </span>
            )}

          </div>

        </div>

        {/* Actions */}

        {available ? (
          quantity > 0 ? (
            <div className="flex items-center gap-3">

              <SecondaryButton
                size="sm"
                onClick={onDecrease}
                className="!h-10 !w-10 !min-w-[40px] !rounded-xl !p-0"
              >
                <Minus size={16} />
              </SecondaryButton>

              <span className="min-w-[24px] text-center text-lg font-bold">
                {quantity}
              </span>

              <PrimaryButton
                size="sm"
                onClick={onIncrease}
                className="!h-10 !w-10 !min-w-[40px] !rounded-xl !p-0"
              >
                <Plus size={16} />
              </PrimaryButton>

            </div>
          ) : (
            <PrimaryButton
              icon={Plus}
              onClick={onAdd}
            >
              Add
            </PrimaryButton>
          )
        ) : (
          <Badge
            variant="danger"
            icon={false}
          >
            Out of Stock
          </Badge>
        )}

      </div>
</div>
    </Card>
  );
};

export default ProductCard;