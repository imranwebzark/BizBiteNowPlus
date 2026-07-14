import React, { useEffect, useState } from "react";
import deliveryBoyData from "../../../data/deliveryBoyData";

import DeliveryBoyTable from "../../../components/delivery/DeliveryBoyTable";
import DeliveryBoyForm from "../../../components/delivery/DeliveryBoyForm";
import DeleteDeliveryModal from "../../../components/delivery/DeleteDeliveryModal";
import AssignOrderModal from "../../../components/delivery/AssignOrderModal";
import AssignedOrdersTable from "../../../components/delivery/AssignedOrdersTable";

export default function DeliveryManagement() {
  // =============================
  // Delivery Boys
  // =============================

const [deliveryBoys, setDeliveryBoys] = useState(() => {
  const saved = localStorage.getItem("deliveryBoys");

  return saved
    ? JSON.parse(saved)
    : deliveryBoyData;
});

  // =============================
  // Search & Filter
  // =============================

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // =============================
  // Add/Edit Modal
  // =============================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editData, setEditData] =
    useState(null);

  // =============================
  // Delete Modal
  // =============================

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedBoy, setSelectedBoy] =
    useState(null);

  // =============================
  // Assign Order
  // =============================

  const [assignModal, setAssignModal] =
    useState(false);

  const [assignBoy, setAssignBoy] =
    useState(null);

  const [assignedOrders, setAssignedOrders] =
    useState([]);
    useEffect(() => {
  const orders =
    JSON.parse(localStorage.getItem("assignedOrders")) || [];

  setAssignedOrders(orders);
}, []);

  // =============================
  // Search + Filter
  // =============================

  const filteredDeliveryBoys =
    deliveryBoys.filter((boy) => {
      const matchSearch =
        boy.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        boy.phone.includes(search);

      const matchFilter =
        filter === "All"
          ? true
          : boy.status === filter;

      return matchSearch && matchFilter;
    });

  // =============================
  // Add / Update
  // =============================

const handleSave = (data) => {
  let updatedDeliveryBoys;

  if (editData) {
    updatedDeliveryBoys = deliveryBoys.map((boy) =>
      boy.id === editData.id
        ? {
            ...boy,
            ...data,
          }
        : boy
    );
  } else {
    const newBoy = {
      ...data,
      id: Date.now(),
      assignedOrders: 0,
    };

    updatedDeliveryBoys = [
      ...deliveryBoys,
      newBoy,
    ];
  }

  setDeliveryBoys(updatedDeliveryBoys);

  // LocalStorage Save
  localStorage.setItem(
    "deliveryBoys",
    JSON.stringify(updatedDeliveryBoys)
  );

  setEditData(null);
  setIsModalOpen(false);
};

  // =============================
  // Edit
  // =============================

  const handleEdit = (boy) => {
    setEditData(boy);
    setIsModalOpen(true);
  };

  // =============================
  // Online / Offline
  // =============================

  const handleToggleStatus = (id) => {
    const updated = deliveryBoys.map((boy) =>
      boy.id === id
        ? {
            ...boy,
            status:
              boy.status === "Online"
                ? "Offline"
                : "Online",
          }
        : boy
    );

    setDeliveryBoys(updated);
    localStorage.setItem(
  "deliveryBoys",
  JSON.stringify(updated)
);
  };

  // =============================
  // Open Assign Modal
  // =============================

  const handleAssignClick = (boy) => {
    setAssignBoy(boy);
    setAssignModal(true);
  };
  // =============================
// Assign Order
// =============================

const handleAssignOrder = (orderData) => {
  // Increase Assigned Order Count

  const updatedDeliveryBoys = deliveryBoys.map((boy) =>
    boy.id === assignBoy.id
      ? {
          ...boy,
          assignedOrders: boy.assignedOrders + 1,
        }
      : boy
  );

  setDeliveryBoys(updatedDeliveryBoys);
  localStorage.setItem(
  "deliveryBoys",
  JSON.stringify(updatedDeliveryBoys)
);

  // Save Assigned Order

  const newOrder = {
    id: Date.now(),
    orderId: orderData.orderId,
    customer: orderData.customer,
    items: orderData.items,
    address: orderData.address,
    deliveryBoy: assignBoy.name,
    deliveryBoyId: assignBoy.id,
    status: "Assigned",
  };

  setAssignedOrders((prev) => [
    ...prev,
    newOrder,
  ]);

  setAssignModal(false);
};

// =============================
// Complete Order
// =============================

const handleCompleteOrder = (id) => {
  const completedOrder = assignedOrders.find(
    (order) => order.id === id
  );

  if (!completedOrder) return;

  const updatedDeliveryBoys = deliveryBoys.map((boy) =>
    boy.id === completedOrder.deliveryBoyId
      ? {
          ...boy,
          assignedOrders: Math.max(0, boy.assignedOrders - 1),
        }
      : boy
  );

  setDeliveryBoys(updatedDeliveryBoys);

  // Save updated delivery boys
  localStorage.setItem(
    "deliveryBoys",
    JSON.stringify(updatedDeliveryBoys)
  );

  const updatedOrders = assignedOrders.filter(
    (order) => order.id !== id
  );

  setAssignedOrders(updatedOrders);

  // Save updated assigned orders
  localStorage.setItem(
    "assignedOrders",
    JSON.stringify(updatedOrders)
  );
};

// =============================
// Delete Delivery Boy
// =============================

const handleDeleteClick = (boy) => {
  setSelectedBoy(boy);
  setDeleteModal(true);
};

// =============================
// Confirm Delete
// =============================

const confirmDelete = () => {
  const updated = deliveryBoys.filter(
    (boy) => boy.id !== selectedBoy.id
  );

  setDeliveryBoys(updated);
localStorage.setItem(
  "deliveryBoys",
  JSON.stringify(updated)
);
  setDeleteModal(false);
  setSelectedBoy(null);
};
return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* Header */}

    <div className="flex justify-between items-center mb-6">

      <div>
        <h1 className="text-3xl font-bold text-black">
          Delivery Management
        </h1>

        <p className="text-gray-500">
          Manage Delivery Partners
        </p>
      </div>

      <button
        onClick={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
        className="bg-green-900 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
      >
        + Add Delivery Boy
      </button>
    </div>

    {/* Search */}

    <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between gap-4">

      <input
        type="text"
        placeholder="Search Name or Phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 rounded-lg border border-gray-300 px-4 py-2"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full md:w-60"
      >
        <option>All</option>
        <option>Online</option>
        <option>Offline</option>
      </select>

    </div>

    {/* Delivery Boy Table */}

    <DeliveryBoyTable
      deliveryBoys={filteredDeliveryBoys}
      onEdit={handleEdit}
      onDelete={handleDeleteClick}
      onToggleStatus={handleToggleStatus}
      onAssign={handleAssignClick}
    />

    {/* Assigned Orders */}

    <AssignedOrdersTable
      assignedOrders={assignedOrders}
      onComplete={handleCompleteOrder}
    />

    {/* Add/Edit Modal */}

    <DeliveryBoyForm
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setEditData(null);
      }}
      onSave={handleSave}
      editData={editData}
    />

    {/* Delete Modal */}

    <DeleteDeliveryModal
      isOpen={deleteModal}
      onClose={() => {
        setDeleteModal(false);
        setSelectedBoy(null);
      }}
      onDelete={confirmDelete}
      deliveryBoy={selectedBoy}
    />

    {/* Assign Order Modal */}

    <AssignOrderModal
      isOpen={assignModal}
      onClose={() => setAssignModal(false)}
      onAssign={handleAssignOrder}
      deliveryBoy={assignBoy}
    />

  </div>
);
}