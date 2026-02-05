import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-lime-400 text-black font-bold px-6 py-3 rounded-full border-2 border-black mb-8">
            ABOUT US
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-black mb-6 max-w-3xl mx-auto">
            Connecting Top Talent With Great Opportunities
          </h1>
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto">
            Hirely is dedicated to revolutionizing the recruitment industry by creating meaningful connections between talented individuals and organizations looking to grow.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg mb-4">
                Founded with a vision to simplify the hiring process, Hirely has grown into a trusted platform connecting thousands of job seekers with their dream roles. We believe that the right match between talent and opportunity can transform careers and businesses.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Our team of experienced recruiters and HR professionals work tirelessly to ensure every connection is meaningful and leads to long-term success. We've helped individuals launch careers and companies build high-performing teams.
              </p>
              <p className="text-gray-700 text-lg">
                Today, Hirely continues to innovate and improve how the recruitment process works for everyone involved.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-3xl border-4 border-black p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-black text-black mb-4">5K+</div>
                <div className="text-2xl font-bold text-black">Successful Placements</div>
                <p className="text-gray-800 mt-4">And growing every day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg">These principles guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                description: "We believe in honest communication and transparent practices with all our stakeholders.",
                icon: "⭐"
              },
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service, from matching to support.",
                icon: "🎯"
              },
              {
                title: "Innovation",
                description: "We continuously innovate to provide better solutions for recruitment challenges.",
                icon: "💡"
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-2xl border-3 border-black p-8">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-cyan-400 to-cyan-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Team Members" },
              { number: "15+", label: "Years Experience" },
              { number: "100+", label: "Partner Companies" },
              { number: "24/7", label: "Customer Support" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-black text-black">{stat.number}</div>
                <div className="text-lg font-bold text-gray-800 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of professionals who have found success on Hirely.</p>
          <Link to="/jobs" className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold px-10 py-4 rounded-2xl border-3 border-black hover:shadow-lg transition">
            EXPLORE JOBS
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
