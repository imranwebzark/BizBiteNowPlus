import { Check } from "lucide-react";

const ProductVariants = ({
  title = "Choose Size",
  description = "",
  required = false,
  multiple = false,
  variants = [],
  selected = [],
  onChange,
}) => {
  const handleSelect = (id) => {
    if (multiple) {
      if (selected.includes(id)) {
        onChange?.(selected.filter((item) => item !== id));
      } else {
        onChange?.([...selected, id]);
      }
      return;
    }

    onChange?.([id]);
  };

  return (
    <section className="space-y-5">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            {title}
          </h3>

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}

        </div>

        {required && (
          <span
            className="
              rounded-full

              px-3
              py-1

              text-xs
              font-semibold

              text-white
            "
            style={{
              background: "var(--primary)",
            }}
          >
            Required
          </span>
        )}

      </div>

      {/* Variants */}

      <div className="grid gap-4">

        {variants.map((variant) => {
          const active = selected.includes(variant.id);

          return (
            <button
              key={variant.id}
              onClick={() => handleSelect(variant.id)}
              className={`
                flex
                items-center
                justify-between

                rounded-3xl

                border

                p-5

                text-left

                transition-all
                duration-300

                ${
                  active
                    ? "shadow-lg"
                    : "hover:shadow-md border-slate-200"
                }
              `}
              style={{
                borderColor: active
                  ? "var(--primary)"
                  : undefined,

                background: active
                  ? "var(--primary-light)"
                  : "#fff",
              }}
            >
              <div>

                <h4 className="font-semibold text-slate-900">
                  {variant.name}
                </h4>

                {variant.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {variant.description}
                  </p>
                )}

              </div>

              <div className="flex items-center gap-4">

                <span className="font-bold text-slate-900">

                  {variant.price > 0
                    ? `+ ₹${variant.price}`
                    : "Included"}

                </span>

                <div
                  className={`
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center

                    rounded-full

                    border-2

                    transition-all

                    ${
                      active
                        ? "text-white"
                        : "border-slate-300"
                    }
                  `}
                  style={{
                    background: active
                      ? "var(--primary)"
                      : "#fff",

                    borderColor: active
                      ? "var(--primary)"
                      : undefined,
                  }}
                >
                  {active && (
                    <Check
                      size={16}
                      strokeWidth={3}
                    />
                  )}
                </div>

              </div>

            </button>
          );
        })}

      </div>

    </section>
  );
};

export default ProductVariants;