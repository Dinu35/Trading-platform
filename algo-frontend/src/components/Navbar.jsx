import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [authUser, setAuthUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // 🔥 mobile menu

  // 🔐 Load user on route change
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    setAuthUser(user ? JSON.parse(user) : null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setAuthUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-black text-white px-6 py-4 relative z-50">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <h1
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
          className="text-2xl font-bold text-green-400 cursor-pointer"
        >
          AlgoTrade
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/products" className="hover:text-green-400">Courses</Link>
          <Link to="/services" className="hover:text-green-400">Services</Link>
          <Link to="/blogs" className="hover:text-green-400">Blogs</Link>
          <Link to="/about" className="hover:text-green-400">About</Link>
          <Link to="/contact" className="hover:text-green-400">Contact</Link>

          {authUser?.role === "user" && (
            <>
              <Link to="/user/dashboard" className="hover:text-green-400">
                Dashboard
              </Link>
              <Link to="/my-courses" className="hover:text-green-400">
                My Courses
              </Link>
            </>
          )}

          {authUser?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:text-green-400">
                Dashboard
              </Link>
              <Link to="/admin/products" className="hover:text-green-400">
                Courses Admin
              </Link>
              <Link to="/admin/blogs" className="hover:text-green-400">
                Blogs Admin
              </Link>
            </>
          )}

          {!authUser ? (
            <div className="flex gap-3">
              <Link
                to="/admin/login"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold text-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded-lg font-semibold transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-black border-t border-gray-800 rounded-xl p-6 space-y-4">
          <Link onClick={() => setMenuOpen(false)} to="/" className="block text-center">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/products" className="block text-center">Courses</Link>
          <Link onClick={() => setMenuOpen(false)} to="/services" className="block text-center">Services</Link>
          <Link onClick={() => setMenuOpen(false)} to="/blogs" className="block text-center">Blogs</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about" className="block text-center">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact" className="block text-center">Contact</Link>

          {/* AUTH BUTTONS – IMPROVED UI */}
          {!authUser ? (
            <div className="pt-4 space-y-3">
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center
                bg-green-500 text-black
                py-3 rounded-xl font-semibold
                shadow-lg shadow-green-500/30
                hover:bg-green-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center
                bg-gray-900 border border-green-500
                text-green-400
                py-3 rounded-xl font-semibold
                hover:bg-green-500 hover:text-black
                transition"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold mt-4"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
