import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const StatsPieChart = () => {
  const [totalRdv, setTotalRdv] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [refused, setRefused] = useState(0);
  const [pending, setPending] = useState(0);

  // Données pour les paiements
  // const paymentData = [
  //   { name: "Effectués", value: 70 },
  //   { name: "En attente", value: 30 },
  // ];

  // Couleurs
  const COLORS = ["#4CAF50", "#F44336", "#FF9800"];
  const fetchRdvStats = async () => {
    try {
      const response = await fetch("/api/rdvStat/rdv/total");
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const { totalRdv, accepted, refused, pending } = await response.json();
      setTotalRdv(totalRdv);
      setAccepted(accepted);
      setRefused(refused);
      setPending(pending);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  useEffect(() => {
    fetchRdvStats();
  }, []);
  // Données pour les rendez-vous
  const appointmentData = [
    { name: "Confirmés", value: parseInt(accepted) },
    { name: "Annulés", value: parseInt(refused) },
    { name: "En attente", value: parseInt(pending) },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Paiements PieChart */}
      {/* <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Statistiques des Paiements
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={paymentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div> */}

      {/* Rendez-vous PieChart */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Statistiques des Rendez-vous
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={appointmentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {appointmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsPieChart;
