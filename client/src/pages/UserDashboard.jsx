import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    fetchApplications();
  }, [token]);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApps(res.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
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

  const filteredApps = filter === "all" 
    ? apps 
    : apps.filter(app => app.status === filter);

  const stats = [
    {
      label: "Total Applications",
      value: apps.length,
      color: "indigo",
    },
    {
      label: "Selected",
      value: apps.filter(a => a.status === "Selected").length,
      color: "emerald",
    },
    {
      label: "Shortlisted",
      value: apps.filter(a => a.status === "Shortlisted").length,
      color: "blue",
    },
    {
      label: "Rejected",
      value: apps.filter(a => a.status === "Rejected").length,
      color: "red",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-2">Track your job applications and their status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <h3 className={`text-4xl font-bold mt-2 text-${stat.color}-600`}>
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-3 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Applied")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "Applied"
                ? "bg-gray-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            Applied
          </button>
          <button
            onClick={() => setFilter("Shortlisted")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "Shortlisted"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            Shortlisted
          </button>
          <button
            onClick={() => setFilter("Selected")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "Selected"
                ? "bg-emerald-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            Selected
          </button>
          <button
            onClick={() => setFilter("Rejected")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "Rejected"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Applications */}
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              {filter === "all"
                ? "You haven't applied to any jobs yet."
                : `No ${filter.toLowerCase()} applications.`}
            </p>
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Job Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Company</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr key={app._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-900">{app.jobId.title}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-600">{app.jobId.company}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-600">{app.jobId.location}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/jobs/${app.jobId._id}`}
                          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                        >
                          View Job
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
