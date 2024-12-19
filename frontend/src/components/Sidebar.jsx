import { NavLink } from "react-router-dom";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { LogoutOutlined } from "@ant-design/icons";
import { TbSettings, TbUser } from "react-icons/tb";
import { Dropdown } from "antd";
import { LuLayoutDashboard } from "react-icons/lu";
import QueueAnim from "rc-queue-anim";
import { useSelector } from "react-redux";


const Sidebar = () => {
  const { infoUser } = useSelector((state) => state.auth);

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col p-4">
      {/* Titre du Sidebar */}
      <div className="text-xl font-bold mb-6 text-gray-900 bg-gray-300 p-1 rounded-md dark:text-gray-100">
        <NavLink to="/">
          <img src="/dgi.png" className="rounded-md" />
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-4">
        <QueueAnim type="left">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <LuLayoutDashboard className="w-6 h-6" />
            <span className="ml-3">Dashboard</span>
          </NavLink>
        </QueueAnim>
        {infoUser?.role === "administrateur" && (
          <QueueAnim type="left">
            <NavLink
              to="/contributeurs"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <UserGroupIcon className="w-6 h-6" />
              <span className="ml-3">Contributeurs</span>
            </NavLink>
          </QueueAnim>
        )}
        <QueueAnim type="left">
          <NavLink
            to="/paiements"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <CurrencyDollarIcon className="w-6 h-6" />
            <span className="ml-3">Paiements</span>
          </NavLink>
        </QueueAnim>
        <QueueAnim type="left">
          <NavLink
            to="/rendez-vous"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <CalendarIcon className="w-6 h-6" />
            <span className="ml-3">Rendez-vous</span>
          </NavLink>
        </QueueAnim>
      </nav>
    </aside>
  );
};

export default Sidebar;
