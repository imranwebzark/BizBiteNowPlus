import { motion } from "framer-motion";
import {
  CreditCard,
  Wallet,
 Landmark,
  Smartphone,
  Save,
  Banknote,
} from "lucide-react";
// Temporary
// Replace with backend value
const isPlusUser = true;
const PaymentSettingsCard = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
        <div className="rounded-xl bg-[#16522d]/10 p-3">
          <CreditCard className="text-[#16522d]" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#16522d]">
            Payment Settings
          </h2>

          <p className="text-sm text-slate-500">
            Configure customer payment methods and settlement details.
          </p>
        </div>
      </div>

      {/* Accepted Payments */}
      <div className="space-y-6 p-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-[#16522d]">
            Accepted Payment Methods
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {[
  ...(isPlusUser
    ? [{ icon: Smartphone, label: "UPI" }]
    : []),

  { icon: Banknote, label: "Cash On Delivery" },
].map((item) => (
              <label
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-[#f8faf8] p-4"
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className="text-[#16522d]"
                  />

                  <span className="font-medium text-[#16522d]">
                    {item.label}
                  </span>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-[#16522d]"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Settlement */}
        {/* <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#16522d]">
              Account Holder Name
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#16522d] focus:ring-2 focus:ring-[#16522d]/20"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#16522d]">
              Bank Name
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#16522d] focus:ring-2 focus:ring-[#16522d]/20"
              placeholder="State Bank of India"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#16522d]">
              Account Number
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#16522d] focus:ring-2 focus:ring-[#16522d]/20"
              placeholder="XXXXXXXXXXXX"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#16522d]">
              IFSC Code
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#16522d] focus:ring-2 focus:ring-[#16522d]/20"
              placeholder="SBIN000000"
            />
          </div>
        </div>*/}
      </div> 

      {/* Footer */}
      <div className="flex justify-end border-t border-slate-200 px-6 py-5">
        <button className="flex items-center gap-2 rounded-xl bg-[#ffc700] px-6 py-3 font-semibold text-[#16522d] transition hover:bg-[#e6b800]">
          <Save size={18} />
          Save Payment Settings
        </button>
      </div>
    </motion.section>
  );
};

export default PaymentSettingsCard;