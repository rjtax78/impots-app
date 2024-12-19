import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { MdOutlineVisibility } from "react-icons/md";
const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          {/* Titre */}
          <h2 className="text-3xl font-bold mb-4 text-black">Welcome back!</h2>
          <p className="text-gray-500 mb-8">
            Start managing your finance faster and better
          </p>
          {/* Formulaire */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-500 mb-1">Email</label>
              <div className="flex items-center bg-gray-100 p-2 rounded">
                <span className="text-gray-400 material-icons flex items-center">
                  <CiMail />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent focus:outline-none px-2 pb-1"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 mb-1">Password</label>
              <div className="flex items-center bg-gray-100 p-2 rounded">
                <span className="text-gray-400 material-icons">
                  <CiLock />
                </span>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full bg-transparent focus:outline-none px-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {/* Section Droite */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center p-8">
        <div className="text-left w-full max-w-sm">
          {/* Logo */}
          <h1 className="text-blue-600 text-2xl font-bold mb-8">FINOTIC</h1>
          {/* Current Balance */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <p className="text-gray-500 text-sm">CURRENT BALANCE</p>
            <p className="text-blue-600 text-3xl font-bold">$24,359</p>
          </div>
          {/* Circular Graph */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-bold text-black">34%</p>
                <p className="text-xs text-gray-500">Food</p>
              </div>
            </div>
            {/* Add Transaction */}
            <div className="p-4 border-2 border-dashed rounded-lg text-center">
              <div className="text-blue-600 text-2xl">+</div>
              <p className="text-gray-500 text-sm">New transaction</p>
              <p className="text-gray-400 text-xs">
                or upload <span className="text-green-600">.xls</span> file
              </p>
            </div>
          </div>
          {/* Welcome Back Text */}
          <h2 className="text-2xl font-bold text-black mb-2">Welcome back!</h2>
          <p className="text-gray-500 text-sm">
            Start managing your finance faster and better
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
