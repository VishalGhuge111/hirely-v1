import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = filter === "all" 
    ? jobs 
    : jobs.filter(job => job.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-indigo-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 sticky top-0 z-10 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl font-black text-black mb-2">ALL OPPORTUNITIES</h1>
          <p className="text-gray-800 font-semibold text-lg">Discover {jobs.length} amazing jobs and internships</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-full font-black border-2 transition ${
              filter === "all"
                ? "bg-cyan-500 text-black border-black"
                : "bg-white text-black hover:bg-gray-100 border-gray-300"
            }`}
          >
            ALL JOBS
          </button>
          <button
            onClick={() => setFilter("Full-time")}
            className={`px-6 py-3 rounded-full font-black border-2 transition ${
              filter === "Full-time"
                ? "bg-lime-400 text-black border-black"
                : "bg-white text-black hover:bg-gray-100 border-gray-300"
            }`}
          >
            FULL-TIME
          </button>
          <button
            onClick={() => setFilter("Internship")}
            className={`px-6 py-3 rounded-full font-black border-2 transition ${
              filter === "Internship"
                ? "bg-yellow-400 text-black border-black"
                : "bg-white text-black hover:bg-gray-100 border-gray-300"
            }`}
          >
            INTERNSHIPS
          </button>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border-3 border-black shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-full mb-6 border-2 border-black">
              <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-800 font-bold text-lg mb-2">No opportunities available</p>
            <p className="text-gray-600 font-semibold">Check back later for new postings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Link
                key={job._id}
                to={`/jobs/${job._id}`}
                className="bg-white rounded-2xl border-3 border-black shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group transform hover:scale-105"
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Header with icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:bg-yellow-300 transition border-2 border-black">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 7H7v6h6V7z" />
                      </svg>
                    </div>
                    <span className={`text-xs font-black px-3 py-1 rounded-full whitespace-nowrap border-2 border-black ${
                      job.type === "Internship"
                        ? "bg-blue-300 text-black"
                        : "bg-lime-300 text-black"
                    }`}>
                      {job.type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-black mb-2 line-clamp-2 group-hover:text-cyan-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-sm text-cyan-600 font-black mb-3">{job.company}</p>

                  <div className="flex items-center gap-2 text-gray-700 text-sm mb-4 font-semibold">
                    <span>📍</span>
                    {job.location}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow font-semibold">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200 mt-auto">
                    <span className="text-xs text-gray-700 font-bold flex items-center gap-1">
                      VIEW DETAILS →
                    </span>
                    {job.isActive && (
                      <span className="text-xs bg-lime-300 text-black px-2 py-1 rounded font-black border border-black">ACTIVE</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
