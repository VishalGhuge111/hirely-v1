import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Profile() {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await api.put("/auth/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Profile updated successfully!");
      setEditMode(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        await api.delete("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        logout();
        navigate("/");
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to delete profile");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black text-black">MY PROFILE</h1>
            <button
              onClick={() => navigate(-1)}
              className="bg-white hover:bg-gray-100 text-black font-bold px-6 py-3 rounded-lg border-2 border-black transition"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border-2 ${
            message.includes("successfully")
              ? "bg-lime-100 border-lime-400 text-lime-800"
              : "bg-red-100 border-red-400 text-red-800"
          }`}>
            <p className="font-bold">{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border-3 border-black shadow-lg p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full mb-6 border-3 border-black">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-black mb-2">{user.name}</h2>
              <p className="text-gray-700 font-semibold mb-4">{user.email}</p>
              <div className="inline-block">
                <span className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-full font-black text-sm capitalize border-2 border-black">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl border-3 border-black shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-black">PROFILE INFORMATION</h3>
              <button
                onClick={() => {
                  if (editMode) {
                    setFormData({ name: user.name, email: user.email });
                  }
                  setEditMode(!editMode);
                }}
                className={`px-6 py-3 rounded-lg font-black border-2 transition ${
                  editMode
                    ? "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
                    : "bg-cyan-500 text-black border-black hover:bg-cyan-600"
                }`}
              >
                {editMode ? "CANCEL" : "EDIT"}
              </button>
            </div>

            {editMode ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block font-bold text-black mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 disabled:bg-gray-400 text-black font-black py-3 rounded-lg border-2 border-black transition"
                >
                  {saving ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="pb-6 border-b-2 border-gray-200">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Full Name</p>
                  <p className="text-xl font-black text-black">{user.name}</p>
                </div>
                <div className="pb-6 border-b-2 border-gray-200">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Email Address</p>
                  <p className="text-xl font-black text-black">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Account Type</p>
                  <p className="text-xl font-black text-black capitalize">{user.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-12 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl border-3 border-red-400 shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <svg className="w-8 h-8 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-2xl font-black text-red-700 mb-2">DANGER ZONE</h3>
              <p className="text-gray-700 font-semibold mb-6">Account management actions. Proceed with caution.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleLogout}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black px-6 py-4 rounded-lg border-2 border-black transition"
            >
              LOGOUT
            </button>
            <button
              onClick={handleDeleteProfile}
              className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-4 rounded-lg border-2 border-red-700 transition"
            >
              DELETE PROFILE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
