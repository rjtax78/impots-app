import { useState, useEffect } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ModalForm from "../components/ModalForm";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Contributeurs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleSubmit = () => {
    alert("Form submitted!");
    handleClose();
  };
  const [contributorsData, setCotirbutorsData] = useState([]);
  const [page, setPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [limit] = useState(8); // Nombre d'éléments par page
  const [visibleMenu, setVisibleMenu] = useState(null); // État pour suivre le menu contextuel visible
  const toggleMenu = (rowIndex) => {
    setVisibleMenu(visibleMenu === rowIndex ? null : rowIndex);
  };
  const columns = [
    { title: "Nom", key: "nom" },
    { title: "Type de contributeur", key: "type_contribuable" },
    { title: "Adresse", key: "adresse" },
    { title: "Contacts", key: "telephone" },
  ];

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `/api/contributeur?page=${page}&limit=${limit}`
      );
      const result = await response.json();
      setCotirbutorsData(result.data);
      setTotalPages(Math.ceil(result.total / limit));
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase().trim(); // Convertir en minuscules pour un filtrage insensible à la casse
    // setSearchTerm(keyword);

    if (keyword === "") {
      // Si le champ est vide, réinitialiser les données
      setCotirbutorsData(contributorsData);
    } else {
      // Appliquer le filtre sur les données
      const results = contributorsData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(keyword)
        )
      );
      setCotirbutorsData(results);
    }
  };
  // Charger les données au montage et lors du changement de page
  useEffect(() => {
    fetchData(page);
  }, [page]);
  return (
    <main className="p-4 sm:p-6 h-[89vh] overflow-y-scroll">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex justify-between">
        <button
          className=" bg-blue-500 flex items-center justify-around px-3 py-2 rounded"
          onClick={handleOpen}
        >
          <FaUserPlus className="text-gray-100" />
          &nbsp;
          <span className="text-gray-100">Nouveau Membre</span>
        </button>
        <div className="relative w-[40%]">
          {/* Icône de loupe */}
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <CiSearch className="h-5 w-5" />
          </span>

          {/* Input de recherche */}
          <input
            type="text"
            className="bg-gray-100 pl-10 pr-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyUp={handleSearch}
            placeholder="Search..."
          />
        </div>{" "}
        {/* <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Paiements Mensuels et Annuels
        </h2> */}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex justify-between mt-5">
        {/* <Table data={contributorsData} columns={columns} /> */}
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="py-2 px-4 text-gray-700 dark:text-gray-300"
                >
                  {column.title}
                </th>
              ))}
              <th className="py-2 px-4 text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contributorsData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {row.nom}
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {row.type_contribuable}
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {row.adresse}
                </td>
                <td className="py-2 px-4 text-gray-900 dark:text-gray-100">
                  {row.telephone}
                </td>
                <td className="py-2 px-4 text-right relative">
                  <button
                    className="text-gray-500 dark:text-gray-300"
                    onClick={() => toggleMenu(rowIndex)}
                  >
                    <SlOptionsVertical />
                  </button>
                  {visibleMenu === rowIndex && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10">
                      <ul
                        className="text-sm text-gray-700 dark:text-gray-300"
                        onMouseLeave={() => setVisibleMenu(null)}
                      >
                        <li
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex"
                          onClick={() => {
                            console.log("Edit clicked", row.id_contrib);
                            setVisibleMenu(null); // Ferme le menu
                          }}
                        >
                          <CiEdit className=" text-green-500 w-[20px] h-[20px]" />
                          &nbsp;
                          <span>Modifier</span>
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex"
                          onClick={() => {
                            console.log("Delete clicked", row);
                            setVisibleMenu(null); // Ferme le menu
                          }}
                        >
                          <MdOutlineDelete className=" text-red-500 w-[20px] h-[20px]" />
                          &nbsp;
                          <span>Supprimer</span>
                        </li>
                      </ul>
                    </div>
                  )}
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
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <span>Suivant</span>
          <MdKeyboardDoubleArrowRight className="w-[20px] h-[20px]" />
        </button>
      </div>
      <ModalForm
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Add New Item"
        onSubmit={handleSubmit}
        submitLabel="Save"
        cancelLabel="Cancel"
      >
        {/* Customizable Form Content */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows="4"
            ></textarea>
          </div>
        </form>
      </ModalForm>
    </main>
  );
};

export default Contributeurs;
