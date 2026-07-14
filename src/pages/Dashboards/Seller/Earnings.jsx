import { useState } from "react";
import { motion } from "framer-motion";
// import * as XLSX from "xlsx";

import EarningsSummaryCards from "../../../components/dashboard/earnings/EarningsSummaryCards";
import EarningsChart from "../../../components/dashboard/earnings/EarningsChart";
import TodaysEarnings from "../../../components/dashboard/earnings/TodaysEarnings";
import CODPaymentTable from "../../../components/dashboard/earnings/CODPaymentTable";
import EarningsHistory from "../../../components/dashboard/earnings/EarningsHistory";
import RegularCustomers from "../../../components/dashboard/earnings/RegularCustomers";

import {
  earningsSummary,
  earningsChartData,
  todaysOrders,
  earningsHistory,
  regularCustomers,
} from "../../../components/dashboard/earnings/earningsData.js";

export default function Earnings() {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState("30d");
  const [payment, setPayment] = useState("all");

  const handleRefresh = () => {
    setSearch("");
    setRange("30d");
    setPayment("all");
  };

  const handleReset = () => {
    setSearch("");
    setRange("30d");
    setPayment("all");
  };

  const handleExport = () => {
    const workbook = XLSX.utils.book_new();

    // Summary
    const summaryData = [
      {
        "Today's Earnings": earningsSummary.todayEarnings,
        "Today's Orders": earningsSummary.todayOrders,
        "Average Order": earningsSummary.averageOrderValue,
        "COD Pending": earningsSummary.codPending,
        "Online Received": earningsSummary.onlineReceived,
        "Monthly Revenue": earningsSummary.monthlyRevenue,
        "Revenue Growth (%)": earningsSummary.revenueGrowth,
      },
    ];

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // Orders
    const ordersSheet = XLSX.utils.json_to_sheet(
      todaysOrders.map((order) => ({
        OrderID: order.id,
        Customer: order.customer,
        Payment: order.payment,
        Status: order.status,
        Amount: order.amount,
        Time: order.time,
      })),
    );

    XLSX.utils.book_append_sheet(workbook, ordersSheet, "Orders");

    // Earnings History
    const historySheet = XLSX.utils.json_to_sheet(
      earningsHistory.map((item) => ({
        Date: item.date,
        Orders: item.orders,
        Revenue: item.revenue,
      })),
    );

    XLSX.utils.book_append_sheet(workbook, historySheet, "History");

    // Customers
    const customersSheet = XLSX.utils.json_to_sheet(
      regularCustomers.map((customer) => ({
        Name: customer.name,
        Orders: customer.orders,
        LifetimeSpend: customer.spent,
        LastOrder: customer.lastOrder,
        Tier: customer.status,
      })),
    );

    XLSX.utils.book_append_sheet(workbook, customersSheet, "Customers");

    XLSX.writeFile(
      workbook,
      `Earnings_Report_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
  };

  const filteredOrders = todaysOrders.filter((order) => {
    const matchesSearch = `${order.customer} ${order.id}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPayment = payment === "all" ? true : order.payment === payment;

    return matchesSearch && matchesPayment;
  });

  const filteredHistory = earningsHistory.filter((item) =>
    item.date.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredCustomers = regularCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()),
  );

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
        duration: 0.35,
      }}
      className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Earnings</h1>

        <p className="mt-2 text-slate-500">
          Track earnings, payments, customer spending and revenue trends.
        </p>
      </div>

      <EarningsSummaryCards summary={earningsSummary} />

      <EarningsChart
        data={earningsChartData}
        filter={range}
        onFilterChange={setRange}
        onRefresh={handleRefresh}
      />

      <TodaysEarnings summary={earningsSummary} />

      <CODPaymentTable orders={filteredOrders} />

      <EarningsHistory history={filteredHistory} />

      <RegularCustomers customers={filteredCustomers} />
    </motion.div>
  );
}
