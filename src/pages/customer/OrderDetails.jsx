import { useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import ReorderButton from "../../components/customer/orders/ReorderButton";
const OrderDetails = () => {

  const { state } = useLocation();

  const order = state?.order;
  const [reordering, setReordering] =
    useState(null);

  if(!order){
    return (
      <div className="p-10">
        Order not found
      </div>
    );
  }


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
  className="
    w-full
    min-w-0
    max-w-[1760px]

    space-y-6
    pb-28

    px-1
    sm:px-2
    lg:px-10
  "
>

      <h1 className="text-2xl font-bold">
        Order {order.id}
      </h1>


      <div className="rounded-3xl bg-white p-6 shadow">

        <p>
          Status:
          <b> {order.status}</b>
        </p>


        <p>
          Date:
          <b> {order.date}</b>
        </p>


        <h2 className="mt-5 font-bold">
          Items
        </h2>


        {
          order.items?.map(
            item=>(
              <div
                key={item.id}
                className="flex gap-4 py-3"
              >

                <img
                  src={item.image}
                  className="
                    h-16
                    w-16
                    rounded-xl
                    object-cover
                  "
                />


                <div>

                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p>
                    Qty: {item.quantity}
                  </p>

                </div>


              </div>
            )
          )
        }


      </div>
                        <ReorderButton

                          order={order}

                          loading={
                            reordering === order.id
                          }

                          onReorder={() =>
                            handleReorder(
                              order
                            )
                          }

                        />

    </div>
</motion.div>
  );

};


export default OrderDetails;