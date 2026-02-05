import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-yellow-400 text-black font-bold px-6 py-3 rounded-full border-2 border-black mb-8">
            CONTACT US
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-black mb-6">Get in Touch</h1>
          <p className="text-lg md:text-xl text-gray-800">We'd love to hear from you. Let's connect and discuss how Hirely can help you.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-black mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.67 16.29l-2.27-2.27c-.78-.78-2.05-.78-2.83 0l-1.06 1.06c-.78.78-2.05.78-2.83 0l-2.79-2.79c-.78-.78-.78-2.05 0-2.83l1.06-1.06c.78-.78.78-2.05 0-2.83L7.71 1.33c-.78-.78-2.05-.78-2.83 0L2.96 3.88C2.36 4.48 2.01 5.31 2.01 6.27c0 6.01 4.31 12.47 9.88 16.29.57.39 1.24.59 1.91.59s1.34-.2 1.91-.59l1.74-1.2c.78-.54 1.23-1.41 1.23-2.34 0-.93-.45-1.8-1.23-2.34z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg">Phone</h3>
                    <p className="text-gray-700">+91 9866776532</p>
                    <a href="tel:+919866776532" className="text-cyan-600 hover:text-cyan-700 font-semibold">Call us now</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg">Email</h3>
                    <p className="text-gray-700">hirelyjobs@outlook.com</p>
                    <a href="mailto:hirelyjobs@outlook.com" className="text-cyan-600 hover:text-cyan-700 font-semibold">Email us</a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg">Office</h3>
                    <p className="text-gray-700">Rajiv Gandhi IT Expy, Tharamani, Chennai, Tamil Nadu 600113</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-5.002 5.97-5.002 9.856 0 1.64.325 3.236.944 4.748l-1.112 4.061 4.342-1.086c1.387.754 2.95 1.154 4.659 1.154 5.502 0 9.995-4.486 9.995-9.986 0-2.657-.795-5.193-2.307-7.374-1.512-2.18-3.64-3.885-6.022-4.751z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg">WhatsApp</h3>
                    <p className="text-gray-700">+91 9866776532</p>
                    <a href="https://wa.me/919866776532" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 font-semibold">Chat on WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl border-3 border-black p-8">
              <h2 className="text-2xl font-black text-black mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-lime-100 border-2 border-lime-500 rounded-lg">
                  <p className="text-lime-800 font-bold">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold text-black mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold py-3 px-4 rounded-lg border-2 border-black hover:shadow-lg transition"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-black mb-8 text-center">Find Us</h2>
          <div className="bg-gray-200 rounded-2xl border-3 border-black h-96">
            <iframe
              width="100%"
              height="100%"
              style={{ border: "none", borderRadius: "10px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7230923506597!2d80.24289411587428!3d13.000708490788883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526a8e8d8e8d8d%3A0x8d8d8d8d8d8d8d8d!2sRajiv%20Gandhi%20IT%20Expy%2C%20Tharamani!5e0!3m2!1sen!2sin!4v1234567890"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
