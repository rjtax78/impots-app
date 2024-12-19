import { useState, useRef, useEffect } from "react";
import { TbSettings, TbUser } from "react-icons/tb";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { LogoutOutlined } from "@ant-design/icons";
import { LuSunMoon } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";


const Header = ({
  darkMode,
  toggleDarkMode,
  changeProfileHandler,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [loginOut] = useLogoutMutation();
  
    const logoutHandler = async () => {
      try {
        await loginOut().unwrap();
        dispatch(logout());
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const location = useLocation();
  // Définir les titres en fonction de la route
  const pageTitles = {
    "/": "Dashboard",
    "/contributeurs": "Contributeurs",
    "/paiements": "Paiements",
    "/rendez-vous": "Rende-vous",
  };
  // Récupérer le titre actuel
  const currentTitle = pageTitles[location.pathname] || "Dashboard";
  // Gestion du clic extérieur pour fermer le menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {currentTitle}
      </h1>
      <div className="relative">
        {/* Bouton pour ouvrir le menu */}
        <button
          className="flex items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <TbSettings className="h-6 w-6 text-gray-500 dark:text-gray-300" />
        </button>

        {/* Menu des paramètres */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-48 z-50 transform transition-all duration-200 ease-out opacity-100 scale-100"
          >
            <ul className="py-2">
              {/* Mode Sombre/Clair */}
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  {darkMode ? (
                    <>
                      <SunIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      Mode Sombre
                    </>
                  ) : (
                    <>
                      <MoonIcon className="h-5 w-5 text-gray-500 mr-2" />
                      Mode Claire
                    </>
                  )}
                </button>
              </li>
              {/* Déconnexion */}
              <li>
                <button
                  onClick={logoutHandler}
                  className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  <LogoutOutlined className="mr-2" />
                  Se déconnecter
                </button>
              </li>
              {/* Changer de Profil */}
              <li>
                <button
                  onClick={changeProfileHandler}
                  className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  <TbUser className="mr-2" />
                  Changer de profil
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
