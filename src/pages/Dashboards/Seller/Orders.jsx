import { useEffect, useMemo, useState } from "react";

import OrdersHeader from "../../../components/orders/OrdersHeader";
import OrderStats from "../../../components/orders/OrderStats";
import OrdersTabs from "../../../components/orders/OrderTabs";
import OrderFilters from "../../../components/orders/OrderFilters";
import OrdersTable from "../../../components/orders/OrdersTable";
import OrderPagination from "../../../components/orders/OrderPagination";
import { motion } from "framer-motion";
import OrderDrawer from "../../../components/orders/OrderDrawer";
import OrderBoard from "../../../components/orders/OrderBoard";
import BulkActions from "../../../components/orders/BulkActions";
import ExportModal from "../../../components/orders/ExportModal";
// import AssignDeliveryModal from "../../../components/orders/AssignDeliveryModal";
import deliveryBoyData from "../../../data/deliveryBoyData";
import AssignOrderModal from "../../../components/delivery/AssignOrderModal.jsx";
import AssignDeliveryModal from "../../../components/orders/AssignDeliveryModal";

import { orders as initialOrders } from "../../../data/ordersData.js";

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);

  // ==========================
  // Tabs
  // ==========================

  const [activeTab, setActiveTab] = useState("new");

  // ==========================
  // Filters
  // ==========================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [payment, setPayment] = useState("All");
  const [sort, setSort] = useState("Newest");

  

  // ==========================
  // Pagination
  // ==========================

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ==========================
  // Drawer
  // ==========================

  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [selectedOrder, setSelectedOrder] = useState(null);

  // ==========================
  // Bulk Selection
  // ==========================

  const [selectedOrders, setSelectedOrders] = useState([]);

  // ==========================
  // View
  // ==========================

  const [boardView, setBoardView] = useState(false);

  // ==========================
  // Export
  // ==========================

  const [exportOpen, setExportOpen] = useState(false);
  const [assignModal, setAssignModal] = useState(false);

const [selectedOrder, setSelectedOrder] = useState(null);

const [deliveryBoys, setDeliveryBoys] = useState(() => {
  const saved = localStorage.getItem("deliveryBoys");

  return saved
    ? JSON.parse(saved)
    : deliveryBoyData;
});
useEffect(() => {
  localStorage.setItem(
    "deliveryBoys",
    JSON.stringify(deliveryBoys)
  );
}, [deliveryBoys]);

  // ==========================
  // Subscription
  // ==========================

  const isPlusUser = false;

  // =====================================
  // Filter Orders
  // =====================================

  const filteredOrders = useMemo(() => {
    let data = [...orders];

    // Tabs

    if (activeTab === "new") {
      data = data.filter((order) => order.status !== "Delivered");
    }

if (activeTab === "completed") {
  data = data.filter(
    (order) => order.status === "Delivered"
  );

  // Free Tier: Today's completed orders only
  if (!isPlusUser) {
    const today = new Date("2026-07-05").toDateString();

    data = data.filter((order) => {
      const completedDate = new Date(
        order.deliveredAt || order.createdAt
      ).toDateString();

      return completedDate === today;
    });
  }
}

    // Search

    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter(
        (order) =>
          order.orderId.toLowerCase().includes(value) ||
          order.customer.toLowerCase().includes(value) ||
          order.phone.includes(value),
      );
    }

    // Status

    if (status !== "All") {
      data = data.filter((order) => order.status === status);
    }

    // Payment

    if (payment !== "All") {
      data = data.filter((order) => order.payment === payment);
    }

    // Sorting

    switch (sort) {
      case "Highest Amount":
        data.sort((a, b) => b.amount - a.amount);
        break;

      case "Lowest Amount":
        data.sort((a, b) => a.amount - b.amount);
        break;

      case "Oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [orders, activeTab, search, status, payment, sort]);

  // =====================================
  // Dashboard Stats
  // =====================================

  const stats = useMemo(() => {
    return {
      total: orders.length,

      pending: orders.filter((o) => o.status === "Pending").length,

      preparing: orders.filter((o) => o.status === "Preparing").length,

      delivered: orders.filter((o) => o.status === "Delivered").length,

      revenue: orders
        .filter((o) => o.status === "Delivered")
        .reduce((sum, order) => sum + order.amount, 0),
    };
  }, [orders]);

  // =====================================
  // Tab Counts
  // =====================================

  const newOrdersCount = useMemo(
    () => orders.filter((o) => o.status !== "Delivered").length,
    [orders],
  );

  const completedOrdersCount = useMemo(
    () => orders.filter((o) => o.status === "Delivered").length,
    [orders],
  );

  // =====================================
  // Pagination
  // =====================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / rowsPerPage),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, search, status, payment, sort]);

  const paginatedOrders = useMemo(() => {
    return filteredOrders.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage,
    );
  }, [filteredOrders, currentPage, rowsPerPage]);

  // =====================================
  // Drawer
  // =====================================

  const openDrawer = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedOrder(null);
  };

  // =====================================
  // Bulk Selection
  // =====================================

  const toggleOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
      return;
    }

    setSelectedOrders(paginatedOrders.map((order) => order.id));
  };

  // =====================================
  // Bulk Status Update
  // =====================================

  const bulkUpdate = (status) => {
    setOrders((prev) =>
      prev.map((order) =>
        selectedOrders.includes(order.id)
          ? {
              ...order,
              status,
            }
          : order,
      ),
    );

    setSelectedOrders([]);
  };

  // =====================================
  // Reset Filters
  // =====================================

  const handleReset = () => {
    setSearch("");
    setStatus("All");
    setPayment("All");
    setSort("Newest");
    setCurrentPage(1);
  };

  // =====================================
  // Single Status Update
  // =====================================

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
              trackingStep:
                status === "Pending"
                  ? 1
                  : status === "Preparing"
                    ? 2
                    : status === "Ready"
                      ? 2
                      : status === "Out for Delivery"
                        ? 3
                        : status === "Delivered"
                          ? 4
                          : order.trackingStep,
            }
          : order,
      ),
    );
  };

//   const handleAssignClick = (order) => {
//   setSelectedOrder(order);
//   setAssignModal(true);
// };

// handle assign
const handleAssignDelivery = (boyId) => {
  // Selected Delivery Boy

  const boy = deliveryBoys.find(
    (item) => item.id === boyId
  );

  if (!boy || !selectedOrder) return;

  // Order Object

  const assignedOrder = {
    id: Date.now(),
    orderId: selectedOrder.orderId,
    customer: selectedOrder.customer,
    phone: selectedOrder.phone,
    amount: selectedOrder.amount,
    payment: selectedOrder.payment,
    deliveryBoy: boy.name,
    deliveryBoyId: boy.id,
    status: "Assigned",
    assignedAt: new Date().toLocaleString(),
  };

  // Previous Orders

  const previousOrders =
    JSON.parse(
      
      localStorage.getItem("assignedOrders")
    ) || [];

  // Save LocalStorage

  localStorage.setItem(
    "assignedOrders",
    JSON.stringify([
      ...previousOrders,
      assignedOrder,
    ])
  );

  // Increase Assigned Count

  const updatedBoys = deliveryBoys.map((item) =>
    item.id === boy.id
      ? {
          ...item,
          assignedOrders:
            item.assignedOrders + 1,
        }
      : item
  );

  setDeliveryBoys(updatedBoys);

// Save Updated Delivery Boys
localStorage.setItem(
  "deliveryBoys",
  JSON.stringify(updatedBoys)
);

  // Close Modal

  setAssignModal(false);
  setSelectedOrder(null);

  alert("Order Assigned Successfully");
};

// Open Assign Delivery Modal
const handleAssignClick = (order) => {
  setSelectedOrder(order);
  setAssignModal(true);
};
  // =====================================
  // Export
  // =====================================

  const exportOrders = (month) => {
    console.log("Export PDF:", month);
  };

  // =====================================
  // Auto Cancel
  // =====================================

  const autoCancelOrder = (order) => {
    updateStatus(order.id, "Cancelled");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="space-y-8">
        <OrdersHeader
          totalOrders={orders.length}
          boardView={boardView}
          setBoardView={setBoardView}
          onRefresh={() => window.location.reload()}
          onExport={() => setExportOpen(true)}
        />

        <OrderStats stats={stats} />

        <OrdersTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          newOrders={newOrdersCount}
          completedOrders={completedOrdersCount}
        />

        <OrderFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          payment={payment}
          setPayment={setPayment}
          sort={sort}
          setSort={setSort}
          onReset={handleReset}
        />

        <BulkActions
          selectedCount={selectedOrders.length}
          onClear={() => setSelectedOrders([])}
          onAccept={() => bulkUpdate("Preparing")}
          onPreparing={() => bulkUpdate("Preparing")}
          onReady={() => bulkUpdate("Ready")}
          onDelivery={() => bulkUpdate("Out for Delivery")}
          onDelivered={() => bulkUpdate("Delivered")}
          onCancel={() => bulkUpdate("Cancelled")}
        />

        {boardView && isPlusUser ? (
          <OrderBoard orders={filteredOrders} onSelect={openDrawer} />
        ) : (
          <>
            <OrdersTable
              orders={paginatedOrders}
              activeTab={activeTab}
              selectedOrders={selectedOrders}
              toggleOrder={toggleOrder}
              toggleAll={toggleAll}
              onView={openDrawer}
              onAccept={(id) => updateStatus(id, "Preparing")}
              onPreparing={(id) => updateStatus(id, "Preparing")}
              onReady={(id) => updateStatus(id, "Ready")}
              onDelivery={(id) => updateStatus(id, "Out for Delivery")}
              onDelivered={(id) => updateStatus(id, "Delivered")}
              onCancel={(id) => updateStatus(id, "Cancelled")}
            />
{activeTab === "completed" && !isPlusUser && (
  <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">

    {/* Fake History Rows */}

    <div className="pointer-events-none blur-[2px] opacity-40">

      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between border-b border-slate-200 px-6 py-5"
        >
          <div>
            <div className="h-4 w-28 rounded bg-slate-300" />
            <div className="mt-2 h-3 w-20 rounded bg-slate-200" />
          </div>

          <div className="h-4 w-24 rounded bg-slate-300" />

          <div className="h-4 w-20 rounded bg-slate-300" />

          <div className="h-8 w-28 rounded-full bg-slate-300" />
        </div>
      ))}

    </div>

    {/* Lock Overlay */}

    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 backdrop-blur-sm">

      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-4xl">
        🔒
      </div>

      <h3 className="text-2xl font-bold text-slate-800">
        Older Orders Locked
      </h3>

      <p className="mt-3 max-w-md text-center text-slate-600">
        Order history beyond today is available on
        <span className="font-semibold text-[#16522d]">
          {" "}BizBite Plus
        </span>.
      </p>

      <button
        className="mt-6 rounded-xl bg-[#16522d] px-6 py-3 font-semibold text-white transition hover:bg-[#124324]"
      >
        Upgrade Now
      </button>

    </div>

  </div>
)}
            <OrderPagination
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalOrders={filteredOrders.length}
              onPageChange={setCurrentPage}
              onRowsChange={(rows) => {
                setRowsPerPage(rows);
                setCurrentPage(1);
              }}
            />
          </>
        )}

        <OrderDrawer
          open={drawerOpen}
          order={selectedOrder}
          onClose={closeDrawer}
          onExpire={autoCancelOrder}
        />

        <ExportModal
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          onExport={exportOrders}
        />
<AssignDeliveryModal
  isOpen={assignModal}
  onClose={() => setAssignModal(false)}
  order={selectedOrder}
  deliveryBoys={deliveryBoys}
  onAssign={handleAssignDelivery}
/>

        <AssignDeliveryModal
  isOpen={assignModal}
  onClose={() => setAssignModal(false)}
  order={selectedOrder}
  deliveryBoys={deliveryBoys}
  onAssign={handleAssignDelivery}
/>
      </div>
    </motion.div>
  );
}