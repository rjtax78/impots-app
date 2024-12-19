import React,{useState} from "react";
import { SlOptionsVertical } from "react-icons/sl";

const Table = ({ data, columns }) => {
  const [visibleMenu, setVisibleMenu] = useState(null); // État pour suivre le menu contextuel visible

  const toggleMenu = (rowIndex) => {
    setVisibleMenu(visibleMenu === rowIndex ? null : rowIndex);
  };
  return (
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
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className="py-2 px-4 text-gray-900 dark:text-gray-100"
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : row[column.key]}
              </td>
            ))}
            {/* Colonne pour l'icône des actions */}
            <td className="py-2 px-4 text-right relative">
              <button
                className="text-gray-500 dark:text-gray-300"
                onClick={() => toggleMenu(rowIndex)}
              >
                <SlOptionsVertical />
              </button>
              {visibleMenu === rowIndex && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10">
                  <ul className="text-sm text-gray-700 dark:text-gray-300">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        console.log("Edit clicked", row.adresse);
                        setVisibleMenu(null); // Ferme le menu
                      }}
                    >
                      Edit
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        console.log("Delete clicked", row);
                        setVisibleMenu(null); // Ferme le menu
                      }}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
