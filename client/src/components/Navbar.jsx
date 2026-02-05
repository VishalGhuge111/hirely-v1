import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600">Hirely</span>
          </Link>

          <div className="flex gap-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Jobs
            </Link>

            {!user && (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition">
                  Register
                </Link>
              </>
            )}

            {user && user.role === "user" && (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 text-sm">{user.name}</span>
                  <Link to="/dashboard/user" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {user && user.role === "admin" && (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 text-sm font-medium">{user.name} (Admin)</span>
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
