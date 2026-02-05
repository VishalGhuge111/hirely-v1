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
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/jobs");
    } else {
      navigate("/login");
    }
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

          {/* Right Side - Icons and Auth */}
          <div className="flex items-center gap-4">
            {/* Phone Icon */}
            <a href="tel:+919866776532" className="hidden sm:flex bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full border-2 border-black transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.67 16.29l-2.27-2.27c-.78-.78-2.05-.78-2.83 0l-1.06 1.06c-.78.78-2.05.78-2.83 0l-2.79-2.79c-.78-.78-.78-2.05 0-2.83l1.06-1.06c.78-.78.78-2.05 0-2.83L7.71 1.33c-.78-.78-2.05-.78-2.83 0L2.96 3.88C2.36 4.48 2.01 5.31 2.01 6.27c0 6.01 4.31 12.47 9.88 16.29.57.39 1.24.59 1.91.59s1.34-.2 1.91-.59l1.74-1.2c.78-.54 1.23-1.41 1.23-2.34 0-.93-.45-1.8-1.23-2.34z" />
              </svg>
            </a>

            {/* WhatsApp Icon */}
            <a href="https://wa.me/919866776532" target="_blank" rel="noopener noreferrer" className="hidden sm:flex bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full border-2 border-black transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-5.002 5.97-5.002 9.856 0 1.64.325 3.236.944 4.748l-1.112 4.061 4.342-1.086c1.387.754 2.95 1.154 4.659 1.154 5.502 0 9.995-4.486 9.995-9.986 0-2.657-.795-5.193-2.307-7.374-1.512-2.18-3.64-3.885-6.022-4.751z" />
              </svg>
            </a>

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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t-4 border-black">
            <Link to="/" className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition">
              HOME
            </Link>
            <Link to="/about" className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition">
              ABOUT
            </Link>
            <a href="/#services" className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition">
              SERVICES
            </a>
            <Link to="/jobs" className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition">
              JOBS
            </Link>
            <Link to="/contact" className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition">
              CONTACT
            </Link>
            {!user && (
              <>
                <Link to="/login" className="block px-4 py-2 text-black hover:bg-yellow-300 font-bold rounded-lg transition">
                  LOGIN
                </Link>
                <Link to="/register" className="block px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg border-2 border-black hover:bg-yellow-500 transition">
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
