import { Clock3, Star } from "lucide-react";

const HeroBanner = ({
  banner,
  logo,
  name,
  tagline,
  rating = 4.8,
  reviews = 1284,
  deliveryTime = "20-25 min",
  isOpen = true,
}) => {
  return (
    <section className="relative overflow-hidden rounded-[32px]">

      {/* Banner */}

      <div className="relative h-[260px] sm:h-[320px] lg:h-[420px]">

        <img
          src={banner}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/35" />

        {/* Theme Overlay */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 35%, var(--primary-light) 140%)",
          }}
        />

        {/* Floating Store Card */}

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5

            rounded-[28px]

            bg-white/90

            backdrop-blur-xl

            p-5

            shadow-xl
          "
        >

          <div className="flex items-center gap-5">

            {/* Logo */}

            <img
              src={logo}
              alt={name}
              className="
                h-20
                w-20

                rounded-3xl

                border-4
                border-white

                object-cover

                shadow-lg
              "
            />


            {/* Info */}

            <div className="flex-1">

              <h1 className="text-2xl font-bold text-slate-900">
                {name}
              </h1>


              <p className="mt-1 text-sm text-slate-500">
                {tagline}
              </p>


              <div className="mt-4 flex flex-wrap gap-2">

                {/* Rating */}

                <div
                  className="
                    flex
                    items-center
                    gap-1

                    rounded-full

                    bg-slate-100

                    px-3
                    py-1

                    text-sm
                  "
                >

                  <Star
                    size={15}
                    fill="gold"
                    color="gold"
                  />

                  {rating}

                  <span className="text-slate-500">
                    ({reviews})
                  </span>

                </div>


                {/* Delivery */}

                <div
                  className="
                    flex
                    items-center
                    gap-2

                    rounded-full

                    bg-slate-100

                    px-3
                    py-1

                    text-sm
                  "
                >

                  <Clock3 size={15} />

                  {deliveryTime}

                </div>


                {/* Status */}

                <div
                  className="
                    rounded-full

                    px-3
                    py-1

                    text-sm

                    font-semibold

                    text-white
                  "
                  style={{
                    background: isOpen
                      ? "var(--primary)"
                      : "#EF4444",
                  }}
                >

                  {isOpen ? "Open" : "Closed"}

                </div>


              </div>


            </div>


          </div>


        </div>


      </div>


    </section>
  );
};


export default HeroBanner;