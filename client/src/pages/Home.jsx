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
              <p className="text-lg md:text-xl text-gray-800 mb-8 max-w-lg font-semibold">
                Hirely is a job and internship application management system designed to streamline recruitment. Organizations post jobs, candidates apply, and admins manage the entire workflow efficiently.
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
                  <svg className="w-24 h-24 text-black mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
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
                icon: "users",
                title: "Manpower",
                description: "We understand client needs and deliver tailored recruitment solutions ensuring the right match."
              },
              {
                icon: "userPlus",
                title: "Recruitment",
                description: "Supporting candidates and clients with a smooth hiring process for better outcomes."
              },
              {
                icon: "briefcase",
                title: "Executive Search",
                description: "Connecting organizations with top leadership talent through our strong network."
              },
              {
                icon: "handshake",
                title: "HR Consulting",
                description: "Enhancing efficiency with consulting, training, and employee development services."
              },
              {
                icon: "link",
                title: "RPO",
                description: "Outsourcing recruitment processes with tailored solutions to meet business needs."
              },
              {
                icon: "crown",
                title: "Leadership Hiring",
                description: "Expert team collaborating with firms to fulfill senior and leadership roles efficiently."
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-yellow-400 rounded-2xl border-4 border-black p-6 hover:shadow-xl transition transform hover:scale-105"
              >
                <svg className="w-16 h-16 text-black mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {service.icon === "users" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />}
                  {service.icon === "userPlus" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />}
                  {service.icon === "briefcase" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m11 0a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2m11 0V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2" />}
                  {service.icon === "handshake" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1m2-1v2.5M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m0 0l2-1 2 1m-2-1v2.5M9 21v-5.5m0 0H3.75A1.75 1.75 0 012 14.25" />}
                  {service.icon === "link" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />}
                  {service.icon === "crown" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707-.707M21 12h-1v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6H3m18 0h.01M4 12h16m-8 6v4m0-11v3m5.364-9.364l-.707.707M9 9h.01" />}
                </svg>
                <h3 className="text-2xl font-black text-black mb-3">{service.title}</h3>
                <p className="text-gray-800 font-medium">{service.description}</p>
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
      <section className="bg-gradient-to-r from-cyan-400 to-cyan-500 py-20 md:py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-lime-400 text-black font-bold px-6 py-3 rounded-full border-2 border-black mb-8">
            WHY CHOOSE HIRELY
          </div>

          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <svg className="w-12 h-12 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <svg className="w-12 h-12 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-black mb-8 max-w-2xl mx-auto leading-tight">
            At Hirely, we connect you with the right talent quickly and efficiently.
          </h2>

          <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-8 leading-relaxed font-semibold">
            Our centralized platform ensures every application is tracked efficiently. With simple workflows and transparent processes, organizations can manage recruitment seamlessly while candidates have a clear view of their application status. We make hiring simpler and more organized.
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
