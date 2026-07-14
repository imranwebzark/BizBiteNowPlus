import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Save,
  Users,
  Award,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  getLoyaltySettings,
  updateLoyaltySettings,
  getStampLevelBreakdown,
} from "../../../api/loyalty";
// Temporary
// Replace with backend subscription later
const isPlusUser = true;
const REWARD_PRESETS = {
  item: "Free dessert",
  discount: "20% off next order",
  delivery: "Free delivery",
};

const LoyaltySettingsCard = () => {
  const [settings, setSettings] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  useEffect(() => {
    let cancelled = false;

    Promise.all([getLoyaltySettings(), getStampLevelBreakdown()])
      .then(([s, b]) => {
        if (cancelled) return;

        setSettings(s);
        setBreakdown(b);
      })
      .catch((err) => {
        if (cancelled) return;

        setLoadError(err.message);

        setSettings({
          active: true,
          threshold: 5,
          rewardType: "item",
          rewardDetail: "Free dessert",
        });

        setBreakdown({
          1: 18,
          2: 22,
          3: 14,
          4: 9,
          5: 6,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);

    try {
      await updateLoyaltySettings(settings);
    } catch (err) {
      console.error("Couldn't save loyalty settings", err);
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500">
        Loading loyalty settings...
      </div>
    );
  }

  const maxCount = Math.max(1, ...Object.values(breakdown || {}));

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#16522d]/10 p-3">
            <Gift size={22} className="text-[#16522d]" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#16522d]">
              Customer Loyalty
            </h2>

            <p className="text-sm text-slate-500">
              Configure your customer loyalty programme.
            </p>
          </div>
        </div>

        <span className="rounded-full bg-[#ffc700]/20 px-3 py-1 text-sm font-semibold text-[#16522d]">
          Plus
        </span>
      </div>

      <div className="relative">

  {!isPlusUser && (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-b-2xl bg-white/75 backdrop-blur-sm">

      <div className="mx-6 max-w-md rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-xl">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <Gift
            size={30}
            className="text-amber-500"
          />
        </div>

        <h3 className="text-2xl font-bold text-slate-800">
          Loyalty Program
        </h3>

        <p className="mt-3 text-sm text-slate-500">
          Reward repeat customers with digital stamp cards, discounts and free rewards.
        </p>

        <button
          className="mt-6 rounded-xl bg-[#16522d] px-6 py-3 font-semibold text-white hover:bg-[#124324]"
        >
          Upgrade to BizBite Plus
        </button>

      </div>

    </div>
  )}

  <div
    className={`space-y-6 p-6 ${
      !isPlusUser
        ? "pointer-events-none select-none opacity-40 blur-[2px]"
        : ""
    }`}
  >
        {/* Loyalty Programme */}
        <div className="rounded-xl border border-slate-200 bg-[#f8faf8] p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-[#16522d]">
                Loyalty Programme
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {settings.active
                  ? "Customers are currently earning stamps."
                  : "Programme is paused."}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSettings({
                  ...settings,
                  active: !settings.active,
                })
              }
              className="transition"
            >
              {settings.active ? (
                <ToggleRight size={42} className="text-[#16522d]" />
              ) : (
                <ToggleLeft size={42} className="text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Reward Settings */}
        <div
          className={`rounded-xl border border-slate-200 bg-[#f8faf8] p-5 space-y-5 ${
            !settings.active ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <Award size={18} className="text-[#16522d]" />

            <h3 className="font-semibold text-[#16522d]">Reward Settings</h3>
          </div>

          <div className="">
            <label className="mb-2 block text-sm font-medium text-[#16522d] text-left">
              Stamps Required
            </label>

            <div className="flex gap-3 ">
              {[5, 7, 10].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setSettings({
                      ...settings,
                      threshold: value,
                    })
                  }
                  className={`rounded-xl px-5 py-2 font-semibold transition ${
                    settings.threshold === value
                      ? "bg-[#16522d] text-white"
                      : "border border-slate-300 bg-white text-[#16522d] hover:bg-slate-100"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            <p className="mt-2 text-sm text-slate-500 text-left">
              One stamp is awarded per completed order.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#16522d]">
              Reward Type
            </label>

            <select
              value={settings.rewardType}
              onChange={(e) => {
                const rewardType = e.target.value;

                setSettings({
                  ...settings,
                  rewardType,
                  rewardDetail: REWARD_PRESETS[rewardType],
                });
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#16522d] focus:ring-2 focus:ring-[#16522d]/20"
            >
              <option value="item">Free Item</option>

              <option value="discount">Discount</option>

              <option value="delivery">Free Delivery</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#16522d]">
              Reward Details
            </label>

            <input
              value={settings.rewardDetail}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  rewardDetail: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#16522d] focus:ring-2 focus:ring-[#16522d]/20"
              placeholder="Free dessert"
            />

            <p className="mt-2 text-sm text-slate-500">
              Reward is automatically applied when customers complete their
              stamp card.
            </p>
          </div>
        </div>
        {/* Customer Breakdown */}
        

        {/* Status */}
        {saving && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
            Saving loyalty settings...
          </div>
        )}

      </div>
            </div>



      {/* Footer */}
      <div className="flex justify-end border-t border-slate-200 px-6 py-5">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-[#ffc700] px-6 py-3 font-semibold text-[#16522d] transition hover:bg-[#e6b800] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={18} />

          {saving ? "Saving..." : "Save Loyalty Settings"}
        </button>
      </div>
    </motion.section>
  );
};

export default LoyaltySettingsCard;
