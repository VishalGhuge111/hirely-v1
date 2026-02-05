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
              Unlock your brand's true potential with innovative digital strategies that drive results. At our digital agency, we specialize in everything from creative design to targeted marketing campaigns.
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
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.67 16.29l-2.27-2.27c-.78-.78-2.05-.78-2.83 0l-1.06 1.06c-.78.78-2.05.78-2.83 0l-2.79-2.79c-.78-.78-.78-2.05 0-2.83l1.06-1.06c.78-.78.78-2.05 0-2.83L7.71 1.33c-.78-.78-2.05-.78-2.83 0L2.96 3.88C2.36 4.48 2.01 5.31 2.01 6.27c0 6.01 4.31 12.47 9.88 16.29.57.39 1.24.59 1.91.59s1.34-.2 1.91-.59l1.74-1.2c.78-.54 1.23-1.41 1.23-2.34 0-.93-.45-1.8-1.23-2.34z" />
                </svg>
                <a href="tel:+919866776532" className="text-gray-700 hover:text-cyan-600 transition font-semibold">
                  +91 9866776532
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:hirelyjobs@outlook.com" className="text-gray-700 hover:text-cyan-600 transition font-semibold">
                  hirelyjobs@outlook.com
                </a>
              </div>
              <div className="flex items-start gap-3 pt-4 border-t border-gray-300">
                <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                <div className="text-gray-700 text-sm">
                  <p className="font-semibold">Rajiv Gandhi IT Expy, Tharamani, Chennai, Tamil Nadu 600113</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-semibold">
              © 2025. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/919866776532"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-400 rounded-lg border-2 border-black flex items-center justify-center hover:shadow-lg transition"
              >
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-5.002 5.97-5.002 9.856 0 1.64.325 3.236.944 4.748l-1.112 4.061 4.342-1.086c1.387.754 2.95 1.154 4.659 1.154 5.502 0 9.995-4.486 9.995-9.986 0-2.657-.795-5.193-2.307-7.374-1.512-2.18-3.64-3.885-6.022-4.751z" />
                </svg>
              </a>
              <a
                href="tel:+919866776532"
                className="w-10 h-10 bg-yellow-400 rounded-lg border-2 border-black flex items-center justify-center hover:shadow-lg transition"
              >
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.67 16.29l-2.27-2.27c-.78-.78-2.05-.78-2.83 0l-1.06 1.06c-.78.78-2.05.78-2.83 0l-2.79-2.79c-.78-.78-.78-2.05 0-2.83l1.06-1.06c.78-.78.78-2.05 0-2.83L7.71 1.33c-.78-.78-2.05-.78-2.83 0L2.96 3.88C2.36 4.48 2.01 5.31 2.01 6.27c0 6.01 4.31 12.47 9.88 16.29.57.39 1.24.59 1.91.59s1.34-.2 1.91-.59l1.74-1.2c.78-.54 1.23-1.41 1.23-2.34 0-.93-.45-1.8-1.23-2.34z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
