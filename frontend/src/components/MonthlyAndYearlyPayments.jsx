import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyAndYearlyPayments = () => {
  // Données des paiements
  const data = [
    { month: "Jan", monthly: 4000, yearly: 48000 },
    { month: "Feb", monthly: 3000, yearly: 45000 },
    { month: "Mar", monthly: 5000, yearly: 52000 },
    { month: "Apr", monthly: 7000, yearly: 59000 },
    { month: "May", monthly: 6000, yearly: 62000 },
    { month: "Jun", monthly: 8000, yearly: 70000 },
    { month: "Jul", monthly: 7000, yearly: 77000 },
    { month: "Aug", monthly: 9000, yearly: 85000 },
    { month: "Sep", monthly: 7500, yearly: 92000 },
    { month: "Oct", monthly: 9500, yearly: 101000 },
    { month: "Nov", monthly: 6500, yearly: 107500 },
    { month: "Dec", monthly: 8500, yearly: 116000 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Paiements Mensuels et Annuels
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="month" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Legend />
          {/* Barres pour les paiements mensuels */}
          <Bar dataKey="monthly" fill="#4CAF50" name="Mensuel" />
          {/* Barres pour les paiements annuels */}
          <Bar dataKey="yearly" fill="#FF9800" name="Annuel" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyAndYearlyPayments;
