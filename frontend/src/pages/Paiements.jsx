import { useState, useEffect } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
const Paiements = () => {
  const [payementsData, setPayementData] = useState([]);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [limit] = useState(8); 
  const [activeTab, setActiveTab] = useState("all");

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `/api/paiements?page=${page}&limit=${limit}`
      );
      const result = await response.json();
      setPayementData(result.data);
      setTotalPages(Math.ceil(result.total / limit));
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);
  // Filtrer les paiements en fonction de l'onglet actif
  const filteredPaiements = payementsData.filter((paiement) => {
    if (activeTab === "paid") return paiement.is_payed === true;
    if (activeTab === "unpaid") return paiement.is_payed !== true;
    return true; // "all"
  });
  return (
    <main className="p-4 sm:p-6 h-[89vh] overflow-y-scroll">
      <div className="flex justify-between items-center bg-white dark:bg-gray-700 rounded-lg p-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "all"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("all")}
        >
          Tous les paiements
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "paid"
              ? "bg-green-500 text-white"
              : "bg-transparent text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("paid")}
        >
          Paiements effectués
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "unpaid"
              ? "bg-yellow-500 text-white"
              : "bg-transparent text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("unpaid")}
        >
          Paiements non effectués
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex justify-between mt-5">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
                Contributeur
              </th>
              <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
                Impots concerne
              </th>
              <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
                Base impose (En Ariary)
              </th>
              <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
                Montant paye / ans (En Ariary)
              </th>
              <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
                Date de payement
              </th>
              <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPaiements.map((paiement) => (
              <tr
                key={paiement.id_paiement}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {paiement.nom}
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {paiement.nom_impot}
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {paiement.base_imposable}
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {paiement.montant}
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {paiement.date_paiement == null
                    ? "Non prevu"
                    : paiement.date_paiement}
                </td>
                <td
                  className={`flex items-center py-1 mt-1 px-4 rounded-2xl ${
                    paiement.is_payed === false
                      ? "bg-yellow-500 text-white dark:bg-none dark:text-white"
                      : "bg-green-500 text-white dark:text-white"
                  }`}
                >
                  {" "}
                  {paiement.is_payed === false ? (
                    <MdOutlinePending className="text-white w-[20px] h-[20px]" />
                  ) : (
                    <IoCheckmarkDone className="text-white w-[20px] h-[20px]" />
                  )}
                  &nbsp;
                  <span>
                    {paiement.is_payed === false
                      ? "En attente"
                      : "Deja effectue"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-500
          disabled:opacity-50 text-white cursor-pointer disabled:cursor-default flex items-center"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          <MdKeyboardDoubleArrowLeft className="w-[20px] h-[20px]" />
          <span>Précédent</span>
        </button>
        <span className=" dark:text-white">
          Page {page} sur {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-500
          disabled:opacity-50 text-white cursor-pointer disabled:cursor-default flex items-center"
          disabled={page === totalPages-1}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <span>Suivant</span>
          <MdKeyboardDoubleArrowRight className="w-[20px] h-[20px]" />
        </button>
      </div>
    </main>
  );
};

export default Paiements;
