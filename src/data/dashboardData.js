// ==============================
// Seller Dashboard Mock Data
// Replace with API data later
// ==============================
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

export const stats = [
  {
    id: 1,
    title: "Today's Revenue",
    value: "₹8,540",
    trend: 12.5,
    subtitle: "vs yesterday",
    icon: IndianRupee,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 2,
    title: "Orders",
    value: "10",
    trend: 8.2,
    subtitle: "vs yesterday",
    icon: ShoppingCart,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Products",
    value: "8",
    trend: 6,
    subtitle: "this week",
    icon: Package,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 4,
    title: "Customers",
    value: "318",
    trend: 15,
    subtitle: "this month",
    icon: Users,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export const salesData = [
  { day: "Mon", sales: 4500 },
  { day: "Tue", sales: 6200 },
  { day: "Wed", sales: 7100 },
  { day: "Thu", sales: 5300 },
  { day: "Fri", sales: 8800 },
  { day: "Sat", sales: 11000 },
  { day: "Sun", sales: 9300 },
];

export const recentOrders = [
  {
    id: "#ORD1001",
    customer: "Rahul Sharma",
    amount: "₹420",
    status: "Delivered",
  },
  {
    id: "#ORD1002",
    customer: "Priya Singh",
    amount: "₹650",
    status: "Preparing",
  },
  {
    id: "#ORD1003",
    customer: "Ankit Kumar",
    amount: "₹250",
    status: "Pending",
  },
  {
    id: "#ORD1004",
    customer: "Simran Kaur",
    amount: "₹870",
    status: "Delivered",
  },
  {
    id: "#ORD1005",
    customer: "Aman Verma",
    amount: "₹310",
    status: "Out for Delivery",
  },
  {
    id: "#ORD1006",
    customer: "Neha Gupta",
    amount: "₹540",
    status: "Preparing",
  },
  {
    id: "#ORD1007",
    customer: "Rohit Yadav",
    amount: "₹180",
    status: "Cancelled",
  },
  {
    id: "#ORD1008",
    customer: "Karan Mehta",
    amount: "₹920",
    status: "Delivered",
  },
  {
    id: "#ORD1009",
    customer: "Sneha Kapoor",
    amount: "₹470",
    status: "Pending",
  },
  {
    id: "#ORD1010",
    customer: "Vikas Arora",
    amount: "₹690",
    status: "Preparing",
  },
  {
    id: "#ORD1011",
    customer: "Pooja Malhotra",
    amount: "₹360",
    status: "Delivered",
  },
  {
    id: "#ORD1012",
    customer: "Arjun Patel",
    amount: "₹1,150",
    status: "Out for Delivery",
  },
  {
    id: "#ORD1013",
    customer: "Meera Joshi",
    amount: "₹580",
    status: "Delivered",
  },
  {
    id: "#ORD1014",
    customer: "Sahil Bansal",
    amount: "₹220",
    status: "Pending",
  },
  {
    id: "#ORD1015",
    customer: "Isha Arora",
    amount: "₹760",
    status: "Preparing",
  },
  {
    id: "#ORD1016",
    customer: "Harsh Chawla",
    amount: "₹840",
    status: "Delivered",
  },
  {
    id: "#ORD1017",
    customer: "Nisha Arora",
    amount: "₹395",
    status: "Cancelled",
  },
  {
    id: "#ORD1018",
    customer: "Deepak Saini",
    amount: "₹510",
    status: "Out for Delivery",
  },
  {
    id: "#ORD1019",
    customer: "Ritika Jain",
    amount: "₹275",
    status: "Pending",
  },
  {
    id: "#ORD1020",
    customer: "Manpreet Singh",
    amount: "₹980",
    status: "Delivered",
  },
];

export const lowStock = [
  {
    id: 1,
    name: "Paneer Burger",
    stock: 4,
  },
  {
    id: 2,
    name: "French Fries",
    stock: 6,
  },
  {
    id: 3,
    name: "Cold Coffee",
    stock: 3,
  },
];

export const topProducts = [
  {
    id: 1,
    name: "Cheese Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop",
    sold: 182,
    revenue: 82400,
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Chicken Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
    sold: 154,
    revenue: 63500,
    stock: "Low Stock",
  },
  {
    id: 3,
    name: "Veg Wrap",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&h=200&fit=crop",
    sold: 121,
    revenue: 45600,
    stock: "In Stock",
  },
  {
    id: 4,
    name: "Cold Coffee",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop",
    sold: 118,
    revenue: 28800,
    stock: "Out of Stock",
  },
  {
    id: 5,
    name: "French Fries",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200&h=200&fit=crop",
    sold: 110,
    revenue: 27500,
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Paneer Tikka",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&h=200&fit=crop",
    sold: 104,
    revenue: 46800,
    stock: "In Stock",
  },
  {
    id: 7,
    name: "Chicken Biryani",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=200&h=200&fit=crop",
    sold: 97,
    revenue: 58200,
    stock: "Low Stock",
  },
  {
    id: 8,
    name: "Chocolate Shake",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&h=200&fit=crop",
    sold: 91,
    revenue: 21400,
    stock: "In Stock",
  },
  {
    id: 9,
    name: "Veg Momos",
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=200&h=200&fit=crop",
    sold: 86,
    revenue: 19800,
    stock: "In Stock",
  },
  {
    id: 10,
    name: "Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=200&h=200&fit=crop",
    sold: 79,
    revenue: 35200,
    stock: "Out of Stock",
  },
];

export const activities = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    description: "Order #ORD-1042 has been placed by Rahul Sharma.",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    description: "₹1,250 payment received via UPI.",
    time: "8 min ago",
  },
  {
    id: 3,
    type: "delivery",
    title: "Order Assigned",
    description: "Order #ORD-1041 assigned to Aman Kumar.",
    time: "15 min ago",
  },
  {
    id: 4,
    type: "product",
    title: "Product Updated",
    description: "Cheese Pizza price updated successfully.",
    time: "22 min ago",
  },
  {
    id: 5,
    type: "inventory",
    title: "Low Stock Alert",
    description: "Chicken Burger stock is running low (5 left).",
    time: "35 min ago",
  },
  {
    id: 6,
    type: "order",
    title: "Order Delivered",
    description: "Order #ORD-1039 delivered successfully.",
    time: "48 min ago",
  },
  {
    id: 7,
    type: "review",
    title: "New Customer Review",
    description: "Priya Singh rated Cheese Pizza 5★.",
    time: "1 hour ago",
  },
  {
    id: 8,
    type: "payment",
    title: "Refund Processed",
    description: "₹320 refunded for Order #ORD-1034.",
    time: "1 hour ago",
  },
  {
    id: 9,
    type: "delivery",
    title: "Delivery Picked Up",
    description: "Rider picked up Order #ORD-1040.",
    time: "2 hours ago",
  },
  {
    id: 10,
    type: "store",
    title: "Store Opened",
    description: "Your store is now accepting orders.",
    time: "3 hours ago",
  },
];

export const quickActions = [
  {
    id: 1,
    title: "Add Product",
  },
  {
    id: 2,
    title: "View Orders",
  },
  {
    id: 3,
    title: "Manage Inventory",
  },
  {
    id: 4,
    title: "Delivery Board",
  },
];