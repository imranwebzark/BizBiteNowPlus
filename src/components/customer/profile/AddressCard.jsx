import {
  Home,
  Briefcase,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import Card from "../common/Card";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";
import SectionHeader from "../common/SectionHeader";

const icons = {
  Home,
  Work: Briefcase,
  Other: MapPin,
};

const AddressCard = ({
  addresses = [],
  onAdd,
  onEdit,
  onDelete,
  onSelect,
}) => {
  return (
    <section className="space-y-6">
      {/* Header */}

      <SectionHeader
        title="Saved Addresses"
        subtitle="Manage your delivery locations."
        action="Add Address"
        onAction={onAdd}
      />

      {/* Address List */}

      {addresses.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {addresses.map((address) => {
            const Icon =
              icons[address.type] ||
              MapPin;

            return (
              <Card
                key={address.id}
                className={`relative ${
                  address.default
                    ? "border-[var(--primary)]"
                    : ""
                }`}
              >
                {/* Default */}

                {address.default && (
                  <Badge
                    variant="premium"
                    className="absolute right-5 top-5"
                  >
                    <CheckCircle2 size={14} />
                    Default
                  </Badge>
                )}

                {/* Icon */}

                <div
                  className="
                    mb-5

                    flex
                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-2xl

                    text-white
                  "
                  style={{
                    background:
                      "var(--primary)",
                  }}
                >
                  <Icon size={24} />
                </div>

                {/* Info */}

                <h3 className="text-xl font-bold text-slate-900">
                  {address.type}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {address.address}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  {address.landmark}
                </p>

                <p className="mt-2 font-semibold text-slate-800">
                  {address.phone}
                </p>

                {/* Actions */}

                <div className="mt-8 flex gap-3">
                  {!address.default && (
                    <SecondaryButton
                      fullWidth
                      size="sm"
                      onClick={() =>
                        onSelect?.(address)
                      }
                    >
                      Set Default
                    </SecondaryButton>
                  )}

                  <SecondaryButton
                    size="sm"
                    onClick={() =>
                      onEdit?.(address)
                    }
                    className="!h-11 !w-11 !min-w-[44px] !p-0"
                  >
                    <Pencil size={18} />
                  </SecondaryButton>

                  <button
                    onClick={() =>
                      onDelete?.(address)
                    }
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center

                      rounded-xl

                      border
                      border-red-200

                      text-red-600

                      transition

                      hover:bg-red-50
                    "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="address"
          title="No Address Added"
          description="Add a delivery address to start ordering."
          actionText="Add Address"
          onAction={onAdd}
        />
      )}
    </section>
  );
};

export default AddressCard;