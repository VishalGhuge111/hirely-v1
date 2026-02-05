import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="bg-white rounded-2xl px-3 py-2 border-4 border-black">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">H</span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  <div>HIRELY</div>
                  <div className="text-xs text-gray-600">HIRE EARLY</div>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex gap-4 items-center flex-1 justify-center">
            <Link to="/" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full border-2 border-black transition">
              HOME
            </Link>
            <Link to="/about" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full border-2 border-black transition">
              ABOUT
            </Link>
            <a href="/#services" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full border-2 border-black transition">
              SERVICES
            </a>
            <Link to="/jobs" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full border-2 border-black transition">
              JOBS
            </Link>
            <Link to="/contact" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full border-2 border-black transition">
              CONTACT
            </Link>
          </div>

          {/* Right Side - Auth/Profile */}
          <div className="flex items-center gap-4">
            {/* Auth Section */}
            {!user && (
              <div className="hidden sm:flex gap-3">
                <Link to="/login" className="bg-white text-black font-bold px-5 py-2 rounded-lg hover:bg-gray-100 transition">
                  LOGIN
                </Link>
                <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-2 rounded-lg border-2 border-black transition">
                  SIGN UP
                </Link>
              </div>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="bg-white text-black font-bold px-4 py-2 rounded-lg border-2 border-black hover:bg-gray-100 flex items-center gap-2 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">{user.name}</span>
                  <svg className={`w-4 h-4 transition ${profileMenuOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border-2 border-black z-50">
                    <Link
                      to="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block px-4 py-3 text-black hover:bg-gray-100 rounded-t-lg transition font-semibold"
                    >
                      My Profile
                    </Link>

                    {user.role === "user" && (
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-3 text-black hover:bg-gray-100 transition font-semibold border-t-2 border-black"
                      >
                        My Applications
                      </Link>
                    )}

                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-3 text-black hover:bg-gray-100 transition font-semibold border-t-2 border-black"
                      >
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-100 rounded-b-lg transition font-semibold border-t-2 border-black"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded-lg border-2 border-black transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 lg:hidden z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t-4 border-black relative z-40">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition"
            >
              HOME
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition"
            >
              ABOUT
            </Link>
            <a
              href="/#services"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition"
            >
              SERVICES
            </a>
            <Link
              to="/jobs"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition"
            >
              JOBS
            </Link>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition"
            >
              CONTACT
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg border-2 border-black hover:bg-yellow-500 transition"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
