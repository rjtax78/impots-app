import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";
import { MdOutlinePending } from "react-icons/md";
import { FaTimesCircle } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { Popconfirm, Tooltip } from "antd";
import { toast } from "react-toastify";
import { QuestionCircleFilled } from "@ant-design/icons";
Modal.setAppElement("#root");
const RendezVous = () => {
  const [rdvData, setRdvData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tempDate, setTempDate] = useState(new Date()); // Date temporaire pour prévisualisation
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [message, setMessage] = useState("");
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 3;
  // Calcul des éléments affichés
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rdvData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDateChange = (date) => {
    setTempDate(date); // Met à jour la date temporaire
  };
  const handleConfirm = async (rdv_id) => {
    setSelectedDate(tempDate);
    const statut = "Accepté";
    // Convertir la date en chaîne au format ISO
    const formattedDate = tempDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
    try {
      const response = await fetch(`/api/rendezVous/${rdv_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: formattedDate, statut }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      toast.success(data.message || "Rendez-vous supprimé avec succès !");
      setCurrentPage(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setMessage("Erreur lors de la mise à jour.");
    }
  };
  const handleDelete = async (rdv_id) => {
    try {
      const response = await fetch(`/api/rendezVous/${rdv_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      // Affichez le message de succès dans un toast
      toast.success(data.message || "Rendez-vous supprimé avec succès !");
      // Mettre à jour l'état local ou recharger les données
      // Mettez à jour l'état local
      setRdvData(rdvData.filter((rdv) => rdv.id_rendez_vous !== rdv_id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setMessage("Erreur lors de la suppression.");
    }
  };
  // Rejeter une demande
  const rejectReq = async (rdv_id) => {
    const statut = "Rejeté";
    try {
      const response = await fetch(`/api/rendezVous/rejectRdv/${rdv_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statut }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      toast.success(data.message || "Rendez-vous rejeté avec succès !");
      fetchRDV();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setMessage("Erreur lors de la mise à jour.");
    }
  };
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
  const fetchRDV = async () => {
    try {
      const response = await fetch("/api/rendezVous");
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const result = await response.json();
      setRdvData(result);
      // setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  useEffect(() => {
    fetchRDV();
  }, [rdvData]);

  return (
    <main className="p-4 sm:p-6 h-[89vh] overflow-y-scroll">
      <div className="p-6 rounded-lg">
        <ul className="space-y-4">
          {rdvData?.map((rdv) => (
            <li
              key={rdv.id_rendez_vous}
              className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow flex justify-between items-center"
            >
              <div className="w-[60%]">
                <p className="text-gray-600 dark:text-gray-100">
                  <strong>Motif du rendez-vous:</strong>&nbsp;
                  {rdv.objet}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Demandeur:</strong>&nbsp;
                  {rdv.nom}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Date prevu:</strong>&nbsp;
                  {rdv.date_rendez_vous === null
                    ? "Non fixe"
                    : formatDate(rdv.date_rendez_vous)}
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <strong>Statut:</strong>&nbsp;
                  <p
                    className={`w-[40%] flex rounded-2xl items-center px-2 text-white py-1 dark:text-gray-300 ${
                      {
                        "En attente": "bg-yellow-500",
                        Accepté: "bg-green-500",
                        Rejeté: "bg-red-500",
                      }[rdv.statut] || "bg-gray-500"
                    }`}
                  >
                    {
                      {
                        "En attente": (
                          <MdOutlinePending className="w-[20px] h-[20px]" />
                        ),
                        "Accepté": (
                          <IoCheckmarkDone className="w-[20px] h-[20px]" />
                        ),
                        "Rejeté": <FaTimesCircle className="w-[20px] h-[20px]" />,
                      }[rdv.statut]
                    }&nbsp;
                    {rdv.statut}
                  </p>
                </div>
              </div>
              <div className="w-[20%] flex flex-col">
                {/* Icône cliquable */}
                <button
                  onClick={openModal}
                  className={` dark:text-white rounded-full flex items-center p-2 ${
                    rdv.statut !== "En attente" ? "line-through" : ""
                  }`}
                  disabled={rdv.statut !== "En attente"}
                >
                  <IoCalendarNumberOutline className="w-5 h-5 text-blue-500" />
                  &nbsp;
                  <span>Programmer un date</span>
                </button>
                <Popconfirm
                  title="Attention"
                  description="Etes-vous sur de volour suivre cette action ?"
                  icon={<QuestionCircleFilled />}
                  okText="Oui"
                  okType="danger"
                  cancelText="Non"
                  onConfirm={() => rejectReq(rdv?.id_rendez_vous)}
                  className={` dark:text-white rounded-full flex items-center p-2 cursor-pointer ${
                    rdv.statut !== "En attente"
                      ? "line-through cursor-default"
                      : ""
                  }`}
                  disabled={rdv.statut !== "En attente"}
                >
                  <FaTimesCircle className="w-5 h-5 text-yellow-500" />
                  &nbsp;
                  <span>Rejete la demande</span>
                </Popconfirm>
                <Popconfirm
                  title="Attention"
                  description="Etes-vous sur de volour suivre cette action ?"
                  icon={<QuestionCircleFilled />}
                  okText="Oui"
                  okType="danger"
                  cancelText="Non"
                  onConfirm={() => handleDelete(rdv?.id_rendez_vous)}
                  className=" dark:text-white rounded-full flex items-center p-2 cursor-pointer dark:bg-gray-700"
                >
                  <AiOutlineDelete className="w-5 h-5 text-red-500" />
                  &nbsp;
                  <span>Supprimer de la liste</span>
                </Popconfirm>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Calendrier"
                  style={{
                    content: {
                      width: "350px",
                      height: "400px",
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
                  {/* Calendrier */}
                  <Calendar
                    onChange={handleDateChange}
                    locale="fr-FR"
                    value={tempDate}
                    className="flex-1 h-full w-full" // Laisse le calendrier occuper l'espace disponible
                  />

                  {/* Boutons */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={closeModal}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleConfirm(rdv?.id_rendez_vous)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none"
                    >
                      Valider
                    </button>
                  </div>
                </Modal>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default RendezVous;
