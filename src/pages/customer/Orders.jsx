import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import SearchBar from "../../components/customer/orders/OrderSearchFilter";
import OrderSearchFilter from "../../components/customer/orders/OrderSearchFilter";
import ModernOrderCard from "../../components/customer/orders/ModernOrderCard";
import {
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../../components/customer/common/SectionHeader";
// import OrderCard from "../../components/customer/orders/OrderCard";
import CurrentOrderCard from "../../components/customer/orders/OrderCard";
import OrderHistoryCard from "../../components/customer/orders/OrderHistory";
import OrderTimeline from "../../components/customer/orders/OrderTimeline";
import ReorderButton from "../../components/customer/orders/ReorderButton";
import OrderTabs from "../../components/customer/orders/OrderTabs";
import {
  getCurrentOrders,
  getOrderHistory,
} from "../../api/customerApi";


const Orders = () => {

  const navigate = useNavigate();


const [currentOrders, setCurrentOrders] =
  useState([]);
const [search, setSearch] = useState("");

// ActiveTab
const [activeTab, setActiveTab] =
  useState("All Orders");

const [history, setHistory] =
  useState([]);
  const allOrders = [...currentOrders, ...history];

const filteredOrders = allOrders.filter((order) => {
  // Search Filter
  const keyword = search.toLowerCase();

  const matchesSearch =
    order.restaurant?.toLowerCase().includes(keyword) ||
    order.id?.toLowerCase().includes(keyword) ||
    order.status?.toLowerCase().includes(keyword);

  // Tab Filter
  let matchesTab = true;

  switch (activeTab) {
    case "Ongoing":
      matchesTab = order.status === "Ongoing";
      break;

    case "Delivered":
      matchesTab = order.status === "Delivered";
      break;

    case "Cancelled":
      matchesTab = order.status === "Cancelled";
      break;

    case "All Orders":
    default:
      matchesTab = true;
  }

  return matchesSearch && matchesTab;
});


const [loading, setLoading] =
  useState(true);

  const [reordering, setReordering] =
    useState(null);

const filteredCurrentOrders = currentOrders.filter((order) => {
  const keyword = search.toLowerCase();

  return (
    order.restaurant?.toLowerCase().includes(keyword) ||
    order.id?.toLowerCase().includes(keyword) ||
    order.status?.toLowerCase().includes(keyword)
  );
});

const filteredHistory = history.filter((order) => {
  const keyword = search.toLowerCase();

  return (
    order.restaurant?.toLowerCase().includes(keyword) ||
    order.id?.toLowerCase().includes(keyword) ||
    order.status?.toLowerCase().includes(keyword)
  );
});

  const handleReorder = (order) => {

    setReordering(order.id);


    setTimeout(() => {

      setReordering(null);

      navigate(
        "/customer/cart",
        {
          state:{
            reorder:order
          }
        }
      );

    },500);

  };



 const handleViewOrder = (order) => {
  navigate(`/customer/orders/${order.id}`, {
    state: {
      order,
    },
  });
};

useEffect(() => {

  const loadOrders = async () => {
    

    try {

      const customerId = "CUSTOMER_001";


      const [
  currentRes,
  historyRes,
] = await Promise.all([
  getCurrentOrders(customerId),
  getOrderHistory(customerId),
]);


setCurrentOrders(
  currentRes.data?.data || []
);

setHistory(
  historyRes.data?.data || []
);


    } catch(error) {

      console.log(
        "Orders API Error:",
        error
      );


    } finally {

      setLoading(false);

    }

  };


  loadOrders();


}, []);
if (loading) {

  return (
    <div
      className="
        flex
        min-h-[400px]
        items-center
        justify-center
        text-slate-500
      "
    >
      Loading Orders...
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

<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
{/* Section header */}
  <SectionHeader
    title="My Orders"
    subtitle="Track current and previous orders"
  />

 <OrderSearchFilter
  search={search}
  setSearch={setSearch}
  onClearSearch={() => setSearch("")}
  onFilterClick={() => console.log("Filter")}
/>


</div>
{/* Order Tab */}
  <OrderTabs
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>

{/* <div className="space-y-5">

  {demoOrders.map((order) => (

    <ModernOrderCard
      key={order.id}
      order={order}
      onTrack={() => {}}
      onView={() => {}}
      onReorder={() => {}}
    />

  ))}

</div> */}






      {/* Search bar */}
{/* <SearchBar /> */}



      {/* Current Order */}

      {/* <section className="space-y-5">


        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <h2 className="text-xl font-bold text-slate-900">
            Current Order
          </h2>


          <div
            className="
              flex
              items-center
              gap-2

              rounded-full

              bg-emerald-50

              px-3
              py-1

              text-sm

              font-semibold

              text-emerald-600
            "
          >

            <CheckCircle2 size={16}/>

            Active

          </div>


        </div>



{currentOrders.length === 0 ? (
  <div className="rounded-[28px] border-2 border-dashed border-slate-300 bg-white p-12 text-center">
    <ShoppingBag
      className="mx-auto text-slate-400"
      size={40}
    />

    <h3 className="mt-4 text-xl font-bold">
      No Active Orders
    </h3>

    <p className="mt-2 text-slate-500">
      You don't have any active orders.
    </p>
  </div>
) : (
  <div className="space-y-6">
    {filteredCurrentOrders.map((order) => (
      <div key={order.id} className="space-y-4">
        <CurrentOrderCard
  order={order}
  onReorder={() => handleReorder(order)}
  onView={() => handleViewOrder(order)}
/>

       
      </div>
    ))
    }
  </div>
)
}



      </section> */}





      {/* History */}

      {/* <section className="space-y-5">


        <h2 className="text-xl font-bold text-slate-900">
          Order History
        </h2>



        {
          history.length === 0 ? (

            <div
              className="
                rounded-[28px]
                border-2
                border-dashed
                border-slate-300
                bg-white
                p-12
                text-center
              "
            >

              <ShoppingBag
                className="mx-auto text-slate-400"
                size={40}
              />


              <h3 className="mt-4 text-xl font-bold">
                No Previous Orders
              </h3>

              <p className="mt-2 text-slate-500">
                Your completed orders will appear here.
              </p>


            </div>


          ) : (


            <div className="space-y-5">


              {
                filteredHistory.map(
                  (order)=>(


                    <div
                      key={order.id}

                      className="
                        rounded-[28px]
                        
                      "
                    >


                              <OrderHistoryCard
                        order={{
                      ...order,
                       onReorder: () => handleReorder(order),
                        }}
                    onView={() => handleViewOrder(order)}
                            />



                      <div
                        className="
                          mt-3
                          flex
                          justify-end
                        "
                      >

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


                    </div>


                  )
                )
              }


            </div>


          )
        }


      </section> */}


    </div>
</motion.div>
  );

};


export default Orders;