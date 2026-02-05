import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function AdminJobDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchJob();
    fetchApplications();
  }, []);

  const fetchJob = async () => {
    const res = await api.get(`/jobs/${id}`);
    setJob(res.data);
  };

  const fetchApplications = async () => {
    const res = await api.get("/applications/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const filtered = res.data.filter(a => a.jobId._id === id);
    setApplications(filtered);
  };

  const toggleJobStatus = async () => {
    await api.put(
      `/jobs/${id}`,
      { isActive: !job.isActive },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchJob();
  };

  const updateStatus = async (appId, status) => {
    await api.patch(
      `/applications/${appId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchApplications();
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* JOB INFO */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <p>{job.company}</p>
        <p>{job.location}</p>

        <button
          onClick={toggleJobStatus}
          className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
        >
          {job.isActive ? "Close Job" : "Reopen Job"}
        </button>
      </div>

      {/* APPLICATIONS */}
      <h2 className="text-xl font-semibold mb-3">Applications</h2>

      {applications.map(app => (
        <div
          key={app._id}
          className="bg-white p-4 mb-3 rounded shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{app.userId.name}</p>
            <p className="text-sm">{app.userId.email}</p>
          </div>

          <select
            value={app.status}
            onChange={(e) =>
              updateStatus(app._id, e.target.value)
            }
            className="border p-2"
          >
            <option>Applied</option>
            <option>Shortlisted</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
        </div>
      ))}

    </div>
  );
}

export default AdminJobDetails;