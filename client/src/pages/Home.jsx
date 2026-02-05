import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Connect with Top Talent
              </h1>
              <p className="text-xl text-indigo-100 mb-8 text-balance">
                Find your dream job or discover exceptional candidates. Hirely connects businesses with professionals who drive growth and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/jobs"
                  className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 justify-center"
                >
                  <span>Browse Jobs</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-400 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-300 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-300 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 7H7v6h6V7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">5000+</h3>
                      <p className="text-sm text-indigo-100">Active Jobs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-300 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">50K+</h3>
                      <p className="text-sm text-indigo-100">Active Candidates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-300 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H3a1 1 0 000 2h1a1 1 0 000 2H3a1 1 0 100 2h1a1 1 0 000 2H3a1 1 0 100 2h1a1 1 0 000 2H4a2 2 0 01-2-2V5zm12 0a2 2 0 00-2-2 1 1 0 000 2h3a1 1 0 000-2h-1a1 1 0 000-2h1a1 1 0 100-2h-1a1 1 0 100-2h1a1 1 0 000-2h-1a2 2 0 00-2 2v12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">95%</h3>
                      <p className="text-sm text-indigo-100">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Opportunities</h2>
            <p className="text-xl text-gray-600">Explore our latest job postings and find your next career move</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : latestJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No jobs available yet</p>
              <Link to="/jobs" className="text-indigo-600 hover:text-indigo-700 font-medium">
                View all postings
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {latestJobs.map((job) => (
                  <Link
                    key={job._id}
                    to={`/jobs/${job._id}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition">
                        <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2a2 2 0 002 2V6a1 1 0 112 0v.08a3 3 0 013.97 2.91h1.06a3 3 0 013.97-2.91V6a1 1 0 112 0v2a2 2 0 002-2V5a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6zm0 4a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        job.type === "Internship"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition">
                      {job.title}
                    </h3>
                    <p className="text-sm text-indigo-600 font-semibold mb-3">{job.company}</p>

                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {job.location}
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Learn more</span>
                      <svg className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                  <span>View All Jobs</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Why Choose Hirely?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast",
                description: "Find your perfect match in minutes, not weeks. Our AI-powered matching system works instantly.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                ),
                title: "Smart Matching",
                description: "Advanced algorithms match the right candidates with the right jobs for better outcomes.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7.542-3a8.993 8.993 0 00-16.457-2.991l-4.888 5.862a2 2 0 001.64 3.128h15.665a2 2 0 001.933-2.707A9.014 9.014 0 0016.542 5.209z" />
                  </svg>
                ),
                title: "Verified Users",
                description: "All users and companies are verified for security and authenticity.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who have found their dream jobs on Hirely.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition"
          >
            <span>Sign Up Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
