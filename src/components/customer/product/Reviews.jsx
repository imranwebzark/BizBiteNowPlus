import { useMemo, useState } from "react";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  Image as ImageIcon,
} from "lucide-react";

const Reviews = ({
  rating = 4.8,
  totalReviews = 0,
  reviews = [],
}) => {
  const [selectedRating, setSelectedRating] = useState("all");

  const filteredReviews = useMemo(() => {
    if (selectedRating === "all") return reviews;

    return reviews.filter(
      (review) => review.rating === Number(selectedRating)
    );
  }, [reviews, selectedRating]);

  const distribution = useMemo(() => {
    const result = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      result[review.rating]++;
    });

    return result;
  }, [reviews]);

  return (
    <section className="space-y-8">

      {/* Rating Summary */}

      <div
        className="
          rounded-[32px]
          border
          border-slate-200
          bg-white
          p-6
        "
      >
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">

          {/* Left */}

          <div className="text-center">

            <div className="flex justify-center">
              <Star
                size={38}
                fill="#FACC15"
                color="#FACC15"
              />
            </div>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              {rating}
            </h2>

            <p className="mt-2 text-slate-500">
              {totalReviews.toLocaleString()} Reviews
            </p>

          </div>

          {/* Distribution */}

          <div className="space-y-3">

            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star];

              const percentage =
                totalReviews > 0
                  ? (count / totalReviews) * 100
                  : 0;

              return (
                <div
                  key={star}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 text-sm font-medium">
                    {star} ★
                  </div>

                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">

                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        background: "var(--primary)",
                      }}
                    />

                  </div>

                  <span className="w-10 text-right text-sm text-slate-500">
                    {count}
                  </span>

                </div>
              );
            })}

          </div>

        </div>
      </div>

      {/* Filter */}

      <div className="flex gap-3 overflow-x-auto scrollbar-hide">

        {[
          "all",
          "5",
          "4",
          "3",
          "2",
          "1",
        ].map((item) => {
          const active = selectedRating === item;

          return (
            <button
              key={item}
              onClick={() => setSelectedRating(item)}
              className={`
                shrink-0
                rounded-full
                border
                px-5
                py-2.5
                text-sm
                font-semibold
                transition-all

                ${
                  active
                    ? "text-white"
                    : "border-slate-200 bg-white text-slate-700"
                }
              `}
              style={{
                background: active
                  ? "var(--primary)"
                  : undefined,

                borderColor: active
                  ? "var(--primary)"
                  : undefined,
              }}
            >
              {item === "all"
                ? "All Reviews"
                : `${item} ★`}
            </button>
          );
        })}

      </div>

      {/* Reviews */}

      <div className="space-y-5">

        {filteredReviews.map((review) => (
          <article
            key={review.id}
            className="
              rounded-[28px]
              border
              border-slate-200
              bg-white
              p-6
            "
          >
            {/* Header */}

            <div className="flex items-start justify-between gap-4">

              <div className="flex gap-4">

                <img
                  src={review.avatar}
                  alt={review.name}
                  className="
                    h-14
                    w-14
                    rounded-full
                    object-cover
                  "
                />

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {review.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">

                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-3
                        py-1
                        text-xs
                      "
                    >
                      {review.rating} ★
                    </span>

                    {review.verified && (
                      <div
                        className="
                          flex
                          items-center
                          gap-1
                          text-xs
                          font-medium
                        "
                        style={{
                          color: "var(--primary)",
                        }}
                      >
                        <CheckCircle2 size={14} />

                        Verified Purchase

                      </div>
                    )}

                  </div>

                </div>

              </div>

              <span className="text-sm text-slate-400">
                {review.date}
              </span>

            </div>

            {/* Review */}

            <p className="mt-5 leading-7 text-slate-600">
              {review.comment}
            </p>

            {/* Images */}

            {review.images?.length > 0 && (
              <div className="mt-5 flex gap-3 overflow-x-auto scrollbar-hide">

                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="
                      h-24
                      w-24
                      rounded-2xl
                      object-cover
                    "
                  />
                ))}

              </div>
            )}

            {/* Seller Reply */}

            {review.reply && (
              <div
                className="
                  mt-5

                  rounded-2xl

                  border

                  p-4
                "
                style={{
                  borderColor: "var(--primary-border)",
                  background: "var(--primary-light)",
                }}
              >
                <h4
                  className="font-semibold"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  Restaurant Reply
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {review.reply}
                </p>

              </div>
            )}

            {/* Footer */}

            <div className="mt-5 flex items-center gap-6">

              <button
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-500
                "
              >
                <ThumbsUp size={16} />

                Helpful ({review.helpful})

              </button>

              {review.images?.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <ImageIcon size={16} />

                  {review.images.length} Photos

                </div>
              )}

            </div>

          </article>
        ))}

      </div>

    </section>
  );
};

export default Reviews;