import { useState } from "react";

import SectionHeader from "../../components/customer/common/SectionHeader";
import { motion } from "framer-motion";
import LoyaltyCard from "../../components/customer/rewards/LoyaltyCard";
import RewardProgress from "../../components/customer/rewards/RewardProgress";
import Coupons from "../../components/customer/rewards/Coupons";
import {
  loyaltyData,
} from "../../data/customer/rewardsData";

import couponsData from "../../data/customer/couponsData";


const Rewards = () => {

  const [coupons, setCoupons] =
    useState(couponsData);


const [appliedCoupon, setAppliedCoupon] = useState(null);
const [usedCoupons, setUsedCoupons] = useState([]);





const applyCoupon = (coupon) => {
  if (usedCoupons.includes(coupon.code)) return;

  localStorage.setItem(
    "appliedCoupon",
    JSON.stringify(coupon)
  );
};


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
    <div className="space-y-8 lg:pl-10 pb-32">

      {/* Header */}

      <SectionHeader
        title="Rewards & Loyalty"
        subtitle="Earn points, unlock rewards and save more"
      />


      {/* Loyalty */}

      <section className="space-y-5">

        <LoyaltyCard
          data={loyaltyData}
        />


        <RewardProgress
          data={loyaltyData}
        />

      </section>


      {/* Coupons */}

      <section className="space-y-5">


<Coupons
  coupons={coupons}
  appliedCoupon={appliedCoupon}
  usedCoupons={usedCoupons}
  onApply={applyCoupon}
/>

      </section>


      
      

    </div>
    </motion.div>
  );
};


export default Rewards;