import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const applyJob = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate("/login");
      return;
    }

    setError("");
    setSuccess("");
    setSubmitting(true);

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

      setSuccess("Application submitted successfully!");
      setResumeLink("");
      setTimeout(() => {
        navigate("/dashboard/user");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
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
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:text-indigo-700 font-medium mb-6 inline-block"
        >
          ← Back to Jobs
        </button>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-indigo-600 font-semibold mb-4">{job.company}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>📍 {job.location}</span>
              <span className={`px-3 py-1 rounded-full font-medium ${
                job.isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {job.isActive ? "Active" : "Closed"}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About this role</h2>
            <div className="prose prose-sm text-gray-600 whitespace-pre-wrap">
              {job.description}
            </div>
          </div>
        </div>

        {!job.isActive ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-600">This job position is currently closed.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this position</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-emerald-700 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={applyJob} className="space-y-6">
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Link
                </label>
                <input
                  id="resume"
                  type="url"
                  placeholder="https://example.com/resume.pdf"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
                <p className="text-gray-500 text-xs mt-2">Provide a link to your resume or CV</p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
