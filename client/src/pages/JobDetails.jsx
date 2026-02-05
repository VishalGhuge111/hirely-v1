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
  const [hasApplied, setHasApplied] = useState(false);
  const [application, setApplication] = useState(null);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
        
        // Check if user has already applied
        if (user && token) {
          try {
            const appRes = await api.get(`/applications/job/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (appRes.data) {
              setHasApplied(true);
              setApplication(appRes.data);
              setResumeLink(appRes.data.resumeLink || "");
            }
          } catch (err) {
            // No application found, which is fine
          }
        }
      } catch (error) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, user, token]);

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
        navigate("/dashboard");
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
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-indigo-600 font-semibold mb-4">{job.company}</p>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <span className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                  job.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {job.isActive ? "Active" : "Closed"}
                </span>
                {job.type && (
                  <span className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                    job.type === "Internship"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {job.type}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {job.location}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About this role
            </h2>
            <div className="text-gray-600 whitespace-pre-wrap mb-8">
              {job.description}
            </div>
          </div>

          {job.requirements && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Requirements
              </h2>
              <div className="text-gray-600 whitespace-pre-wrap">
                {job.requirements}
              </div>
            </div>
          )}
        </div>

        {!job.isActive ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-600">This job position is currently closed.</p>
          </div>
        ) : hasApplied ? (
          <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-2xl border-3 border-cyan-500 shadow-lg p-8">
            <div className="text-center">
              <svg className="w-16 h-16 text-cyan-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-2xl font-black text-black mb-2">YOU HAVE ALREADY APPLIED</h3>
              <p className="text-gray-700 font-semibold mb-6">Your application is under review</p>
              
              <div className="bg-white rounded-lg border-2 border-gray-300 p-6 mb-6 text-left">
                <h4 className="font-bold text-black mb-4">Current Application</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 font-semibold text-sm">Resume Link:</p>
                    <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-800 font-bold underline break-all">
                      {resumeLink}
                    </a>
                  </div>
                  {application && (
                    <div>
                      <p className="text-gray-600 font-semibold text-sm">Status: <span className="text-black font-black">{application.status}</span></p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 px-4 rounded-lg border-2 border-black transition"
              >
                GO TO MY APPLICATIONS
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-3 border-black shadow-lg p-8">
            <h2 className="text-2xl font-black text-black mb-6">APPLY FOR THIS POSITION</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                <p className="text-red-700 font-bold">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg">
                <p className="text-green-700 font-bold">{success}</p>
              </div>
            )}

            <form onSubmit={applyJob} className="space-y-6">
              <div>
                <label htmlFor="resume" className="block font-bold text-black mb-2">
                  Resume Link
                </label>
                <input
                  id="resume"
                  type="url"
                  placeholder="https://example.com/resume.pdf"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold"
                />
                <p className="text-gray-600 text-xs mt-2 font-semibold">Provide a link to your resume or CV</p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 disabled:bg-gray-400 text-black font-black py-3 px-4 rounded-lg border-2 border-black transition"
              >
                {submitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
