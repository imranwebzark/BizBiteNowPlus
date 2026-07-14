import { QrCode, ArrowRight } from "lucide-react";

const QROrderCard = ({
  tableNumber,
  onScan,
}) => {
  return (
    <section className="lg:hidden">
      <div
        className="
          relative
          overflow-hidden
          rounded-[14px]
          bg-gradient-to-r
          from-[var(--primary)]
          to-[#0f7a3d]
          p-5
          text-white
          shadow-lg
        "
      >
        {/* Decorative Circle */}

        <div
          className="
            absolute
            -right-10
            -top-10
            h-32
            w-32
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            -bottom-8
            -left-8
            h-24
            w-24
            rounded-full
            bg-white/10
          "
        />

        <div className="relative flex items-center justify-between gap-4">
          {/* Left */}

          <div className="flex-1">
            <span
              className="
                inline-flex
                rounded-[10px]
                bg-white/20
                px-3
                py-1
                text-xs
                font-semibold
              "
            >
              Dine-In
            </span>

            <h2 className="mt-3 text-xl font-bold">
              Ordering from your table?
            </h2>

            <p className="mt-2 text-sm text-white/90">
              Scan the QR code to order directly from your table without waiting.
            </p>

            {tableNumber && (
              <div className="mt-4">
                <span
                  className="
                    rounded-full
                    bg-white/20
                    px-3
                    py-1
                    text-sm
                    font-semibold
                  "
                >
                  Table #{tableNumber}
                </span>
              </div>
            )}
          </div>

          {/* QR Icon */}

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-[14px]
              bg-white
              shadow-lg
            "
          >
            <QrCode
              size={70}
              style={{
                color: "var(--primary)",
              }}
            />
          </div>
        </div>

        {/* Button */}

        <button
          onClick={onScan}
          className="
            relative
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-[14px]
            bg-white
            py-3.5
            font-semibold
            transition
            hover:scale-[1.02]
          "
          style={{
            color: "var(--primary)",
          }}
        >
          Scan QR Code

          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default QROrderCard;