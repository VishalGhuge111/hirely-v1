import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* STATS */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Jobs</p>
          <h2 className="text-3xl font-bold">{jobs.length}</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Applications</p>
          <h2 className="text-3xl font-bold">{applications.length}</h2>
        </div>
      </div>

      {/* JOB LIST */}
      <h2 className="text-xl font-semibold mb-4">Jobs</h2>

      <div className="grid grid-cols-3 gap-5">
        {jobs.map(job => (
          <div
            key={job._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/admin/jobs/${job._id}`)}
          >
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company}</p>
            <p className="text-sm">
              Status: {job.isActive ? "Active" : "Closed"}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;