import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    type: "Full-time",
    requirements: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchJobs(), fetchApplications()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  const fetchApplications = async () => {
    const res = await api.get("/applications/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setApplications(res.data);
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.post("/jobs", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormData({ title: "", company: "", description: "", location: "", type: "Full-time", requirements: "" });
      setShowModal(false);
      await fetchJobs();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  const stats = [
    {
      label: "Total Jobs",
      value: jobs.length,
      color: "indigo",
    },
    {
      label: "Total Applications",
      value: applications.length,
      color: "emerald",
    },
    {
      label: "Selected",
      value: applications.filter(a => a.status === "Selected").length,
      color: "blue",
    },
    {
      label: "Rejected",
      value: applications.filter(a => a.status === "Rejected").length,
      color: "red",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-2xl border-3 border-black p-8">
          <h1 className="text-4xl md:text-5xl font-black text-black">ADMIN DASHBOARD</h1>
          <p className="text-gray-800 mt-2 font-semibold text-lg">Manage jobs and applications effectively</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl border-3 border-black shadow-lg p-6">
              <p className="text-gray-600 text-sm font-bold uppercase">{stat.label}</p>
              <h3 className="text-5xl font-black mt-2 text-cyan-600">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Jobs Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black text-black">JOBS</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-3 px-6 rounded-lg border-2 border-black transition"
            >
              + ADD JOB
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl border-3 border-black shadow-lg p-12 text-center">
              <p className="text-gray-600 font-bold text-lg">No jobs created yet. Start by adding a new job.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => navigate(`/admin/jobs/${job._id}`)}
                  className="bg-white rounded-2xl border-3 border-black shadow-lg p-6 hover:shadow-2xl cursor-pointer transition transform hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-black text-black flex-1">{job.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black whitespace-nowrap ml-2 border-2 border-black ${
                        job.isActive
                          ? "bg-lime-300 text-black"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {job.isActive ? "ACTIVE" : "CLOSED"}
                    </span>
                  </div>

                  <p className="text-cyan-600 font-black text-sm mb-2">{job.company}</p>
                  <p className="text-gray-700 font-semibold text-sm mb-4">📍 {job.location}</p>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job.description}</p>

                  <div className="pt-4 border-t-2 border-gray-200">
                    <span className="text-gray-700 font-bold text-sm">
                      {applications.filter(a => a.jobId._id === job._id).length} applications
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Job Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen md:max-h-96 overflow-y-auto flex flex-col">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-400 to-cyan-500 px-8 py-6 flex items-center justify-between border-b-3 border-black">
                <h2 className="text-2xl font-black text-black">CREATE NEW JOB</h2>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-black hover:text-gray-700 text-3xl"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                    <p className="text-red-700 font-bold">{error}</p>
                  </div>
                )}

                <form onSubmit={handleAddJob} className="space-y-6">
                  <div>
                    <label className="block font-bold text-black mb-2">Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior React Developer"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-black mb-2">Company</label>
                    <input
                      type="text"
                      placeholder="e.g., Tech Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-black mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="e.g., San Francisco, CA"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-black mb-2">Job Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-black mb-2">Description</label>
                    <textarea
                      placeholder="Job description..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-black mb-2">Requirements</label>
                    <textarea
                      placeholder="Required skills and qualifications..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      required
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 disabled:bg-gray-400 text-black font-black py-3 px-4 rounded-lg border-2 border-black transition"
                    >
                      {submitting ? "CREATING..." : "CREATE JOB"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-black py-3 px-4 rounded-lg border-2 border-gray-400 transition"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
