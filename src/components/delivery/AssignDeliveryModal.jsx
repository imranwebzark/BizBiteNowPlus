import React, { useState } from "react";

export default function AssignDeliveryModal({
  isOpen,
  onClose,
  order,
  deliveryBoys,
  onAssign,
}) {
  const [selectedBoy, setSelectedBoy] = useState("");

  if (!isOpen) return null;

  const handleAssign = () => {
    if (!selectedBoy) {
      alert("Please select a Delivery Boy");
      return;
    }

    onAssign(Number(selectedBoy));

    setSelectedBoy("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Assign Delivery
        </h2>

        {/* Order Details */}

        <div className="bg-gray-50 rounded-lg p-4 mb-5">

          <p>
            <span className="font-semibold">
              Order ID :
            </span>{" "}
            {order?.orderId}
          </p>

          <p>
            <span className="font-semibold">
              Customer :
            </span>{" "}
            {order?.customer}
          </p>

          <p>
            <span className="font-semibold">
              Amount :
            </span>{" "}
            ₹{order?.amount}
          </p>

        </div>

        {/* Delivery Boy */}

        <label className="font-semibold block mb-2">
          Select Delivery Boy
        </label>

        <select
          value={selectedBoy}
          onChange={(e) =>
            setSelectedBoy(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3 mb-6"
        >
          <option value="">
            Choose Delivery Boy
          </option>

          {deliveryBoys.map((boy) => (
            <option
              key={boy.id}
              value={boy.id}
            >
              {boy.name} ({boy.status})
            </option>
          ))}
        </select>

        {/* Buttons */}

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            className="px-5 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800"
          >
            Assign
          </button>

        </div>

      </div>

    </div>
  );
}