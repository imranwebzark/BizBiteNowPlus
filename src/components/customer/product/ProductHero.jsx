import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";

const ProductHero = ({
  image,
  name,
  isFavourite = false,
  onBack,
  onFavourite,
  onShare,
}) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        relative
        overflow-hidden

        rounded-b-[36px]

        bg-slate-100
      "
    >
      {/* Image */}

      <div
        className="
          relative

          h-[320px]
          sm:h-[420px]
          lg:h-[520px]
        "
      >
        <img
          src={image}
          alt={name}
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />

        {/* Top Actions */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0

            flex
            items-center
            justify-between

            p-5
          "
        >
          {/* Back */}

          <button
            onClick={onBack}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-white/90
              backdrop-blur

              shadow-lg

              transition

              hover:scale-105
            "
          >
            <ArrowLeft size={22} />
          </button>

          <div className="flex items-center gap-3">

            {/* Favourite */}

            <button
              onClick={onFavourite}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-2xl

                bg-white/90
                backdrop-blur

                shadow-lg

                transition

                hover:scale-105
              "
            >
              <Heart
                size={21}
                fill={isFavourite ? "currentColor" : "none"}
                style={{
                  color: isFavourite
                    ? "var(--primary)"
                    : "#334155",
                }}
              />
            </button>

            {/* Share */}

            <button
              onClick={onShare}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-2xl

                bg-white/90
                backdrop-blur

                shadow-lg

                transition

                hover:scale-105
              "
            >
              <Share2 size={20} />
            </button>

          </div>
        </div>

        {/* Product Name */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0

            p-6
            sm:p-8
          "
        >
          <motion.h1
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
            className="
              text-3xl
              font-bold

              text-white

              sm:text-4xl
            "
          >
            {name}
          </motion.h1>
        </div>

      </div>
    </motion.section>
  );
};

export default ProductHero;