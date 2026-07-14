import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SectionHeader from "../../components/customer/common/SectionHeader";
import PrimaryButton from "../../components/customer/common/PrimaryButton";
import { motion } from "framer-motion";
import AddressCard from "../../components/customer/profile/AddressCard";
import PaymentMethods from "../../components/customer/profile/PaymentMethods";

import {
  addresses,
  paymentMethods,
} from "../../data/customer/profileData";

import {
  placeOrder as placeOrderApi,
} from "../../api/customerApi";

import {
  useCart,
} from "../../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    refreshCart,
  } = useCart();

  const [selectedAddress, setSelectedAddress] =
    useState(
      addresses.find(
        (item) => item.default
      )
    );

  const [selectedPayment, setSelectedPayment] =
    useState(
      paymentMethods.find(
        (item) => item.default
      )
    );

  const [selectedCoupon, setSelectedCoupon] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "appliedCoupon"
        );

      return saved
        ? JSON.parse(saved)
        : null;
    });

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const orderSummary = useMemo(() => {
    const subtotal =
      cartItems.reduce(
        (sum, item) =>
          sum + item.total,
        0
      );

    const delivery =
      subtotal >= 499
        ? 0
        : 40;

    const tax = Math.round(
      subtotal * 0.05
    );

    const discount =
      selectedCoupon
        ? selectedCoupon.discountType ===
          "flat"
          ? selectedCoupon.discount
          : Math.round(
              (subtotal *
                selectedCoupon.discount) /
                100
            )
        : 0;

    return {
      subtotal,
      delivery,
      tax,
      discount,
      total:
        subtotal +
        delivery +
        tax -
        discount,
    };
  }, [
    cartItems,
    selectedCoupon,
  ]);

  const placeOrder = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }

    if (!selectedAddress) {
      alert(
        "Please select a delivery address."
      );
      return;
    }

    if (!selectedPayment) {
      alert(
        "Please select a payment method."
      );
      return;
    }

    try {
      setPlacingOrder(true);

      await placeOrderApi({
        payment:
          selectedPayment,
        address:
          selectedAddress,
        notes: "",
      });

      localStorage.removeItem(
        "appliedCoupon"
      );

      setSelectedCoupon(null);

      await refreshCart();

      navigate(
        "/customer/orders"
      );
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data
          ?.message ||
          "Unable to place order."
      );
    } finally {
      setPlacingOrder(false);
    }
  };
  return (
  <motion.div
    initial={{
      opacity: 0,
      y: 15,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="space-y-6"
  >
    <div className="space-y-8 lg:pl-10 pb-32">

      <SectionHeader
        title="Checkout"
        subtitle="Complete your order securely"
      />

      {/* Address */}

      <section className="space-y-4">

        <AddressCard
          addresses={addresses}
          onSelect={setSelectedAddress}
          onAdd={() =>
            console.log(
              "Add Address"
            )
          }
          onEdit={(address) =>
            console.log(
              "Edit",
              address
            )
          }
          onDelete={(address) =>
            console.log(
              "Delete",
              address
            )
          }
        />

      </section>

      {/* Payment */}

      <section className="space-y-4">

        <PaymentMethods
          methods={paymentMethods}
          onSelect={setSelectedPayment}
          onAdd={() =>
            console.log(
              "Add Payment"
            )
          }
          onEdit={(method) =>
            console.log(
              "Edit",
              method
            )
          }
          onDelete={(method) =>
            console.log(
              "Delete",
              method
            )
          }
        />

      </section>

      {/* Summary */}

      <section
        className="
          rounded-[28px]
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        <h2 className="text-xl font-bold text-slate-900">
          Order Summary
        </h2>

        <div className="mt-5 space-y-4">

          <SummaryRow
            label="Items"
            value={`${cartItems.length}`}
          />

          <SummaryRow
            label="Subtotal"
            value={`₹${orderSummary.subtotal}`}
          />

          <SummaryRow
            label="Delivery Fee"
            value={
              orderSummary.delivery === 0
                ? "Free"
                : `₹${orderSummary.delivery}`
            }
          />

          <SummaryRow
            label="Taxes"
            value={`₹${orderSummary.tax}`}
          />

          {orderSummary.discount > 0 && (
            <SummaryRow
              label="Coupon Discount"
              value={`-₹${orderSummary.discount}`}
              green
            />
          )}

          <div
            className="
              flex
              justify-between
              border-t
              pt-4
            "
          >
            <span className="text-lg font-bold">
              Total
            </span>

            <span
              className="
                text-2xl
                font-bold
              "
              style={{
                color:
                  "var(--primary)",
              }}
            >
              ₹{orderSummary.total}
            </span>

          </div>

        </div>

        <div className="mt-6 space-y-3">

          <InfoBox
            title="Payment Method"
            value={
              selectedPayment?.title ||
              "Select Payment"
            }
          />

          <InfoBox
            title="Delivery Address"
            value={
              selectedAddress?.address ||
              "Select Address"
            }
          />

        </div>

        <PrimaryButton
          className="mt-6 w-full"
          disabled={
            placingOrder ||
            cartItems.length === 0
          }
          onClick={placeOrder}
        >
          {placingOrder
            ? "Placing Order..."
            : "Place Order"}
        </PrimaryButton>

      </section>

    </div>
  </motion.div>
);
}
const SummaryRow = ({
  label,
  value,
  green,
}) => (
  <div
    className="
      flex
      justify-between
      text-slate-600
    "
  >
    <span>{label}</span>

    <span
      className={
        green
          ? "font-semibold text-green-600"
          : "font-semibold text-slate-900"
      }
    >
      {value}
    </span>
  </div>
);

const InfoBox = ({
  title,
  value,
}) => (
  <div>
    <p className="text-sm text-slate-500">
      {title}
    </p>

    <div
      className="
        mt-1
        rounded-2xl
        bg-slate-50
        p-4
        font-semibold
      "
    >
      {value}
    </div>
  </div>
);

export default Checkout;