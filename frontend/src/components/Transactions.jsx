import { useState, useEffect } from "react";
// import Table from "./Table";
import { toast } from "react-toastify";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import { PiNotificationLight } from "react-icons/pi";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const Transactions = () => {
  const { infoUser } = useSelector((state) => state.auth);

  const [payementsData, setPayementData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Donnes du form
  const [typeNotif, setNotifType] = useState("");
  const [msg, setMsg] = useState("");
  const [recepMail, setRecepMail] = useState("");
  // const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSubmit = async () => {
    const userId = infoUser?.userId;
    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, typeNotif, msg, recepMail }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      handleClose();
      toast.success(data.message || "Rendez-vous supprimé avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  const handleData = (email) => {
    setRecepMail(email);
  };

  const toggleMenu = (rowIndex) => {
    setVisibleMenu(visibleMenu === rowIndex ? null : rowIndex);
  };
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
    handleData(recepMail);
  }, [recepMail]);
  useEffect(() => {
    fetchData(page);
  }, [page]);
  // console.log(payementsData);
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    // Formatteur pour afficher le jour, le mois, et l'année
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long", // Nom complet du jour
      day: "numeric", // Jour du mois
      month: "long", // Nom complet du mois
      year: "numeric", // Année
    });

    return formatter.format(date);
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg  flex-1">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Transactions
      </h2>
      {/* <Table data={transactions} columns={columns} /> */}
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead>
          <tr>
            <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
              Contribuale
            </th>
            <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
              Echeance
            </th>
            <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
              Montant a payer
            </th>
            <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
              Status
            </th>
            <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {payementsData.map((transaction, rowIndex) => (
            <tr
              key={transaction.id_paiement}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                {transaction.nom}
              </td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                {formatDate(transaction.date_echeance)}
              </td>
              <td className="py-2 px-4  text-gray-900 dark:text-gray-100">
                {parseFloat(transaction.base_imposable) +
                  parseFloat(transaction.montant)}
              </td>
              <td
                className={`py-2 px-4 ${
                  transaction.status === "en attente"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {transaction.status}
              </td>
              <td className="py-2 px-4 text-right relative">
                <button
                  className="text-gray-500 dark:text-gray-300"
                  onClick={() => toggleMenu(rowIndex)}
                >
                  <SlOptionsVertical />
                </button>
                {visibleMenu === rowIndex && (
                  <div className="absolute right-0 mt-2 w-[15rem] bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10 ">
                    <ul
                      className="text-sm text-gray-700 dark:text-gray-300"
                      onMouseLeave={() => setVisibleMenu(null)}
                    >
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex"
                        onClick={() => {
                          console.log("Edit clicked", transaction.id_paiement);
                          setVisibleMenu(null); // Ferme le menu
                        }}
                      >
                        <TbListDetails className=" text-blue-500 w-[20px] h-[20px]" />
                        &nbsp;
                        <span>Voir plus de details</span>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex"
                        onClick={() => {
                          handleData(transaction.email);
                          setIsModalOpen(true);
                          setVisibleMenu(null); // Ferme le menu
                        }}
                      >
                        <PiNotificationLight className=" text-blue-500 w-[20px] h-[20px]" />
                        &nbsp;
                        <span>Notifier Ce contributeur</span>
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <span>Suivant</span>
          <MdKeyboardDoubleArrowRight className="w-[20px] h-[20px]" />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Calendrier"
        // className="dark:bg-gray-800 dark:text-white bg-white text-gray-800 border dark:border-gray-600 border-gray-300 rounded-lg shadow-lg flex flex-col justify-between"
        // overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            width: "350px",
            height: "325px",
            margin: "auto",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Espacement vertical
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {/* Boutons */}
        <div className="flex flex-col mt-4">
          {/* Customizable Form Content */}
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Type de notification
              </label>
              <select
                value={typeNotif}
                onChange={(e) => setNotifType(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="" disabled>
                  Sélectionnez un type
                </option>
                <option value="confirmation">Confirmation</option>
                <option value="refus">Refus</option>
                <option value="rappel">Rappel</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows="4"
                value={msg} // Liaison de l'état à la valeur du textarea
                onChange={(e) => setMsg(e.target.value)} // Gestion de l'événement de modification
              />
            </div>
          </form>
          <div className="w-full flex justify-between">
            <button
              onClick={() => handleSubmit()}
              className="bg-blue-500 w-1/2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Envoyer
            </button>
            &nbsp;
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 w-1/2 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Transactions;
