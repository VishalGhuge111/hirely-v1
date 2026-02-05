import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          {/* Brand Section */}
          <div className="bg-gray-100 rounded-2xl border-2 border-gray-300 p-8">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl px-2 py-1 border-2 border-black">
                <span className="text-white font-bold">H</span>
              </div>
              <div>
                <div className="font-black text-black text-sm">HIRELY</div>
                <div className="text-xs text-gray-700 font-semibold">HIRE EARLY</div>
              </div>
            </Link>
            <p className="text-gray-700 text-sm leading-relaxed">
              Hirely is a job and internship application management system that helps organizations streamline their recruitment process. We provide a simple, centralized platform for managing job postings and tracking applications.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="bg-gray-100 rounded-2xl border-2 border-gray-300 p-8">
            <h4 className="text-black font-bold text-lg mb-6 underline underline-offset-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-700 hover:text-cyan-600 transition font-semibold">
                  Home →
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-700 hover:text-cyan-600 transition font-semibold">
                  Jobs →
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-red-600 hover:text-red-800 transition font-semibold">
                  Contact →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-100 rounded-2xl border-2 border-gray-300 p-8">
            <h4 className="text-black font-bold text-lg mb-6">Contact Details</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:9999999999" className="text-gray-700 hover:text-cyan-600 transition font-semibold">
                  9999999999
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:admin@hirely.com" className="text-gray-700 hover:text-cyan-600 transition font-semibold">
                  admin@hirely.com
                </a>
              </div>
              <div className="flex items-start gap-3 pt-4 border-t border-gray-300">
                <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-gray-700 text-sm">
                  <p className="font-semibold">Pune, Maharashtra</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm font-semibold text-center">
            © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
