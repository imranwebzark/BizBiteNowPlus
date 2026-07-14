import {
  CheckCircle2,
  Circle,
  PackageCheck,
  ChefHat,
  Bike,
  Home,
} from "lucide-react";

const getIcon = (title) => {
  switch (title.toLowerCase()) {
    case "order placed":
      return PackageCheck;

    case "preparing food":
      return ChefHat;

    case "out for delivery":
      return Bike;

    case "delivered":
      return Home;

    default:
      return Circle;
  }
};

const OrderTimeline = ({
  currentStep = "placed",
  timeline = [],
}) => {
 const currentIndex = Math.max(
  0,
  timeline.findIndex(
    (step) => step.id === currentStep
  )
);

  return (
    <section
      className="
        rounded-[30px]
        border
        border-slate-200
        bg-white
        p-6
      "
    >
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">
          Order Tracking
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track your order in real time.
        </p>
      </div>

      {/* Timeline */}

      <div className="relative">

        {/* Progress Line */}

        <div
          className="
            absolute
            left-[23px]
            top-0

            h-full
            w-[3px]

            rounded-full

            bg-slate-200
          "
        />

        {/* Active Progress */}

        <div
          className="
            absolute
            left-[23px]
            top-0

            w-[3px]

            rounded-full

            transition-all
            duration-700
          "
          style={{
            background: "var(--primary)",
            height:
              timeline.length <= 1
                ? "0%"
                : `${(currentIndex /
                    (timeline.length - 1)) *
                    100}%`,
          }}
        />

        <div className="space-y-8">

          {timeline.map((step, index) => {
           const Icon = getIcon(step.title);

            const completed =
              index <= currentIndex;

            const active =
              index === currentIndex;

            return (
              <div
                key={step.id}
                className="relative flex gap-5"
              >
                {/* Icon */}

                <div
                  className={`
                    relative
                    z-10

                    flex
                    h-12
                    w-12
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    border-2

                    transition-all
                    duration-300
                  `}
                  style={{
                    background: completed
                      ? "var(--primary)"
                      : "#fff",

                    borderColor: completed
                      ? "var(--primary)"
                      : "#CBD5E1",

                    color: completed
                      ? "#fff"
                      : "#64748B",

                    transform: active
                      ? "scale(1.08)"
                      : "scale(1)",
                  }}
                >
                  <Icon size={22} />
                </div>

                {/* Content */}

                <div className="flex-1 pt-1">

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <h3
                      className={`
                        text-lg
                        font-semibold

                        ${
                          completed
                            ? "text-slate-900"
                            : "text-slate-500"
                        }
                      `}
                    >
                      {step.title}
                    </h3>

                    <span
                      className={`
                        text-sm

                        ${
                          completed
                            ? "text-slate-700"
                            : "text-slate-400"
                        }
                      `}
                    >
                      {step.time || "--"}
                    </span>

                  </div>

                  {step.description && (
                    <p
                      className={`
                        mt-2
                        text-sm
                        leading-6

                        ${
                          completed
                            ? "text-slate-600"
                            : "text-slate-400"
                        }
                      `}
                    >
                      {step.description}
                    </p>
                  )}

                  {active && (
                    <div
                      className="
                        mt-3

                        inline-flex
                        items-center

                        rounded-full

                        px-3
                        py-1

                        text-xs
                        font-semibold

                        text-white
                      "
                      style={{
                        background:
                          "var(--primary)",
                      }}
                    >
                      Current Status
                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default OrderTimeline;