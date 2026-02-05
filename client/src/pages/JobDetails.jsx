import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    };

    fetchJob();
  }, [id]);

  const applyJob = async () => {
    try {
      await api.post(
        `/applications/${id}`,
        { resumeLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applied successfully");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.description}</p>

      <input
        placeholder="Resume Link"
        value={resumeLink}
        onChange={(e) => setResumeLink(e.target.value)}
      />

      <button onClick={applyJob}>Apply</button>
    </div>
  );
}

export default JobDetails;