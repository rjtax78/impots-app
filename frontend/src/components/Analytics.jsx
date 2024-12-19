import { useState, useEffect } from "react";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { IoMdNotificationsOutline } from "react-icons/io";
const Analytics = () => {
  // Statistics pour les paiements
  const [total, setTotal] = useState(0);
  const [payed, setPayed] = useState(0);
  const [notPayed, setNotPayed] = useState(0);
  const [totalRdv, setTotalRdv] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [refused, setRefused] = useState(0);
  const [pending, setPending] = useState(0);
  // Statistics pour les rendez vous
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/payementsStat/paiements/total");
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const { totalPayments, isPayed, isLate } = await response.json();
      setTotal(totalPayments);
      setPayed(isPayed);
      setNotPayed(isLate);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
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
    fetchStats();
    fetchRdvStats();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-1 bg-gray-200 rounded-full">
            <UserGroupIcon className="w-[25px] h-[25px] rounded-full" />
          </div>
          &nbsp;
          <h2 className="text-xl text-gray-500 dark:text-gray-400">
            Contributeurs
          </h2>
        </div>

        <div className="mt-2 flex flex-col">
          <div className=" bg-gray-200 rounded-xl text-center">
            Total : {total}
          </div>
          &nbsp;
          <div className="flex justify-between">
            <p className="w-1/2 bg-green-400 rounded-xl px-2 text-white">
              Lu: {payed}
            </p>
            &nbsp;
            <p className="w-1/2 bg-yellow-400 rounded-xl px-2 text-white">
              Non lu: {notPayed}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-1 bg-gray-200 rounded-full">
            <CurrencyDollarIcon className=" w-[25px] h-[25px] rounded-full" />
          </div>
          &nbsp;
          <h2 className="text-xl text-gray-500 dark:text-gray-400">
            Paiements
          </h2>
        </div>

        <div className="  mt-2 flex flex-col">
          <div className=" bg-gray-200 rounded-xl text-center">
            Total : {total}
          </div>
          &nbsp;
          <div className="flex justify-between">
            <p className="w-1/2 bg-green-400 rounded-xl px-2 text-white">
              Effectués: {payed}
            </p>
            &nbsp;
            <p className="w-1/2 bg-yellow-400 rounded-xl px-2 text-white">
              En attente: {notPayed}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-1 bg-gray-200 rounded-full">
            <IoMdNotificationsOutline className=" w-[25px] h-[25px] rounded-full" />
          </div>
          &nbsp;
          <h2 className="text-xl text-gray-500 dark:text-gray-400">
            Notifications
          </h2>
        </div>
        <div className="  mt-2 flex flex-col">
          <div className=" bg-gray-200 rounded-xl text-center">
            Total : {totalRdv}
          </div>
          &nbsp;
          <div className="flex justify-between">
            <p className="w-1/2 bg-green-400 rounded-xl px-2 text-white">
              Lu: {accepted}
            </p>
            &nbsp;
            <p className="w-1/2 bg-yellow-400 rounded-xl px-2 text-white">
              Non lu: {refused}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
