import { useMemo, useState } from "react";
import { Search, TicketPercent } from "lucide-react";

import CouponCard from "./CouponCard";

import Card from "../common/Card";
import Chip from "../common/Chip";
import EmptyState from "../common/EmptyState";
import SectionHeader from "../common/SectionHeader";

const tabs = [
  {
    id: "available",
    label: "Available",
  },

  {
    id: "expired",
    label: "Expired",
  },
];

const Coupons = ({
  coupons = [],
  usedCoupons = [],
  onApply,
  onCopy,
}) => {
  const [activeTab, setActiveTab] =
    useState("available");

  const [search, setSearch] =
    useState("");
const [copiedCode, setCopiedCode] = useState(null);
const handleCopy = (code) => {
  navigator.clipboard.writeText(code);
  setCopiedCode(code);

  setTimeout(() => {
    setCopiedCode(null);
  }, 2000);
};
  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const tabMatch =
        activeTab === "available"
          ? !coupon.expired &&
            !usedCoupons.includes(coupon.code)
          : activeTab === "applied"
          ? coupon.code === appliedCoupon
          : coupon.expired;

      const searchMatch =
        coupon.code
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        coupon.title
          .toLowerCase()
          .includes(search.toLowerCase());

      return tabMatch && searchMatch;
    });
  }, [
    coupons,
    activeTab,
    search,
    
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <SectionHeader
        title="Coupons"
        subtitle="Save more on every order."
      />

      {/* Search */}

      <Card shadow="none">
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search coupon..."
            className="
              w-full

              bg-transparent

              py-3
              pl-12
              pr-2

              outline-none

              text-slate-800
              placeholder:text-slate-400
            "
          />
        </div>
      </Card>

      {/* Tabs */}

      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <Chip
            key={tab.id}
            label={tab.label}
            selected={
              activeTab === tab.id
            }
            onClick={() =>
              setActiveTab(tab.id)
            }
          />
        ))}
      </div>

    
      {/* Coupons */}

      {filteredCoupons.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Coupons Found"
          description="No coupons available in this category."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredCoupons.map(
            (coupon) => (
            <CouponCard
              key={coupon.code}
              coupon={coupon}
              copied={copiedCode === coupon.code}
              onCopy={handleCopy}
              onApply={onApply}
            />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Coupons;