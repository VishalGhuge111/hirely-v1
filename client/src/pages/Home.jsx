import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Home() {
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setLatestJobs(res.data.slice(0, 4));
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-400 to-cyan-500 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-black mb-6 leading-tight">
                HIRELY CONNECTS<br />TOP TALENT<br />AND BUSINESS<br />TOGETHER
              </h1>
              <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-lg">
                Find your perfect opportunity or discover exceptional talent. Hirely is your platform for meaningful career connections.
              </p>
              <Link
                to={user ? "/jobs" : "/login"}
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-black px-8 py-4 rounded-full border-3 border-black text-lg transition transform hover:scale-105"
              >
                Get Started →
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="bg-yellow-400 rounded-3xl border-4 border-black p-8 h-96 w-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="font-bold text-black text-lg">Your Next Opportunity Awaits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-lime-400 text-black font-bold px-6 py-3 rounded-full border-2 border-black mb-6">
              OUR SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "👥",
                title: "Manpower",
                description: "We understand client needs and deliver tailored recruitment solutions ensuring the right match."
              },
              {
                icon: "👤➕",
                title: "Recruitment",
                description: "Supporting candidates and clients with a smooth hiring process for better outcomes."
              },
              {
                icon: "👔",
                title: "Executive Search",
                description: "Connecting organizations with top leadership talent through our strong network."
              },
              {
                icon: "🤝",
                title: "HR Consulting",
                description: "Enhancing efficiency with consulting, training, and employee development services."
              },
              {
                icon: "🔗",
                title: "RPO",
                description: "Outsourcing recruitment processes with tailored solutions to meet business needs."
              },
              {
                icon: "👑",
                title: "Leadership Hiring",
                description: "Expert team collaborating with firms to fulfill senior and leadership roles efficiently."
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-yellow-400 rounded-2xl border-4 border-black p-6 hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-black text-black mb-3">{service.title}</h3>
                <p className="text-gray-800 font-semibold">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold px-8 py-4 rounded-full border-3 border-black hover:shadow-lg transition"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Hirely */}
      <section className="bg-gradient-to-r from-cyan-400 to-cyan-500 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-lime-400 text-black font-bold px-6 py-3 rounded-full border-2 border-black mb-8">
            WHY CHOOSE HIRELY
          </div>

          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-5xl">✨</div>
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-5xl">✨</div>

          <h2 className="text-4xl md:text-5xl font-black text-black mb-8 max-w-2xl mx-auto leading-tight">
            At Hirely, we connect you with the right talent quickly and efficiently.
          </h2>

          <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-8 leading-relaxed font-semibold">
            Our tailored solutions ensure every hire is the perfect fit for your business needs. Backed by proven expertise and a vast professional network, we consistently deliver exceptional results. We are your trusted partner in building strong, high-performing teams.
          </p>

          <Link
            to="/about"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-black px-8 py-4 rounded-full border-3 border-black text-lg transition transform hover:scale-105"
          >
            Discover More
          </Link>
        </div>
      </section>

      {/* Latest Opportunities */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">Latest Opportunities</h2>
            <p className="text-xl text-gray-600">Explore recent job postings and internships</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading opportunities...</p>
            </div>
          ) : latestJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {latestJobs.map((job) => (
                  <Link
                    key={job._id}
                    to={`/jobs/${job._id}`}
                    className="bg-white border-3 border-black rounded-2xl p-6 hover:shadow-xl transition transform hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-400 rounded-xl border-2 border-black flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 7H7v6h6V7z" />
                        </svg>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border-2 border-black ${
                        job.type === "Internship"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-black mb-2 line-clamp-2">{job.title}</h3>
                    <p className="text-cyan-600 font-bold mb-3">{job.company}</p>
                    <div className="flex items-center gap-2 text-gray-700 text-sm mb-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {job.location}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job.description}</p>
                    <div className="pt-4 border-t-2 border-black">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        View Details →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/jobs"
                  className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-4 rounded-full border-3 border-black transition transform hover:scale-105"
                >
                  VIEW ALL JOBS
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No opportunities available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of professionals and companies on Hirely today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? "/jobs" : "/register"}
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-black px-8 py-4 rounded-full border-3 border-yellow-400 transition transform hover:scale-105"
            >
              {user ? "BROWSE JOBS" : "SIGN UP NOW"}
            </Link>
            <a
              href="#contact"
              className="inline-block bg-white hover:bg-gray-100 text-black font-black px-8 py-4 rounded-full border-3 border-white transition transform hover:scale-105"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
