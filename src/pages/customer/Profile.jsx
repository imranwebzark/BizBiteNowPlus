import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, saveProfile, logoutCustomer } from "../../api/customer/authApi";
import {
  Bell, Crown, Wallet, Gift, ClipboardList, MapPin,
  CreditCard, HelpCircle, LogOut, ChevronRight,
  X, Banknote, Smartphone, Check, Home, Loader2,
  Flame, Utensils, Sandwich, Wine,
  Headphones, Search, Truck, ReceiptText, ChevronDown,
  MessageCircle, Phone, Mail,
} from "lucide-react";
import NotificationPanel from "../../components/customer/NotificationPanel";
import { allProducts } from "../../data/products";
import { motion } from "framer-motion";

const ORANGE = "#E8622D";
const CREAM = "#FBE7DD";
const CHARCOAL = "#1C1C1C";

const wallet = { balance: 0 };
const rewards = { points: 0 };

const rewardsData = { points: 2450, pointsToNext: 550, tier: "Plus member" };
const rewardsProgress = Math.round(
  (rewardsData.points / (rewardsData.points + rewardsData.pointsToNext)) * 100,
);
const rewardTiers = [
  { icon: Utensils, label: "Free side", pts: 500 },
  { icon: Sandwich, label: "Free entree", pts: 1200 },
  { icon: Wine, label: "Free drink", pts: 300 },
  { icon: Gift, label: "Surprise box", pts: 2400 },
];
const recentRewardActivity = [
  { label: "Order #4821", delta: 120 },
  { label: "Redeemed free drink", delta: -300 },
  { label: "Order #4790", delta: 95 },
];

const helpQuickActions = [
  { icon: Truck, label: "Delivery and tracking" },
  { icon: ReceiptText, label: "Refunds and cancellations" },
  { icon: Utensils, label: "Menu and orders" },
  { icon: CreditCard, label: "Payments and billing" },
];

const faqItems = [
  { q: "Where is my order?", a: "Track your order in real time from the My Orders tab." },
  { q: "How do I get a refund?", a: "Refunds are processed within 3-5 business days after approval." },
  { q: "Can I edit my order after placing it?", a: "You can edit an order within 2 minutes of placing it, from My Orders." },
  { q: "Do you offer table reservations?", a: "Table reservations aren't available yet — we're working on it!" },
];

const notificationTags = ["New", "Offer", "Trending", "Back in stock", "Chef's pick"];
const notifications = allProducts.slice(0, 5).map((p, i) => ({
  id: p.id,
  image: p.image,
  tag: notificationTags[i % notificationTags.length],
  title: p.name,
  meta: p.category,
  price: p.price,
}));

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showAddresses, setShowAddresses] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [helpSearch, setHelpSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({ name: "", phone: "", address: "" });
  const [addressErrors, setAddressErrors] = useState({});
  const [locLoading, setLocLoading] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch(() => navigate("/customer/onboarding", { replace: true }));
  }, [navigate]);

  const handleLogout = async () => {
    await logoutCustomer();
    navigate("/", { replace: true });
  };

  const openAddresses = () => {
    setAddressForm({ name: user.name || "", phone: user.phone || "", address: user.address || "" });
    setAddressErrors({});
    setEditingAddress(false);
    setShowAddresses(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
    if (addressErrors[name]) setAddressErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getAddressLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported. Please enter address manually.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await res.json();
          setAddressForm((prev) => ({
            ...prev,
            address: data.display_name || `${latitude}, ${longitude}`,
          }));
        } catch {
          setAddressForm((prev) => ({
            ...prev,
            address: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          }));
        }
        setLocLoading(false);
      },
      () => {
        alert("Could not get location. Please enter your address manually.");
        setLocLoading(false);
      },
    );
  };

  const validateAddress = () => {
    const errs = {};
    if (!addressForm.name.trim()) errs.name = "Name is required";
    if (!addressForm.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(addressForm.phone.trim()))
      errs.phone = "Enter a valid 10-digit mobile number";
    if (!addressForm.address.trim()) errs.address = "Address is required";
    return errs;
  };

  const handleSaveAddress = async () => {
    const errs = validateAddress();
    if (Object.keys(errs).length > 0) {
      setAddressErrors(errs);
      return;
    }
    setSavingAddress(true);
    try {
      const { user: updatedUser } = await saveProfile(
        addressForm.name,
        addressForm.address,
        addressForm.phone,
      );
      setUser(updatedUser);
      setEditingAddress(false);
    } catch (err) {
      setAddressErrors({ address: err.message || "Could not save address" });
    }
    setSavingAddress(false);
  };

  const filteredFaqs = faqItems.filter((item) =>
    item.q.toLowerCase().includes(helpSearch.trim().toLowerCase()),
  );

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const menuItems = [
    { icon: ClipboardList, label: "My Orders", action: () => navigate("/customer/orders") },
    { icon: MapPin, label: "Addresses", action: openAddresses },
    { icon: CreditCard, label: "Payment Methods", action: () => setShowPayment(true) },
    { icon: Gift, label: "Rewards & Offers", action: () => setShowRewards(true) },
    { icon: HelpCircle, label: "Help & Support", action: () => setShowHelp(true) },
  ];

  return (
                   <motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="space-y-6"
>
      <div
      className="min-h-screen bg-[#FAFAF5] px-4 py-5"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shrink-0"
              style={{ backgroundColor: ORANGE, fontSize: "18px" }}
            >
              {initials}
            </div>
            <div>
              <p className="font-bold" style={{ color: CHARCOAL, fontSize: "18px" }}>
                {user.name}
              </p>
              <span
                className="inline-flex items-center gap-1 text-white font-bold rounded-full px-2.5 py-0.5 mt-1"
                style={{ backgroundColor: ORANGE, fontSize: "11px" }}
              >
                <Crown size={11} fill="currentColor" />
                Premium Member
              </span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowNotifications((v) => !v)}
              className="relative flex items-center justify-center text-gray-500 shrink-0 rounded-xl hover:bg-[#FBE7DD] hover:text-[#E8622D] transition-colors cursor-pointer"
              style={{ minHeight: "40px", minWidth: "40px" }}
            >
              <Bell size={20} />
            </button>
            {showNotifications && (
              <NotificationPanel
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
                onBrowseMenu={() => {
                  setShowNotifications(false);
                  navigate("/menu");
                }}
              />
            )}
          </div>
        </div>

        {/* Wallet + Rewards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: CREAM }}
            >
              <Wallet size={18} style={{ color: ORANGE }} />
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 truncate" style={{ fontSize: "12px" }}>
                QuickBite Wallet
              </p>
              <p className="font-bold" style={{ color: CHARCOAL, fontSize: "16px" }}>
                ₹{wallet.balance}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: CREAM }}
            >
              <Gift size={18} style={{ color: ORANGE }} />
            </div>
            <div className="min-w-0">
              <p className="text-gray-400 truncate" style={{ fontSize: "12px" }}>
                Rewards Points
              </p>
              <p className="font-bold" style={{ color: CHARCOAL, fontSize: "16px" }}>
                {rewards.points.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Menu list */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
          {menuItems.map(({ icon: Icon, label, action }, i) => (
            <button
              key={label}
              onClick={action}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                i < menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <Icon size={19} className="text-gray-500 shrink-0" />
              <span className="flex-1 font-medium" style={{ color: CHARCOAL, fontSize: "15px" }}>
                {label}
              </span>
              <ChevronRight size={18} className="text-gray-300 shrink-0" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 bg-white rounded-2xl shadow-sm px-4 py-3.5 text-red-500 font-semibold hover:bg-red-50 transition-colors cursor-pointer"
          style={{ fontSize: "15px" }}
        >
          <LogOut size={19} className="shrink-0" />
          Logout
        </button>
      </div>

      {/* Payment method modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPayment(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: CHARCOAL, fontSize: "20px" }}>
                Payment Method
              </h2>
              <button
                onClick={() => setShowPayment(false)}
                className="flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ width: "32px", height: "32px" }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { key: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", Icon: Banknote },
                { key: "upi", label: "UPI", desc: "Pay instantly via UPI apps", Icon: Smartphone },
              ].map(({ key, label, desc, Icon }) => {
                const active = paymentMethod === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPaymentMethod(key)}
                    className="w-full flex items-center gap-3 rounded-2xl p-4 text-left transition-colors cursor-pointer"
                    style={{
                      border: `2px solid ${active ? ORANGE : "#E5E7EB"}`,
                      backgroundColor: active ? CREAM : "#FFFFFF",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: active ? ORANGE : "#F3F4F6" }}
                    >
                      <Icon size={18} style={{ color: active ? "#FFFFFF" : "#6B7280" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold" style={{ color: CHARCOAL, fontSize: "15px" }}>
                        {label}
                      </p>
                      <p className="text-gray-400" style={{ fontSize: "12px" }}>
                        {desc}
                      </p>
                    </div>
                    {active && (
                      <span
                        className="shrink-0 rounded-full flex items-center justify-center"
                        style={{ width: "22px", height: "22px", backgroundColor: ORANGE }}
                      >
                        <Check size={13} color="#fff" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-5 font-bold rounded-full text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ minHeight: "48px", fontSize: "15px", backgroundColor: ORANGE }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Address modal */}
      {showAddresses && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddresses(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: CHARCOAL, fontSize: "20px" }}>
                Delivery Address
              </h2>
              <button
                onClick={() => setShowAddresses(false)}
                className="flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ width: "32px", height: "32px" }}
              >
                <X size={18} />
              </button>
            </div>

            {!editingAddress ? (
              <>
                {user.address ? (
                  <div
                    className="w-full flex items-start gap-3 rounded-2xl p-4 text-left"
                    style={{ border: `2px solid ${ORANGE}`, backgroundColor: CREAM }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: ORANGE }}
                    >
                      <Home size={18} style={{ color: "#FFFFFF" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold" style={{ color: CHARCOAL, fontSize: "15px" }}>
                        {user.name}
                      </p>
                      {user.phone && (
                        <p className="text-gray-500 mt-0.5" style={{ fontSize: "13px" }}>
                          +91 {user.phone}
                        </p>
                      )}
                      <p className="text-gray-400 mt-0.5" style={{ fontSize: "13px" }}>
                        {user.address}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full flex items-center justify-center"
                      style={{ width: "22px", height: "22px", backgroundColor: ORANGE }}
                    >
                      <Check size={13} color="#fff" strokeWidth={3} />
                    </span>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MapPin size={28} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-400" style={{ fontSize: "14px" }}>
                      No address on file
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setEditingAddress(true)}
                  className="w-full mt-5 font-bold rounded-full transition-colors cursor-pointer"
                  style={{ minHeight: "48px", fontSize: "15px", color: ORANGE, border: `2px solid ${ORANGE}` }}
                >
                  Change Address
                </button>
              </>
            ) : (
              <div>
                <div className="mb-3">
                  <label className="block text-[14px] font-semibold text-gray-500 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={addressForm.name}
                    onChange={handleAddressChange}
                    placeholder="Enter your full name"
                    className={`w-full border rounded-xl px-3 text-[15px] outline-none transition-colors ${
                      addressErrors.name ? "border-red-400" : "border-gray-200"
                    }`}
                    style={{ minHeight: "44px", color: CHARCOAL, fontFamily: "Arial, sans-serif" }}
                  />
                  {addressErrors.name && (
                    <p className="text-red-500 text-[13px] mt-1">{addressErrors.name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="block text-[14px] font-semibold text-gray-500 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleAddressChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={`w-full border rounded-xl px-3 text-[15px] outline-none transition-colors ${
                      addressErrors.phone ? "border-red-400" : "border-gray-200"
                    }`}
                    style={{ minHeight: "44px", color: CHARCOAL, fontFamily: "Arial, sans-serif" }}
                  />
                  {addressErrors.phone && (
                    <p className="text-red-500 text-[13px] mt-1">{addressErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-gray-500 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={addressForm.address}
                    onChange={handleAddressChange}
                    placeholder="Enter your full delivery address"
                    rows={3}
                    className={`w-full border rounded-xl px-3 py-3 text-[15px] outline-none resize-none transition-colors ${
                      addressErrors.address ? "border-red-400" : "border-gray-200"
                    }`}
                    style={{ color: CHARCOAL, fontFamily: "Arial, sans-serif" }}
                  />
                  {addressErrors.address && (
                    <p className="text-red-500 text-[13px] mt-1">{addressErrors.address}</p>
                  )}
                  <button
                    onClick={getAddressLocation}
                    disabled={locLoading}
                    className="mt-1 flex items-center gap-2 font-semibold text-[14px]"
                    style={{ minHeight: "40px", color: ORANGE }}
                  >
                    {locLoading ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
                    {locLoading ? "Getting location..." : "Use my current location"}
                  </button>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setEditingAddress(false);
                      setAddressErrors({});
                    }}
                    className="flex-1 font-bold rounded-full transition-colors cursor-pointer"
                    style={{ minHeight: "48px", fontSize: "15px", color: ORANGE, border: `2px solid ${ORANGE}` }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAddress}
                    disabled={savingAddress}
                    className="flex-1 font-bold rounded-full text-white transition-opacity hover:opacity-90 cursor-pointer"
                    style={{
                      minHeight: "48px",
                      fontSize: "15px",
                      backgroundColor: ORANGE,
                      opacity: savingAddress ? 0.8 : 1,
                    }}
                  >
                    {savingAddress ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rewards modal */}
      {showRewards && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowRewards(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 max-h-[85vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: CHARCOAL, fontSize: "20px" }}>
                Rewards & Offers
              </h2>
              <button
                onClick={() => setShowRewards(false)}
                className="flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ width: "32px", height: "32px" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Hero */}
            <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: ORANGE }}>
              <div
                className="flex items-center gap-1.5 text-white/80 font-semibold"
                style={{ fontSize: "13px" }}
              >
                <Flame size={14} fill="currentColor" />
                Sizzle rewards
              </div>
              <p className="text-white font-bold mt-1" style={{ fontSize: "28px" }}>
                {rewardsData.points.toLocaleString("en-IN")} pts
              </p>
              <p className="text-white/80 mt-0.5" style={{ fontSize: "13px" }}>
                {rewardsData.pointsToNext} pts to your next reward
              </p>
              <div
                className="mt-3 h-2 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
              >
                <div
                  className="h-2 rounded-full bg-white"
                  style={{ width: `${rewardsProgress}%` }}
                />
              </div>
            </div>

            {/* Tier */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold" style={{ color: CHARCOAL, fontSize: "15px" }}>
                Your tier
              </h3>
              <span
                className="font-bold rounded-full px-2.5 py-1"
                style={{ backgroundColor: CREAM, color: ORANGE, fontSize: "12px" }}
              >
                {rewardsData.tier}
              </span>
            </div>

            {/* Reward tiles */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {rewardTiers.map(({ icon: Icon, label, pts }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1"
                  style={{ backgroundColor: ORANGE, minHeight: "90px" }}
                >
                  <Icon size={17} style={{ color: "#FFFFFF" }} />
                  <p className="font-bold text-white" style={{ fontSize: "13px" }}>
                    {label}
                  </p>
                  <p className="text-white/80" style={{ fontSize: "11px" }}>
                    {pts.toLocaleString("en-IN")} pts
                  </p>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <h3 className="font-bold mb-2" style={{ color: CHARCOAL, fontSize: "15px" }}>
              Recent activity
            </h3>
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "#F9FAFB", border: "1px solid #F0F0F0" }}
            >
              {recentRewardActivity.map((item, i) => (
                <div
                  key={item.label + i}
                  className={`flex items-center justify-between px-3 py-2.5 ${
                    i < recentRewardActivity.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <span className="font-medium" style={{ color: CHARCOAL, fontSize: "13px" }}>
                    {item.label}
                  </span>
                  <span className="font-bold" style={{ color: ORANGE, fontSize: "13px" }}>
                    {item.delta > 0 ? "+" : ""}
                    {item.delta} pts
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowRewards(false)}
              className="w-full mt-5 font-bold rounded-full text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ minHeight: "48px", fontSize: "15px", backgroundColor: ORANGE }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Help & Support modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowHelp(false)} />
          <div
            className="relative rounded-2xl shadow-2xl w-full max-w-sm p-5 max-h-[85vh] overflow-y-auto scrollbar-hide"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              style={{ width: "32px", height: "32px" }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: CREAM }}
              >
                <Headphones size={22} style={{ color: ORANGE }} />
              </div>
              <h2 className="font-bold" style={{ color: CHARCOAL, fontSize: "19px" }}>
                Help and support
              </h2>
              <p className="text-gray-500 mt-1" style={{ fontSize: "13px" }}>
                We're here to help with your order, anytime.
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search
                size={16}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-white/70"
              />
              <input
                type="text"
                value={helpSearch}
                onChange={(e) => setHelpSearch(e.target.value)}
                placeholder="Search for help, e.g. refund, delivery time"
                className="w-full rounded-xl pl-9 pr-3 text-[13px] outline-none transition-colors text-white placeholder-white/70"
                style={{
                  minHeight: "42px",
                  backgroundColor: ORANGE,
                  border: "1px solid transparent",
                }}
              />
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {helpQuickActions.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5"
                  style={{ backgroundColor: ORANGE, minHeight: "80px" }}
                >
                  <Icon size={17} style={{ color: "#FFFFFF" }} />
                  <p className="font-bold text-white" style={{ fontSize: "12px" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Frequently asked */}
            <p className="text-gray-500 mb-2" style={{ fontSize: "12px" }}>
              Frequently asked
            </p>
            <div className="space-y-2 mb-5">
              {filteredFaqs.map((item, i) => {
                const open = openFaqIndex === i;
                return (
                  <div
                    key={item.q}
                    className="rounded-xl overflow-hidden"
                    style={{ backgroundColor: ORANGE }}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(open ? null : i)}
                      className="w-full flex items-center justify-between px-3.5 py-3 text-left cursor-pointer"
                    >
                      <span className="font-bold text-white" style={{ fontSize: "13px" }}>
                        {item.q}
                      </span>
                      <ChevronDown
                        size={16}
                        className="text-white/80 shrink-0 transition-transform"
                        style={{ transform: open ? "rotate(180deg)" : "none" }}
                      />
                    </button>
                    {open && (
                      <p
                        className="px-3.5 pb-3 text-white/80"
                        style={{ fontSize: "12px" }}
                      >
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
              {filteredFaqs.length === 0 && (
                <p className="text-center text-gray-500 py-3" style={{ fontSize: "13px" }}>
                  No results for "{helpSearch}"
                </p>
              )}
            </div>

            {/* Still need help */}
            <p className="text-gray-500 mb-2" style={{ fontSize: "12px" }}>
              Still need help
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                className="flex items-center justify-center gap-1.5 rounded-xl font-semibold text-white cursor-pointer"
                style={{ minHeight: "44px", fontSize: "12.5px", backgroundColor: ORANGE }}
              >
                <MessageCircle size={15} />
                Live chat
              </button>
              <button
                className="flex items-center justify-center gap-1.5 rounded-xl font-semibold text-white cursor-pointer"
                style={{ minHeight: "44px", fontSize: "12.5px", backgroundColor: ORANGE }}
              >
                <Phone size={15} />
                Call us
              </button>
              <button
                className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                style={{ minHeight: "44px", fontSize: "12.5px", backgroundColor: ORANGE }}
              >
                <Mail size={15} />
                Email support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </motion.div>
  );
};


export default Profile;