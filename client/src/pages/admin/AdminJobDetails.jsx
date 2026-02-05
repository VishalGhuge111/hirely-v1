import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function AdminJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchJob(), fetchApplications()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJob = async () => {
    const res = await api.get(`/jobs/${id}`);
    setJob(res.data);
    setEditData(res.data);
  };

  const fetchApplications = async () => {
    const res = await api.get("/applications/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const filtered = res.data.filter(a => a.jobId._id === id);
    setApplications(filtered);
  };

  const closeApplications = async () => {
    try {
      await api.put(
        `/jobs/${id}`,
        { acceptingApplications: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✓ Applications Closed");
      setTimeout(() => setMessage(""), 3000);
      fetchJob();
    } catch (error) {
      console.error("Failed to close applications:", error);
      setMessage("Failed to close applications");
    }
  };

  const deleteJob = async () => {
    if (window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      try {
        await api.delete(
          `/jobs/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✓ Job Deleted");
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } catch (error) {
        console.error("Failed to delete job:", error);
        setMessage("Failed to delete job");
      }
    }
  };

  const saveJobChanges = async () => {
    setSaving(true);
    try {
      await api.put(
        `/jobs/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✓ Updated");
      setEditMode(false);
      setTimeout(() => setMessage(""), 3000);
      fetchJob();
    } catch (error) {
      console.error("Failed to save job:", error);
      setMessage("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      await api.patch(
        `/applications/${appId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications();
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Selected":
        return "bg-emerald-100 text-emerald-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Shortlisted":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Job not found</p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="text-indigo-600 hover:text-indigo-700 font-medium mb-6 inline-block"
        >
          ← Back to Dashboard
        </button>

        {/* JOB INFO CARD */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={editData.title || ""}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={editData.company || ""}
                        onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editData.location || ""}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editData.description || ""}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements
                    </label>
                    <textarea
                      value={editData.requirements || ""}
                      onChange={(e) => setEditData({ ...editData, requirements: e.target.value })}
                      rows="3"
                      placeholder="Enter job requirements, each on a new line"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-indigo-600 font-semibold mb-1">{job.company}</p>
                  <p className="text-gray-600 mb-4">📍 {job.location}</p>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="ml-4 flex gap-2">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  job.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {job.isActive ? "Active" : "Closed"}
              </span>
            </div>
          </div>

          {message && (
            <div className="mt-4 p-3 bg-lime-100 border-2 border-lime-400 text-lime-800 rounded-lg font-bold">
              {message}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {editMode ? (
              <>
                <button
                  onClick={saveJobChanges}
                  disabled={saving}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setEditData(job);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Job
                </button>
                <button
                  onClick={closeApplications}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Close Applications
                </button>
                <button
                  onClick={deleteJob}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete Job
                </button>
              </>
            )}
          </div>
        </div>

        {/* APPLICATIONS TABLE */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications ({applications.length})</h2>

          {applications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No applications yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Candidate</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Resume</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">{app.userId.name}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-600 text-sm">{app.userId.email}</p>
                      </td>
                      <td className="py-4 px-4">
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                        >
                          View Resume
                        </a>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus(app._id, e.target.value)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium border-0 cursor-pointer ${getStatusBadgeColor(app.status)}`}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminJobDetails;
