import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Analytics from "./components/Analytics";
import Transactions from "./components/Transactions";
import Dashboard from "./pages/Dashboard";
import Contributeurs from "./pages/Contributeurs";
import Paiements from "./pages/Paiements";
import RendezVous from "./pages/RendezVous";
import LandingPage from "./pages/LandingPage";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem("darkMode");
    return storedPreference === "true"; // Convertir la chaîne en booléen
  });
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Sauvegarder la préférence
      document.documentElement.classList.toggle("dark", newMode); // Appliquer la classe
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <main className="space-y-6">
              <Outlet />{" "}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
