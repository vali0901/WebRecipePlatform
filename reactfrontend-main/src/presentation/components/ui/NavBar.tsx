import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../routes";
import { NavbarLanguageSelector } from "./NavbarLanguageSelector/NavbarLanguageSelector";

const NavBar: React.FC<{ isAdmin: boolean; isLoggedIn: boolean; onLogout?: () => void }> = ({ isAdmin, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate(AppRoute.Index);
  };

  return (
    <nav className="flex items-center gap-4 px-8 py-3 bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <Link to={AppRoute.Index} className="text-lg font-bold text-blue-700 hover:text-blue-900 transition">Acasă</Link>
      {isLoggedIn && <Link to={AppRoute.Ingredients} className="text-md text-gray-700 hover:text-blue-700 transition">Ingrediente</Link>}
      {isLoggedIn && <Link to={AppRoute.MyRecipes} className="text-md text-gray-700 hover:text-blue-700 transition">Rețetele Mele</Link>}
      {isAdmin && <Link to={AppRoute.Users} className="text-md text-gray-700 hover:text-blue-700 transition">Utilizatori</Link>}
      <span className="flex-1" />
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Logout</button>
        </>
      ) : (
        <>
          <NavbarLanguageSelector />
          <Link to={AppRoute.Login} className="px-4 py-2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-600 hover:bg-blue-100 transition mr-2">Login</Link>
          <Link to={AppRoute.Register} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
