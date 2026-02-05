import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {
  const { token } = useContext(AuthContext);

  // JOB STATES
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Internship");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);

  // FETCH JOBS
  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  // FETCH APPLICATIONS
  const fetchApps = async () => {
    const res = await api.get("/applications/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setApps(res.data);
  };

  useEffect(() => {
    fetchJobs();
    fetchApps();
  }, []);

  // CREATE JOB
  const createJob = async (e) => {
    e.preventDefault();

    await api.post(
      "/jobs",
      { title, company, location, type, description, requirements },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Job Created");

    setTitle("");
    setCompany("");
    setLocation("");
    setDescription("");
    setRequirements("");

    fetchJobs();
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    await api.patch(
      `/applications/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchApps();
  };

  return (
    <div className="p-6 space-y-8">

      {/* CREATE JOB */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Create Job</h2>

        <form onSubmit={createJob} className="grid grid-cols-2 gap-3">

          <input placeholder="Title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2" required />

          <input placeholder="Company" value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border p-2" required />

          <input placeholder="Location" value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2" required />

          <select value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2">

            <option>Internship</option>
            <option>Full-time</option>
          </select>

          <textarea placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 col-span-2" required />

          <textarea placeholder="Requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="border p-2 col-span-2" required />

          <button
            className="bg-blue-600 text-white p-2 col-span-2 rounded">
            Create Job
          </button>

        </form>
      </div>

      {/* JOB LIST */}
      <div>
        <h2 className="text-xl font-bold mb-2">All Jobs</h2>

        {jobs.map((job) => (
          <div key={job._id}
            className="border p-3 mb-2 rounded bg-gray-50">

            <h3 className="font-semibold">{job.title}</h3>
            <p>{job.company} — {job.location}</p>

          </div>
        ))}
      </div>

      {/* APPLICATIONS */}
      <div>
        <h2 className="text-xl font-bold mb-2">Applications</h2>

        {apps.map((app) => (
          <div key={app._id}
            className="border p-3 mb-2 rounded">

            <p><b>{app.userId.name}</b></p>
            <p>{app.jobId.title}</p>

            <select
              value={app.status}
              onChange={(e) =>
                updateStatus(app._id, e.target.value)
              }
              className="border p-1 mt-2">

              <option>Applied</option>
              <option>Shortlisted</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>

          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminDashboard;