import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
} from "lucide-react";

const ProductGallery = ({
  images = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [preview, setPreview] = useState(false);

  if (!images.length) return null;

  const previous = () =>
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  const next = () =>
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  return (
    <>
      <section className="space-y-5">

        {/* Main Image */}

        <div className="relative overflow-hidden rounded-[28px]">

          <motion.img
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            src={images[activeIndex]}
            alt="Product"
            className="
              h-[300px]
              w-full
              object-cover

              sm:h-[420px]
            "
          />

          {/* Expand */}

          <button
            onClick={() => setPreview(true)}
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

              shadow-lg
            "
          >
            <Expand size={18} />
          </button>

          {/* Previous */}

          {images.length > 1 && (
            <button
              onClick={previous}
              className="
                absolute
                left-4
                top-1/2

                -translate-y-1/2

                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-2xl

                bg-white/90

                backdrop-blur

                shadow-lg
              "
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next */}

          {images.length > 1 && (
            <button
              onClick={next}
              className="
                absolute
                right-4
                top-1/2

                -translate-y-1/2

                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-2xl

                bg-white/90

                backdrop-blur

                shadow-lg
              "
            >
              <ChevronRight size={22} />
            </button>
          )}

        </div>

        {/* Thumbnails */}

        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`
                  shrink-0
                  overflow-hidden

                  rounded-2xl

                  border-2

                  transition-all

                  ${
                    activeIndex === index
                      ? ""
                      : "border-transparent"
                  }
                `}
                style={{
                  borderColor:
                    activeIndex === index
                      ? "var(--primary)"
                      : "transparent",
                }}
              >
                <img
                  src={image}
                  alt=""
                  className="
                    h-20
                    w-20
                    object-cover
                  "
                />
              </button>
            ))}
          </div>
        )}

      </section>

      {/* Fullscreen Preview */}

      <AnimatePresence>

        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[999]

              flex
              items-center
              justify-center

              bg-black/90
            "
          >
            <button
              onClick={() => setPreview(false)}
              className="
                absolute
                right-6
                top-6

                rounded-full

                bg-white

                p-3
              "
            >
              <X size={22} />
            </button>

            <motion.img
              initial={{
                scale: 0.95,
              }}
              animate={{
                scale: 1,
              }}
              src={images[activeIndex]}
              alt=""
              className="
                max-h-[90vh]
                max-w-[90vw]

                rounded-3xl

                object-contain
              "
            />
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
};

export default ProductGallery;