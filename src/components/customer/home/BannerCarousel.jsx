import { useEffect, useRef, useState } from "react";

const BannerCarousel = ({
  banners = [],
  autoPlay = true,
  interval = 4000,
}) => {
  const [active, setActive] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return;

    const timer = setInterval(() => {
      setActive((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, banners.length, interval]);

  if (!banners.length) return null;

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;

    const distance =
      touchStartX.current - touchEndX.current;

    // Swipe Left
    if (distance > 50) {
      setActive((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }

    // Swipe Right
    if (distance < -50) {
      setActive((prev) =>
        prev === 0 ? banners.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="relative lg:hidden">
      <div
        className="relative h-44 overflow-hidden  rounded-[14px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={banners[active].image}
          alt={banners[active].title}
          className="
            h-full
            w-full
            object-cover
            select-none
            pointer-events-none
          "
          draggable={false}
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}

        <div className="absolute inset-0 flex flex-col justify-end p-5">
          {banners[active].tag && (
            <span
              className="
                mb-2
                w-fit
                 rounded-[7px]
                px-3
                py-1
                text-xs
                font-semibold
                text-white
              "
              style={{
                background: banners[active].isOpen
                  ? "#16A34A"
                  : "#DC2626",
              }}
            >
              {banners[active].tag}
            </span>
          )}

          <h2 className="text-xl font-bold text-white">
            {banners[active].title}
          </h2>

          {banners[active].subtitle && (
            <p className="mt-1 text-sm text-white/90">
              {banners[active].subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Indicators */}

      {banners.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-8"
                  : "w-2 bg-slate-300"
              }`}
              style={{
                background:
                  active === index
                    ? "var(--primary)"
                    : undefined,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BannerCarousel;