import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "./components/tremor/Button";
import DatabaseForm from "./components/DatabaseForm";
import { signOut } from "../backend/firebase/login";

const Layout = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Barra lateral fija */}
      <nav className="w-64 bg-black text-white p-5 border-r border-gray-800">
        <div className="flex items-center gap-2 mb-6">
          <img src="/dbreeze.png" className="w-10"></img>
          <h2 className="text-2xl font-bold">DBreeze</h2>
        </div>
        <ul>
          <li className="mb-2">
            <Link to="/" className="flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900">Content</Link>
          </li>
          <li className="mb-2">
            <Link to="/overview" className="flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900">Overview</Link>
          </li>
          <li className="mb-2">
            <Link to="/settings" className="flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900">Settings</Link>
          </li>
        </ul>
        <Button
          variant="primary"
          className="my-4 gap-2"
          onClick={() => setIsPopupVisible(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add connection
        </Button>
        <div>
          <span className="text-xs font-medium leading-6 text-gray-500">
            Databases
          </span>
        </div>
        <Button variant="primary" className="my-4 gap-2" onClick={signOut}>Cerrar sesión</Button>
      </nav>

      {/* Contenido dinámico */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Aquí se renderizan las páginas según la URL */}
      </main>

      {/* Popup for DatabaseForm */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded shadow-lg relative text-white text-lg">
            <h2 className="text-lg font-bold ml-4">Add connection</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsPopupVisible(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <DatabaseForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
